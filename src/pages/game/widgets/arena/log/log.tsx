import { useWeb3React } from '@web3-react/core'
import { PvpLogStyle } from './style'
import { useTranslation } from 'react-i18next'
import btnRedBg from 'src/assets/images/common/btn_arrow_red.png'
import winImgUrl from 'src/assets/images/game/arena/win.png'
import vsImg from 'src/assets/images/game/arena/vsLog.png'
import firthImg from 'src/assets/images/game/arena/first.png'

import Button from 'src/components/Button'
import { getHeroHeadImg} from 'src/config'
import { useEffect, useMemo, useState } from 'react'
import SimplePagination from 'src/components/SimplePagination'

import { message, Select, Spin } from 'antd'
import { attributesType } from 'src/utils/attributeSetting'
import { subTokenId } from 'src/utils'
import { useSetState } from 'ahooks'

import moment from 'moment'
import { I_Equip } from '../../backpack'
import { equipSpilt } from '../../backpack/equipUtils'
import { formatTime } from 'src/utils/timeHelper'
import Back from 'src/components/Back'
import { pvpMap } from '..'
import { cancelApi, getPvpClaimAllApi, getPvpClaimObjectsApi, getPvpLogApi, I_getPvpClaimObjectsApi } from 'src/pages/api/pvp'

import { getSigner } from 'src/web3/equip'
import { errorLog } from 'src/utils/log'
import { cancelPvpAbi, onRematchAbi, pvpClaimAllAbi } from 'src/web3/pvp'

import PvpAwaitPage from '../awaitPage/awaitPage'
import { useUrlQueryParam } from 'src/utils/url'
import { useNavigate } from 'react-router-dom'
import { BigNumber } from 'ethers'


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
  advMap:[]
}

type T_PVPListHero = {
  tokenId: string;
  //职业
  occupation: number
  level: number
}

