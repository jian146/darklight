import { ArenaWrapper } from './style'
import Button from 'src/components/Button'
import advOne from 'src/assets/images/game/arena/map/1.png'
import advTwo from 'src/assets/images/game/arena/map/2.png'
import goldIcon from 'src/assets/images/game/arena/goldIcon.png'
import iconRecord from 'src/assets/images/game/adventure/icon_record.png'
import btnDarkBg from 'src/assets/images/common/btn_arrow_dark.png'
import btnRedBg from 'src/assets/images/common/btn_arrow_red.png'
import { useTranslation } from 'react-i18next'
import useMountedRef from 'src/utils'
import { useSetState } from 'ahooks'
import { useEffect, useState } from 'react'
// import PVEModal from './components/Dialog/pveModal'
import { HeroType } from 'src/types/hero'
import { useWeb3React } from '@web3-react/core'
import { BigNumber, ethers } from 'ethers'
import { approveDLT, checkDlt, queryAndApprove, queryApproveDLT } from 'src/web3'
import { isServerConfig } from 'src/config/switch'

import { useNavigate } from 'react-router-dom'
import { joinPvp, queryAndApproveHeroForPvp } from 'src/web3/pvp'

import { message, Spin } from 'antd'
import { errorLog } from '../../../../utils/log'
import { mapType } from '../adventure'
import { useUrlQueryParam } from 'src/utils/url'
import PvpAwaitPage from './awaitPage/awaitPage'
import PvpChoseHeroModal from '../adventure/components/Dialog/pvpChoseHeroModal'
export type mapType_price = mapType&{price:any}

