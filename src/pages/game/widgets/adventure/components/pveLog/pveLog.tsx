import { useWeb3React } from '@web3-react/core'
import { PveLogStyle } from './style'
import { useTranslation } from 'react-i18next'
import btnRedBg from 'src/assets/images/common/btn_arrow_red.png'
import Button from 'src/components/Button'
import { HeroImgList } from 'src/config'
import { useEffect, useMemo, useState } from 'react'
import SimplePagination from 'src/components/SimplePagination'
import { claimAllApi, getBattleLogListApi, getClaimObjectsApi} from 'src/pages/api/request'
import { message, Spin } from 'antd'
import { attributesType } from 'src/utils/attributeSetting'
import { mapType } from '../..'
import { getMonsterData } from '../pve/monstersConfig'
import { subTokenId } from 'src/utils'
import { useSetState } from 'ahooks'
import { cancelBattleAbi, claimAllBattleAbi } from 'src/web3/pve'
import moment from 'moment'
import { I_Equip } from '../../../backpack'
import { equipSpilt, getKeyPackage, groupByArr } from '../../../backpack/equipUtils'
import { pocketList } from '../../../lottery'
import { formatTime } from 'src/utils/timeHelper'


export interface I_BattleLog{
  allDlt: number
  allGold: number
  claimed: boolean
  finish: boolean
  level: number
  mapId: number
  mapLv: number
  monsters: string []
  occupation: number
  time: number
  tokenId: string
  win: boolean
  battleId:number
  equips:I_Equip[]
}
interface I_PveLog{
  advMap:mapType[]
}
const PveLog=(props:I_PveLog)=>{
  const {advMap}=props

  const { t, i18n: {language} } = useTranslation()
  const pageSize=10
  const [battleList, setBattleList]=useState<I_BattleLog[]>( [])
  const [profit, setProfit]=useSetState({
    gold: 0,
    dlt: 0,
    equipList: [] as I_Equip[]

  })
  const [loading, setLoading]=useState(false)
  const [btnLoading, setBtnLoading]=useState(false)
  const [currentPage, setCurrentPage]=useState(1)
  const { library } = useWeb3React()
  const [endTime, setEndTime]=useState(0)

  useEffect(()=>{
    init()
  }, [])
  //初始化数据
  const init=()=>{
    setLoading(true)
    getLibrary()
  }
  const getLibrary=async ()=>{
    if (library){
      const myAddress =await library.getSigner().getAddress()
      getLogList(myAddress)
      getClaimObjects(myAddress)
    } else {
      setTimeout(() => {
        getLibrary()
      }, 500)
    }
  }
  // useEffect(() => {

  // }, [currentPage])
  const getLogList=async (myAddress:string)=>{

    const res=await getBattleLogListApi(myAddress)
    setBattleList(res.sort((a, b)=>{ return b.time-a.time }))
    setLoading(false)
    // const reqBattles=battleList.slice((page-1)*pageSize, page*pageSize)


  }
  //获取怪物名称
  const getMonsterName=(logItem:I_BattleLog):string=>{
    try {
      if (!logItem?.monsters) {
        return ''

      }
      if (language==='en-US'){
        let str=''
        logItem.monsters.map((monsterName:string)=>{
          str+=getMonsterData(monsterName, 'name')
          return monsterName
        })
        return str
      }
      return logItem.monsters.join('/')
    } catch (error) {
      return ''
    }


  }
  //领取收益
  const claimAll=async()=>{
    try {
      setBtnLoading(true)
      const myAddress =await library.getSigner().getAddress()
      const res= await claimAllApi(myAddress)

      if (res){
        await claimAllBattleAbi(library, res)
        setBtnLoading(false)
        init()
      }

    } catch (error) {
      console.error(error)
      setBtnLoading(false)
      setLoading(false)
      message.error(t('game.adventure.FailedToCollectIncome'))
    }

  }
  //获取可以领取的dlt和金币
  const getClaimObjects=async(myAddress:string)=>{
    const res=await getClaimObjectsApi(myAddress)

    if (res){
      setProfit({
        gold: res.allGold,
        dlt: res.allDlt,
        equipList: res.equips
      })
      if (res.coldTime){
        countDown(res.coldTime)
      }
    }
  }
  //倒计时
  const countDown=(time:number)=>{
    if (time>0){
      setTimeout(() => {
        setEndTime(time-1)
        countDown(time-1)

      }, 1000)
    } else {
      setEndTime(0)
    }

  }
  const showPageList=(page:number)=>{
    return battleList.slice((page-1)*pageSize, page*pageSize)
  }


  const BackBtn=(props:{logItem:I_BattleLog})=>{
    const {battleId, time}=props.logItem
    const [backLoading, setBackLoading]=useState(false)

    /**
 * 取消pve
 * @param battleId 挑战id
 */
    const onCancelBattleAbi= async(battleId:number)=>{
      try {
        setBackLoading(true)
        //一个小时之后才能取消
        if ((new Date().getTime())-3600000<time*1000){
          message.info(t('game.adventure.PleaseCancelInAnHour'))
          setBackLoading(false)
          return

        }
        const res= await cancelBattleAbi(library, battleId)
        if (res){
          init()
        }
      } catch (error) {
        setBackLoading(false)
        console.error(error)
        message.error(t('game.adventure.CancelChallengeFailed'))
        init()
      }
    }
    return <Button
      width="192px"
      height="48px"
      fontSize="18px"
      bold
      className="mt-2"
      loading={backLoading}
      img={btnRedBg}
      onClick={() =>{
        onCancelBattleAbi(battleId)

      }}
    >
      {t('game.adventure.cancel')}
    </Button>
  }

  /**
   * 渲染领取按钮
   * @returns 返回领取按钮
   */
  const renderReceiveBtn= useMemo(
    () => () => {
      const isDisabled=(profit.dlt===0&&profit.gold===0)||endTime>0

      //时间显示
      const getEndtTime=formatTime(endTime)
      return <Button
        width="192px"
        height="48px"
        fontSize="18px"
        bold
        className="mt-0"
        img={btnRedBg}
        loading={btnLoading}
        disabled={isDisabled}
        onClick={() =>{
          // alert('敬请期待')
          if (isDisabled){
            return
          }
          claimAll()

        }}
      >
        {endTime>0?getEndtTime:t('game.adventure.claimReward')}
      </Button>
    },
    [endTime, profit.dlt, profit.gold, profit.equipList, btnLoading]
  )
  const {keyList, equipList}=equipSpilt(profit.equipList??[])


  const initKeyList=getKeyPackage(keyList)

  //渲染子项的装备和钥匙
  const renderKeyAndEquipItem=(equips:I_Equip[])=>{
    const domArr:React.ReactNode[]=[]
    const {keyList, equipList}=equipSpilt(equips??[])
    const typeKeyList=getKeyPackage(keyList)
    pocketList.forEach((keyItem, index)=>{
      if (typeKeyList[index].length===0) return ''
      domArr.push(<span className="equipNameItem ml-2" key={index+'key'}>{t(`game.adventure.${keyItem.title}Key`)}*{typeKeyList[index].length}</span>)
    })
    groupByArr(equipList, 'name').forEach((equipArrItem, index)=>{
      domArr.push(<span className="equipNameItem ml-2" key={index+'equip'}>{language==='en-US'?equipArrItem[0].en:equipArrItem[0].name}*{equipArrItem.length}</span>)
    })
    return domArr
  }
  return <PveLogStyle>
    <Spin spinning={loading}>
      {/* 领取奖励框 */}
      <div className='flex flex-nowrap receiveBox'>
        <div className='receiveItem receiveItem-title' >
          <p> {t('game.adventure.copyIncome')}</p>
        </div>
        <div className='receiveItem'>
          <p>{t('game.adventure.gold')}</p>
          <p className='receiveItemValue'>{profit.gold}</p>
        </div>
        <div className='receiveItem'>
          <p>DLT</p>
          <p className='receiveItemValue'>{profit.dlt}</p>
        </div>
        <div className='receiveItem'>
          <p>{t('game.backpack.Goods')}</p>
          <p className='receiveItemValue'> {equipList.length??0}</p>
        </div>
        <div className='receiveItem receiveItem-keyBox'>

          <p>{t('game.adventure.key')}</p>
          <div className='flex flex-nowrap receiveItem-keyBox-right'>
            {
              keyList.length===0? 0:pocketList.map((keyItem, index)=>{
                if (initKeyList[index].length===0) return ''
                return <span key={index+'packageMap'+keyItem.title} className='receiveItemValue receiveItemKey '> {t(`game.adventure.${keyItem.title}Key`)}*{initKeyList[index].length}</span>

              })
            }
          </div>
        </div>

        <div className='receiveItemButton'>
          {renderReceiveBtn()}
        </div>
      </div>
      {/* 日志列表 */}
      <div className='logList'>
        {
          showPageList(currentPage).map((logItem, index:number)=>{
            return <div key={index+'logItem'+logItem.tokenId} className='logItem'>
              <div className='logItemLeft'>
                {/* 英雄图片 */}
                <div className='heroImgBox'>
                  <img

                    src={HeroImgList[logItem.occupation]}
                    alt=""
                  />
                </div>
                {/* 英雄信息 */}
                <div className='heroInfo'>
                  <p className='heroOccupation'>{logItem.occupation||logItem.occupation===0?t(`home.${attributesType[logItem.occupation].name}`):''}</p>
                  <p className='heroLv'>Lv.{logItem?.level??''}</p>
                  <p className='heroTokenId'>TokenID: {logItem.tokenId?subTokenId(logItem.tokenId):''}</p>
                </div>
                {/* 副本信息 */}
                <div className='replica'>
                  <div className='replicaItem'>
                    <p className='label'>{t('game.adventure.dungeonName')}</p>
                    <p className='value'>{logItem?.mapId>=0? t(`game.adventure.${advMap.find((item)=>{ return item.id===(logItem?.mapId-1) })?.title??''}`):''}</p>
                  </div>
                  <div className='replicaItem'>
                    <p className='label'>{t('game.adventure.dungeonLevel')}</p>
                    <p className='value'>{logItem?.mapLv??''}</p>
                  </div>
                </div>
                <div className='replica'>
                  <div className='replicaItem'>
                    <p className='label'>{t('game.adventure.killTheEnemy')}</p>
                    <p style={{maxWidth: 400}} className='value'>{getMonsterName(logItem)}</p>
                  </div>
                  <div className='replicaItem'>
                    <p className='label'>{t('game.adventure.reward')}</p>
                    <p className='value'>
                      {logItem?.allGold??0}{t('game.adventure.gold')}/<span className=''>{logItem?.allDlt??0}DLT</span>
                      {
                        renderKeyAndEquipItem(logItem.equips)
                      }

                    </p>
                  </div>
                </div>

              </div>
              {/* 状态 */}
              <div className='state logItemright'>
                <div>{moment.unix(logItem.time).format('YYYY年MM月DD HH:mm:ss')}</div>
                <div className='stateTop'>
                  <p className='label'>{t('game.adventure.state')}</p>
                  <p className='value'>
                    {
                      logItem.finish?
                        (logItem.claimed?t('game.adventure.received'):t('game.adventure.notClaimed')):
                        t('game.adventure.notStarted')
                    }
                  </p>
                </div>
                {
                  logItem.finish?( logItem.win?<div className='win'>WIN</div>:<div className='fail'>FAIL</div>):<BackBtn logItem={logItem} />
                }

              </div>

            </div>

          })
        }


      </div>
      {/* 分页框 */}
      <div className="flex justify-center mb-4">
        <SimplePagination
          current={currentPage}
          total={battleList.length}
          pageSize={pageSize}
          currentChange={(val:number) => {
            if (!val){
              return
            }
            setCurrentPage(val)
          }}
        />
      </div>
    </Spin>
  </PveLogStyle>
}
export default PveLog