export type T_PVPResult = {
  joinId:string
  mapId:number
  hero: T_PVPListHero,
  hero2: T_PVPListHero,
  win: boolean
  lv: number
  //竞技等级
  status: 1|2|3|4,
   //1. 等待, 2. 取消, 3. 已撮合
   claimed:boolean,
  dlt: number
  //奖励的DLT数量
  gold: number
  //奖励的gold数量
  winEquips: {name:string, en:string}[]
  //赢取装备信息
  lossEquip: {name:string, en:string}[]
  //掉落装备信息
  joinTime: number
  //报名时间
  pvpTime: number
   //pvp时间
   canRejoin: boolean
   //是否可以继续参加
}
const PvpLog=(props:I_PveLog)=>{
  const {Option} =Select
  const navigate = useNavigate()

  const { library, account } = useWeb3React()
  const { t, i18n: {language} } = useTranslation()
  const pageSize=10
  const [{tokenId, pvpId, isBack}, setQueryParam] = useUrlQueryParam(['showBattle', 'tokenId', 'pvpId', 'isBack'])
  const [battleList, setBattleList]=useState<T_PVPResult[]>( [])
  const [profit, setProfit]=useSetState<I_getPvpClaimObjectsApi>({
    allGold: 0,
    allDlt: 0,
    heroNum: 0,
    winTimes: 0,
    lossTimes: 0,
    lossEquips: [],
    winEquips: []

  })
  const [loading, setLoading]=useState(false)
  const [btnLoading, setBtnLoading]=useState(false)
  const [currentPage, setCurrentPage]=useState(1)
  const [endTime, setEndTime]=useState(0)
  const [pvpInfoItem, setPvpInfoItem]=useState<null|{
    tokenId:string,
    joinId:string
  }>(null)
  const [pvpAwaitShow, setPvpAwaitShow] = useState(false)
  const initFilter={
    mapId: '-1',
    level: '-1'
  }
  const [filterConfig, setFilterConfig] = useSetState(initFilter)
  const filterList=battleList.filter((item)=>{
    return item.mapId+''===filterConfig.mapId||filterConfig.mapId==='-1'
  }).filter((item)=>{
    return item.lv+''===filterConfig.level||filterConfig.level==='-1'
  })
  useEffect(()=>{
    init()
  }, [])
  //初始化数据
  const init=()=>{
    setLoading(true)
    getLibrary()
    checkPvpIsOpen()

  }
  //检查是否已经打开了回放
  const checkPvpIsOpen=()=>{
    if (tokenId&&pvpId){
      setPvpInfoItem({
        tokenId,
        joinId: pvpId
      })
      setPvpAwaitShow(true)
      setLoading(false)
    }

  }
  const getLibrary=async ()=>{
    if (library){
      const myAddress =await library.getSigner().getAddress()
      // const myAddress='0xd12dA7A761AB09B1CF8824fF3e7B42F601A0a5E5'
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

    const res=await getPvpLogApi(myAddress)
    setBattleList(res.sort((a, b)=>{ return b.joinTime-a.joinTime }).sort((a, b)=>{ return a.status-b.status }))
    setLoading(false)
    // const reqBattles=battleList.slice((page-1)*pageSize, page*pageSize)


  }

  //领取收益
  const claimAll=async()=>{
    try {
      setBtnLoading(true)
      const myAddress =await library.getSigner().getAddress()
      const res= await getPvpClaimAllApi(myAddress)
      if (res){
        // await claimAllBattleAbi(library, res)
        await pvpClaimAllAbi(library, res.joinIds, res.allDlts, res.allGolds, res.sig)
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
    const res=await getPvpClaimObjectsApi(myAddress)

    if (res){
      setProfit(res)
      if (res){
        countDown(0)
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

    return filterList.slice((page-1)*pageSize, page*pageSize)
  }


  /**
   * 渲染领取按钮
   * @returns 返回领取按钮
   */
  const renderReceiveBtn= useMemo(
    () => () => {
      const isDisabled=profit.allDlt===0&&profit.heroNum===0

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
        {endTime>0?getEndtTime:(profit.allDlt===0&&profit.heroNum!==0?t('game.arena.recallHeroes'):t('game.adventure.claimReward'))}
      </Button>
    },
    [endTime, profit.allDlt, profit.heroNum, profit.lossEquips, profit.winEquips, btnLoading]
  )
  const { equipList}=equipSpilt(profit.winEquips??[])
  const failEquipList=equipSpilt(profit.lossEquips??[]).equipList

  const renderFilterLevel=()=>{
    const domArr=[
      <Option value={'-1'} key={'-1selectLv'}> {t('game.arena.allLevels')}</Option>
    ]
    for (let index = 1; index <= 12; index++) {
      domArr.push( <Option value={index+''} key={index+'selectLv'}>   Lv.{index}</Option>)
    }

    return domArr
  }
  const onCancel=async(logItem:T_PVPResult)=>{

    setLoading(true)
    try {
      const sign=await getSigner(library, `cancel:${logItem.joinId}`)
      const myAddress =await library.getSigner().getAddress()
      const resApi=await cancelApi(myAddress, logItem.joinId, sign)
      if (resApi&&resApi!==''){
        const resAbi=await cancelPvpAbi(library, logItem.joinId, resApi)
        if (resAbi&&resAbi.events){
          for (const event of resAbi.events) {

            if (event.event === 'OnCancel'){
              message.success(t('game.arena.cancelSuccess'))
              init()

            }
          }
        }

      }
      setLoading(false)
    } catch (error) {
      setLoading(false)

      message.error(t('game.arena.cancelFailed'))
      errorLog('pvp取消', error)

    }

  }
  const goAwait=(logItem:T_PVPResult)=>{
    setQueryParam({
      showBattle: 'true',
      tokenId: logItem.hero.tokenId,
      pvpId: logItem.joinId
    })
    setPvpInfoItem({
      tokenId: logItem.hero.tokenId,
      joinId: logItem.joinId
    })
    setPvpAwaitShow(true)
    // const isFinishedStr =logItem.status===3?'?showBattle=true':''
    // navigate(`/game/pvpAwait/${logItem.joinId}/${logItem.hero.tokenId+isFinishedStr}`)
  }

  /**
   * 继续匹配
   */
  const onRematch=async (logItem:T_PVPResult)=>{
    setLoading(true)

    try {
      if (account){
        const res=await onRematchAbi(library, logItem.joinId)
        if (res&&res.events){
          for (const event of res.events) {

            if (event.event === 'OnJoin'){
              const joinId=(event?.args?.joinId as BigNumber).toHexString()
              console.log(joinId)

              // setPvpInfoItem({
              //   tokenId: hero.tokenId,
              //   joinId: joinId
              // })
              // setQueryParam({
              //   tokenId: hero.tokenId,
              //   pvpId: joinId
              // })
              setPvpAwaitShow(true)

            }
          }
          // setPveShow(true)

        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      errorLog('pvp', error)
    }


  }
  const WinImg=<img
    className='winImg'
    src={winImgUrl}
    alt=""
  />
  const FirthImg=<img
    className='firthImg'
    src={firthImg}
    alt=""
  />
  return !pvpAwaitShow?<PvpLogStyle>
    <div className="record">
      <Back className='clossBack' backCall={()=>{

        isBack? navigate(-1):navigate('/game?name=arena')
      }} />
      <div className="flex items-center" >
        {/* <img src={iconRecord} alt="" />
        <span>{t('game.adventure.history')}</span> */}
      </div>
    </div>
    <Spin spinning={loading}>
      <div className="leftRow flex justify-end w-full text-base">
        <div id='selectsort' className=" flex items-center flex-nowrap cursor-pointer ">

          <Select value={filterConfig.mapId} bordered={false} className="selectColor mr-2"
            size="small"
            getPopupContainer={() => { return document.getElementById('selectsort')??document.body }}
            dropdownClassName='dropdownClassName'
            onChange={(value:string)=>{
              setFilterConfig({
                mapId: value
              })
            }}
          >
            <Option value={'-1'}> {t('game.arena.allArenas')}</Option>
            {
              pvpMap.map((item, index)=>{
                return <Option value={item.id+''} key={index}> {t(`game.arena.map.${item.title}`)}</Option>

              })
            }
          </Select>
          <Select value={filterConfig.level} style={{width: 95}} bordered={false} className="selectColor mr-2"
            size="small"
            getPopupContainer={() => { return document.getElementById('selectsort')??document.body }}
            dropdownClassName='dropdownClassName'
            onChange={(value:string)=>{
              setFilterConfig({
                level: value+''
              })
            }}
          >
            {renderFilterLevel()}
          </Select>
        </div>
      </div>
      {/* 领取奖励框 */}
      <div className='flex flex-nowrap receiveBox'>
        <div className='receiveItem receiveItem-title' >
          <p> {t('game.arena.myVictory')}</p>
          <p className='receiveItemValue'>{ filterList.reduce((prev, cur)=>prev+(cur.win?1:0), 0)}</p>
        </div>
        <div className='receiveItem'>
          <p>{t('game.arena.myDefeat')}</p>
          <p className='receiveItemValue'>{filterList.reduce((prev, cur)=>prev+(!cur.win&&cur.status===3?1:0), 0)}</p>
        </div>
        <div className='receiveItem'>
          <p>{t('game.arena.heroesCanBeRecalled')}</p>
          <p className='receiveItemValue'> {profit.heroNum??0}

          </p>
        </div>
        <div className='receiveItem spoilsItem'>
          <p>{t('game.arena.myBenefits')}</p>
          <p className='receiveItemValue '>
            {profit.allDlt??0}DLT
            <span className='receiveEquip'>

              {
                equipList.map((equip, index)=>{
                  return <span className='ml-1' key={index}>/ {equip.name}</span>
                })
              }
              {
                failEquipList.map((equip, index)=>{
                  return <span className='ml-1 fallEquip colorText' key={index}>/ {equip.name}（{t('game.arena.loss')}）</span>
                })
              }
            </span>


          </p>
        </div>

        <div className='receiveItemButton'>
          {renderReceiveBtn()}
        </div>
      </div>
      {/* 日志列表 */}
      <div className='logList'>
        {
          showPageList(currentPage).map((logItem, index:number)=>{
            //竞技状态
            const statusArr=[
              {
                text: '',
                btn: <></>
              },
              {
                text: t('game.arena.matching'),
                btn: <>
                  <Button
                    key={index+'btn1'}
                    width="192px"
                    size="small"
                    height="48px"
                    fontSize="18px"
                    bold
                    className="mb-2"
                    onClick={() =>{
                      goAwait(logItem)

                    }}
                  >
                    {t('game.arena.viewMatches')}
                  </Button>
                  <Button
                    key={index+'btn2'}
                    width="192px"
                    height="48px"
                    fontSize="18px"
                    bold
                    size="small"
                    onClick={() =>{
                      onCancel(logItem)

                    }}
                  >
                    {t('game.arena.unmatch')}
                  </Button>
                </>
              },
              {
                text: t('game.arena.matching'),
                btn: <></>
              },
              {
                text: logItem.win?t('game.adventure.notClaimed'):t('game.arena.noRecall'),
                btn: <>

                  <Button
                    key={index+'btn3'}
                    width="192px"
                    height="48px"
                    fontSize="18px"
                    size="small"
                    bold
                    className="mt-2"
                    onClick={() =>{
                      goAwait(logItem)

                    }}
                  >
                    {t('game.arena.viewPlayback')}
                  </Button>
                  {
                    !logItem.claimed&&logItem.canRejoin&&logItem.joinId==='123123123123123'&& <Button
                      key={index+'btn3'}
                      width="192px"
                      height="48px"
                      fontSize="18px"
                      size="small"
                      bold
                      className="mt-2"
                      onClick={() =>{
                        onRematch(logItem)

                      }}
                    >
                      {t('game.arena.rematch')}
                    </Button>
                  }

                </>


              },
              {
                text: logItem.win?t('game.adventure.received'):t('game.arena.recalled'),
                btn: <Button
                  key={index+'btn3'}
                  width="192px"
                  height="48px"
                  fontSize="18px"
                  bold
                  className="mt-2"
                  onClick={() =>{
                    goAwait(logItem)

                  }}
                >
                  {t('game.arena.viewPlayback')}
                </Button>
              },
              {
                text: t('game.arena.unmatch'),
                btn: <Button
                  key={index+'btn3'}
                  width="192px"
                  height="48px"
                  fontSize="18px"
                  bold
                  className="mt-2"
                  onClick={() =>{
                    onCancel(logItem)

                  }}
                >
                  {t('game.arena.unmatch')}
                </Button>
              }
            ]
            const isEnd=logItem.status===3
            return <div key={index+'logItem'+logItem.hero.tokenId} className='logItem'>
              <div className='logItemLeft'>
                {/* 左方英雄信息 */}
                <div className='leftHero heroBox leftRed'>
                  {/* 英雄图片 */}
                  <div className='heroImgBox'>
                    <img

                      src={!!logItem.hero.occupation||logItem.hero.occupation===0?getHeroHeadImg(logItem.hero.occupation):''}
                      alt=""
                    />
                    {/* 胜利图片 */}
                    {isEnd&&logItem.win&&WinImg}
                  </div>
                  {/* 英雄信息 */}
                  <div className='heroInfo'>
                    <p className='heroOccupation'>
                      {logItem.hero.occupation||logItem.hero.occupation===0?t(`home.${attributesType[logItem.hero.occupation].name}`):''}
                      ({t('game.arena.my')})
                      {isEnd&&logItem.win&&FirthImg}
                    </p>
                    <p className='heroLv'>Lv.{logItem?.hero.level??''}</p>
                    <p className='heroTokenId'>TokenID: {logItem.hero.tokenId?subTokenId(logItem.hero.tokenId):''}</p>
                  </div>
                  {/* vs图片 */}
                  <img
                    className='vsImg'
                    src={vsImg}
                    alt=""
                  />

                </div>
                {/* 右方英雄信息 */}
                <div className='rightHero heroBox rightBlue'>
                  {
                    logItem.hero2&& <>
                      {/* 英雄图片 */}
                      <div className='heroImgBox'>
                        <img

                          src={!!logItem.hero2.occupation||logItem.hero2.occupation===0?getHeroHeadImg(logItem.hero2.occupation):''}
                          alt=""
                        />
                        {/* 胜利图片 */}
                        {isEnd&&!logItem.win&&WinImg}
                      </div>
                      {/* 英雄信息 */}
                      <div className='heroInfo'>
                        <p className='heroOccupation'>
                          {logItem.hero2.occupation||logItem.hero2.occupation===0?t(`home.${attributesType[logItem.hero2.occupation].name}`):''}
                          {isEnd&&!logItem.win&&FirthImg}
                        </p>
                        <p className='heroLv'>Lv.{logItem?.hero2.level??''}</p>
                        <p className='heroTokenId'>TokenID: {logItem.hero2.tokenId?subTokenId(logItem.hero2.tokenId):''}</p>
                      </div>
                    </>
                  }

                </div>
                <div className='border'></div>
                <div className='replica'>
                  <div className='replicaItemRow'>
                    <div className='replicaItem'>
                      <p className='label'>{t('game.arena.arena')}</p>
                      <p className='value'>
                        {t(`game.arena.map.${pvpMap[logItem.mapId].title}`)}
                        <span className='ml-1'>Lv.                        {logItem.lv}</span>

                      </p>
                    </div>

                    <div className='replicaItem'>
                      <p className='label'>{t('game.adventure.state')}</p>
                      <p className='value'>
                        {
                          isEnd?(logItem.claimed?statusArr[4].text:statusArr[3].text):statusArr[logItem.status].text
                        }

                      </p>
                    </div>
                  </div>
                  <div className='replicaItemRow'>
                    <div className='replicaItem'>
                      <p className='label'>{t('game.adventure.reward')}</p>
                      <p className='value'>
                        <span className='dltText'>{logItem?.dlt??0}DLT</span>
                        <span className='equipText'>
                          {/* 获得的装备 */}
                          {logItem.winEquips.length>0&&<span className='pl-1'>
                            {
                              language==='en-US'?logItem.winEquips[0].en:logItem.winEquips[0].name
                            }
                          </span>
                          }

                          {/* 失去的装备 */}
                          {
                            logItem.lossEquip.length>0&& <span className='pl-1'>
                              {
                                language==='en-US'?logItem.lossEquip[0].en:logItem.lossEquip[0].name
                              }
                              <span className='colorText'>
                                 ({t('game.arena.loss')})
                              </span>
                            </span>
                          }

                        </span>


                      </p>
                    </div>
                  </div>


                </div>

              </div>
              <div className='logItemRight'>
                <div className='time'>{moment.unix(logItem.joinTime).format('YYYY.MM.DD HH:mm:ss')}</div>
                <div className='btnBox'>
                  {
                    statusArr[logItem.status].btn
                  }
                </div>


              </div>

            </div>

          })
        }


      </div>
      {/* 分页框 */}
      <div className="flex justify-center mb-4">
        <SimplePagination
          current={currentPage}
          total={filterList.length}
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
  </PvpLogStyle>:<>

    {
      pvpInfoItem&& <PvpAwaitPage
        callBack={()=>{
          setPvpAwaitShow(false)
          setQueryParam({
            tokenId: null,
            pvpId: null,
            showBattle: null,
            isBack: null
          })
        }}
        openLog={()=>{ setPvpAwaitShow(false) }}
        tokenId={pvpInfoItem.tokenId} pvpId={pvpInfoItem.joinId}/>
    }

  </>
}
export default PvpLog