export const pvpMap: mapType_price[] = [
  {
    title: 'adv1',
    id: 0,
    level: {
      max: 12,
      min: 1
    },
    price: {
      lv1: 500,
      lv2: 1000,
      lv3: 2000,
      lv4: 3000,
      lv5: 4000,
      lv6: 5000,
      lv7: 5000,
      lv8: 5000,
      lv9: 5000,
      lv10: 5000,
      lv11: 5000,
      lv12: 5000
    },
    desc: 'adv1desc',
    src: advOne,
    index: 'Ⅰ',
    type: 'started'

  }
  ,
  {
    id: 1,
    title: 'adv2',
    price: {
      lv1: 1000,
      lv2: 1000,
      lv3: 1000,
      lv4: 1000,
      lv5: 1000,
      lv6: 1000,
      lv7: 1000,
      lv8: 1000,
      lv9: 1000,
      lv10: 1000,
      lv11: 1000,
      lv12: 1000
    },
    level: {
      max: 12,
      min: 1
    },
    desc: 'adv2desc',
    src: advTwo,
    index: 'Ⅱ',
    type: 'started'
  }

]
const Arena: React.FC = () => {
  const { library, account } = useWeb3React()
  const [{tokenId, pvpId}, setQueryParam] = useUrlQueryParam(['showBattle', 'tokenId', 'pvpId'])
  const [choseHeroModalInfo, setChoseHeroModalInfo] = useSetState<{
    seletedAdv:mapType,
    visible: boolean;
  }>({
    visible: false,
    seletedAdv: pvpMap[0]
  })
  const [pvpAwaitShow, setPvpAwaitShow] = useState(false)
  const [pvpInfoItem, setPvpInfoItem]=useState<null|{
    tokenId:string,
    joinId:string
  }>(null)
  const isNeeddltApprove=false


  // const [selectHero, setSelectHero]=useState<HeroType>()
  // const [selectLevel, setSelectLevel]=useState(0)
  const [loading, setLoading]=useState(false)
  // dlt授权状态
  const [dltApprove, setDltApprove] = useState<boolean>(!isNeeddltApprove)
  const navigate = useNavigate()
  //英雄版本
  const [heroVersion, setHeroVersion]=useState('0')
  const { t } = useTranslation()
  const mountedRef = useMountedRef()


  const renderMapDesc = (desc: string) => {
    const ct = desc.split('@')
    return ct.map(item => <p key={item}>{item}</p>)
  }
  /**
   * 授权dlt
   */
  const authorizeDlt = async () => {
    try {
      if (account) {
        await approveDLT(library, 'pve')
        setDltApprove(true)
      }
    } catch (error) {
      setDltApprove(!isNeeddltApprove)
    }
  }


  useEffect(() => {
    // 先查询是否授权dlt
    if (account) {
      queryApproveDLT(library, account, 'pve')
        .then((res) => {
          if (!mountedRef.current) return
          if (res.lte(ethers.utils.parseEther('1'))) {
            setDltApprove(!isNeeddltApprove)
          } else setDltApprove(true)
        })
        .catch(() => setDltApprove(!isNeeddltApprove))

    }
  }, [account, library, mountedRef])
  useEffect(() => {
    checkPvpIsOpen()
  }, [])

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
  const goPvp=async (hero: HeroType, level:number)=>{
    setLoading(true)

    try {
      if (account){
        const goldIsPass = await queryAndApprove(
          library,
          account,
          'pvp',
          'dlt'
        )
        if (!goldIsPass) {
          //授权失败
          message.warn(t('message.privilegeGrantFailed'))
          setLoading(false)
          return
        }
        const heroApprove = await queryAndApproveHeroForPvp(library)
        if (!heroApprove){
          message.warn('英雄授权失败')
          setLoading(false)
          return
        }
        //检查费用
        const dltPrice:number=parseInt(pvpMap[choseHeroModalInfo.seletedAdv.id].price['lv'+level]??'0')
        if (dltPrice!==0&&!await checkDlt(library, dltPrice)){
          message.info(t('message.DLT_Insufficient'))
          return
        }
        const res=await joinPvp(library, choseHeroModalInfo.seletedAdv.id, level, hero.tokenId)

        if (res&&res.events){
          for (const event of res.events) {

            if (event.event === 'OnJoin'){
              const joinId=(event?.args?.joinId as BigNumber).toHexString()
              // navigate(`/game/pvpAwait/${joinId}/${hero.tokenId}`)
              setPvpInfoItem({
                tokenId: hero.tokenId,
                joinId: joinId
              })
              setQueryParam({
                tokenId: hero.tokenId,
                pvpId: joinId
              })
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

  const goLog=()=>{
    navigate('/game/pvpLog?isBack=true')
  }
  return !pvpAwaitShow? <Spin spinning={loading}>
    <ArenaWrapper>
      <div className="record" >
        <div className="flex items-center" onClick={goLog }>
          <img src={iconRecord} alt="" />
          <span>{t('game.adventure.history')}</span>
        </div>
      </div>
      <div className="advmap">
        <div className="pool">
          <p className="title">{t('game.arena.currentAwardPool')}</p>
          <p className="price">{t('game.arena.toBeOpened')} </p>
          <div className="bottomContent">
            <table className='rangTable'>
              <thead>
                <tr>
                  <th></th>
                  <th>{t('game.arena.ranking')}</th>
                  <th>{t('game.arena.walletAddress')}</th>
                  <th>{t('game.arena.victoryField')}</th>
                  <th>{t('game.arena.reward')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>1</td>
                  <td>   --  </td>
                  <td>--</td>
                  <td><div className="priceRow"><img style={{display: 'none'}} src={goldIcon} className="walletImg" alt='wallet' />--</div></td>
                </tr>
                <tr>
                  <td></td>
                  <td>2</td>
                  <td>   --  </td>
                  <td>--</td>
                  <td><div className="priceRow"><img style={{display: 'none'}} src={goldIcon} className="walletImg" alt='wallet' />--</div></td>
                </tr>
                <tr>
                  <td></td>
                  <td>3</td>
                  <td>   --  </td>
                  <td>--</td>
                  <td><div className="priceRow"><img style={{display: 'none'}} src={goldIcon} className="walletImg" alt='wallet' />--</div></td>
                </tr>
                <tr className="lastRow">
                  <td>
                    {/* {t('game.arena.me')} */}
                  </td>
                  <td>
                    {/* 11 */}
                  </td>
                  <td>
                    {/* 0xd1****0a5E5    198  */}

                  </td>
                  <td>
                    {/* 148 */}

                  </td>
                  <td>
                    {/* <div className="priceRow"><img src={goldIcon} className="walletImg" alt='wallet' />1200000</div> */}
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="more"><span>{t('game.adventure.ComingSoon')}</span></p>

            {/* <p className="more"><span>{t('game.arena.seeMoreRankings')}&gt;</span></p> */}
          </div>
        </div>
        {
          pvpMap.map(item => (
            <div className="boxContent" key={item.id}>
              <div className="box" key={item.src}>
                {/* <i className="index">{item.index}</i> */}
                <p className="title">{t(`game.arena.map.${item.title}`)}</p>

                <div className="desc">
                  <p className="desc-level">{`LV.${item.level.min} - LV.${item.level.max}`}</p>
                  <div className="desc-cont">
                    {renderMapDesc(t(`game.arena.map.${item.desc}`))}
                  </div>
                  {isServerConfig? <Button
                    width="192px"
                    height="48px"
                    img={btnRedBg}
                    className="mt-5"
                    bold
                    disabled={true}
                    onClick={authorizeDlt}
                    style={{ zIndex: 1 }}
                  >
                    {t('message.serverMaintenance')}
                  </Button>:(
                    dltApprove ? (
                      <Button
                        width="192px"
                        height="48px"
                        fontSize="18px"
                        bold
                        disabled={item.type === 'pre'}
                        className="mt-5"
                        img={item.type === 'started' ? btnRedBg : btnDarkBg}
                        onClick={() =>{
                          setChoseHeroModalInfo({visible: true, seletedAdv: item})
                        }}
                      >
                        {item.type === 'started' ?
                        // t('game.adventure.StAdventure') :
                          t('game.arena.heroesFight') :
                          t('game.ComingSoon')}
                      </Button>
                    ) : (
                      <Button
                        width="192px"
                        height="48px"
                        img={btnRedBg}
                        className="mt-5"
                        bold
                        onClick={authorizeDlt}
                        style={{ zIndex: 1 }}
                      >
                        {t('game.card.authorizeDlt')}
                      </Button>
                    )
                  )}
                </div>


              </div>
              <img className='advImg' src={item.src} draggable="false" alt="" />
            </div>

          ))
        }
      </div>


      {/* 冒险选择英雄弹窗 */}

      <PvpChoseHeroModal

        visible={choseHeroModalInfo.visible}
        seletedAdv={choseHeroModalInfo.seletedAdv}
        onCancelbtnClick={()=>{ setChoseHeroModalInfo({visible: false}) }}
        heroVersion={heroVersion}
        setHeroVersion={setHeroVersion}
        onOkbtnClick={async(hero: HeroType, level:number)=>{
          // setChoseHeroModalInfo({visible: false})
          // setSelectLevel(level)
          // setSelectHero(hero)

          await goPvp(hero, level)

        }}
      />
    </ArenaWrapper>
  </Spin>:<>

    {
      pvpInfoItem&& <PvpAwaitPage
        callBack={()=>{
          setPvpAwaitShow(false)
          setChoseHeroModalInfo({visible: false})
          setQueryParam({
            tokenId: null,
            pvpId: null,
            showBattle: null
          })
        }}
        openLog={goLog}
        tokenId={pvpInfoItem.tokenId}
        pvpId={pvpInfoItem.joinId}
      />
    }

  </>


}

export default Arena
