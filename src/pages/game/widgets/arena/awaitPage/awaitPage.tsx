import { PvpAwaitPageWrapper } from './style'
import iconRecord from 'src/assets/images/game/adventure/icon_record.png'
import { useTranslation } from 'react-i18next'
import vsImg from 'src/assets/images/game/arena/vs2.png'
import opponentHeroImg from 'src/assets/images/game/arena/opponentHero.png'
import circularBg from 'src/assets/images/game/backpack/hero_d_bg.png'

import Back from 'src/components/Back'
import { bigHeroImgList } from 'src/config'
import { pve_heroType } from 'src/types/hero'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { message, notification, Spin } from 'antd'
import PVP from '../pvp/pvp'
import { useWeb3React } from '@web3-react/core'
import { getHeroByTokenId } from 'src/web3/hero'
import { errorLog } from 'src/utils/log'
import { getSigner } from 'src/web3/equip'
import { cancelApi, getPvpbatterApi, PVPBattleRecord, T_pvpHero } from 'src/pages/api/pvp'
import { cancelPvpAbi } from 'src/web3/pvp'
import Button from 'src/components/Button'
import { attributesType } from 'src/utils/attributeSetting'
import { EquType, useWindowSize } from 'src/context'
import waiquan from 'src/assets/images/game/arena/waiquan.png'
import lightbg from 'src/assets/images/game/arena/lightbg.png'
import breakBg from 'src/assets/images/game/arena/breakBg.png'
import { awaitFun } from 'src/utils/timeHelper'
import { useUrlQueryParam } from 'src/utils/url'
const initHero:pve_heroType={
  agility: 0,
  fatigue: 0,
  intelligence: 0,
  level: 0,
  mind: 0,
  newbie: false,
  occupation: 0,
  pveCount: -1,
  stamina: 0,
  strength: 0,
  tokenId: '000000000000000000000000000000000000000000000000000000000000000000',
  total: 0,
  will: 0
}
interface I_PvpAwaitPage{
  pvpId?:string
  tokenId?:string
  callBack:()=>void
  openLog:()=>void
}
let isStopRequest=false
const PvpAwaitPage:React.FC<I_PvpAwaitPage>=({pvpId, tokenId, callBack, openLog})=>{
  const { t } = useTranslation()
  const { account, library } = useWeb3React()

  const navigate = useNavigate()
  const [pvpShow, setPvpShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const [leftHero, setLeftHero]=useState(initHero)
  const [pvpData, setPvpData]=useState<null|PVPBattleRecord>(null)
  const [{showBattle}] = useUrlQueryParam(['showBattle'])
  const { windowSize } = useWindowSize()
  const [entryTime, setEnTryTime]=useState(3)

  useEffect(() => {
    init()
    isStopRequest=false
    getBattleData()
    startTextAnimation(0)

    return ()=>{
      isStopRequest=true
      // setIsStopRequest(true)
    }
  }, [account])
  const init=()=>{
    setLoading(true)
    getleftHero()
  }

  const setIsShowFotter=(isShow:boolean) => {

    const stopScroll = (e: any) => {
      e.stopPropagation()
      // e.preventDefault();
    }
    const domList=document.getElementsByClassName('footer-mobile')
    const domCopyRight= document.getElementsByClassName('copy-right')
    if (isShow){

      if (domList[0]){
        (domList[0] as any).style.display='none'
      }
      if (domCopyRight[0]){
        (domCopyRight[0] as any).style.display='none'
      }
      // document.body.removeEventListener('touchmove', stopScroll);
      document.body.addEventListener('touchmove', stopScroll, {
        passive: true
      })
      //添加事件监听时添加了passive参数，在ios9中移除事件监听也需要加此参数
      document.body.style.overflow = 'auto'
    } else {
      if (domList[0]){
        (domList[0] as any).style.display='none'
      }
      if (domCopyRight[0]){
        (domCopyRight[0] as any).style.display='none'
      }
      document.body.addEventListener('touchmove', stopScroll, {
        passive: false
      })
      document.body.style.overflow = 'hidden'
    }

  }

  useEffect(() => {
    if (windowSize !== EquType.PC){
      setIsShowFotter(false)

    } else {
      setIsShowFotter(true)
    }
    return ()=>{
      setIsShowFotter(true)
    }

  }, [pvpShow])

  /**
   * 获取匹配信息,不为null则停止请求
   * @returns 返回匹配信息
   */
  const getBattleData=async ()=>{
    if (!pvpId||isStopRequest) return
    const res=await getPvpbatterApi( pvpId)

    if (res){

      setPvpData(res)
      if (showBattle==='true'){
        setPvpShow(true)
      } else {
        goBattle(3)
      }

    } else {
      try {
        await awaitFun(3000)
        await getBattleData()
      } catch (error) {
        await getBattleData()
      }

    }

  }

  const goBattle = (time:number) =>{


    setEnTryTime(time)
    if (time===0){
      setPvpShow(true)
    } else {
      setTimeout(() => {
        time--
        goBattle(time)
      }, 1000)

    }

  }
  const getleftHero=() => {
    if (account && tokenId) {
      setLoading(true)

      getHeroByTokenId(library, tokenId)
        .then((res) => {
          setLeftHero(res)

        })
        .catch((err) => {
          notification.error({
            message: 'Error',
            description: err.message
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const onCancel=async()=>{
    setLoading(true)
    try {
      if (!pvpId) return
      const sign=await getSigner(library, `cancel:${pvpId}`)
      const myAddress =await library.getSigner().getAddress()
      const resApi=await cancelApi(myAddress, pvpId, sign)
      if (resApi&&resApi!==''){
        const resAbi=await cancelPvpAbi(library, pvpId, resApi)
        if (resAbi&&resAbi.events){
          for (const event of resAbi.events) {

            if (event.event === 'OnCancel'){
              message.success(t('game.arena.cancelSuccess'))
              leavepage(-1+'')


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
  const renderHeroDom=(hero:pve_heroType|undefined|T_pvpHero ) => {
    //无英雄
    if (!hero) return <div className="heroBox">
      <img className="opponentHeroImg heroImg" src={opponentHeroImg} alt="" />
    </div>
    //有英雄
    hero.total=hero?.total?hero?.total:hero.strength + hero.agility + hero.stamina + hero.will + hero.intelligence + hero.mind
    return <div className="heroBox">
      {/* 背景圆 */}
      <img className="circularBg" src={circularBg} alt="" />
      {/* 英雄图片 */}
      <img className="heroImg" src={bigHeroImgList[hero.occupation]} alt="" />
      <div className="attrBox">
        <div className="rowTop">
          <span className='font-bold'>
            <span className='value'>{t(`home.${attributesType[hero.occupation].name}`)}</span>
            <span className='pl-1 pr-1'>/</span>
            <span >LV.{hero.level}</span>
          </span>
          <span>
            <span>{t('game.totalAttr')}:</span>
            <span className='value'>{hero.total}</span>
          </span>
        </div>
        <div className="rowTop">
          <span className="text-primary text-sm">
            { t('game.sStrength') }
            <span className="text-secondary"> {hero.strength}</span>
          </span>
          <span className="text-primary">/</span>
          <span className="text-primary text-sm">
            { t('game.sStamina') }
            <span className="text-secondary"> {hero.stamina}</span>
          </span>
          <span className="text-primary">/</span>
          <span className="text-primary text-sm">
            { t('game.sAgility') }
            <span className="text-secondary"> {hero.agility}</span>
          </span>
          <span className="text-primary">/</span>
          <span className="text-primary text-sm">
            { t('game.sWill') }
            <span className="text-secondary"> {hero.will}</span>
          </span>
          <span className="text-primary">/</span>
          <span className="text-primary text-sm">
            { t('game.sIntelligence') }
            <span className="text-secondary"> {hero.intelligence}</span>
          </span>
          <span className="text-primary">/</span>
          <span className="text-primary text-sm">
            { t('game.sMind') }
            <span className="text-secondary"> {hero.mind}</span>
          </span>

        </div>
      </div>
    </div>

  }

  const loadingTextArr=t('game.arena.matchingOpponents').split('')
  //动画每个文字的执行时间
  const executionTime=0.5
  const renderLoadingPoint=(count=3)=>{
    const domArr:React.ReactNode[]=[]
    const baseTime=loadingTextArr.length-1
    for (let index = 1; index <= count; index++) {
      domArr.push(<LoadingTextDom
        index={baseTime+index}
        activeIndex={activeIndex}
        isPoint={true}
        key={'point'+index}


      ></LoadingTextDom>)

    }

    return domArr

  }
  //开始序列执行文字动画
  // const startTextAnimation=(index:number)=>{
  //   let ininIndex=index
  //   //方案一 快,慢,快,慢
  //   setInterval(()=>{
  //     ininIndex= ininIndex===loadingTextArr.length+3-1?0:ininIndex+1
  //     setActiveIndex(ininIndex)
  //     //  200   150

  //   }, executionTime*1000-50)
  // }
  const startTextAnimation=(index:number)=>{

    // if (index===1000){
    //   setActiveIndex(executionTime)
    // }
    let ininIndex=index
    ininIndex= ininIndex===loadingTextArr.length+3-1?0:ininIndex+1
    setActiveIndex(ininIndex)
    setTimeout(() => {
      startTextAnimation(ininIndex)
    }, executionTime*1000-350)

  }
  interface I_LoadingTextDom{
    index:number;

    isPoint:boolean
    activeIndex:number
  }
  const LoadingTextDom: React.FC<I_LoadingTextDom>=({index, isPoint=false, activeIndex, children})=>{
    // const style={
    //   '--i': index+1
    // }
    const domFN=useMemo(()=>{
      return <span
        className={` ${isPoint?'point':'loadingPoint'}`}
        key={'point'+index}
        // style={{
        //   ...(style as React.CSSProperties),
        //   animationDelay: (index)*0.1+'s'
        // }}
        style={{
          animation: activeIndex===index?(`${isPoint?'point2':'point1'} ${executionTime}s infinite ease-in`):''
        }}

      >{children}</span>

    }, [activeIndex])
    return domFN
  }

  const renderText= useMemo(
    () => () => {
      //时间显示

      return <>{loadingTextArr.map((text:string, index)=>{
        return <LoadingTextDom
          index={index}
          isPoint={false}
          key={index}
          activeIndex={activeIndex}


        >
          {text}
        </LoadingTextDom>


      })}
      {
        renderLoadingPoint()
      }

      </>
    },
    [activeIndex]
  )

  const leavepage=(path:string)=>{
    isStopRequest=true
    if (path==='-1'){
      callBack()

    } else {
      navigate(path)
    }
  }
  return <PvpAwaitPageWrapper>
    <Spin spinning={loading} >
      <div className="pageContent">
        { !pvpShow?
          <div className="awaitPage">
            <div className="record" >
              <Back className='clossBack' backCall={()=>{ leavepage('-1') }} />
              <div className="flex items-center" onClick={()=>{ openLog() }}>
                <img src={iconRecord} alt="" />
                <span>{t('game.adventure.history')}</span>
              </div>
            </div>
            <div className="content">
              {/* 我方英雄 */}
              {renderHeroDom(leftHero)}
              <div className="centerBox">
                <div className='vsBg'>
                  {
                    pvpData?
                      <div className='entryTime'>
                        {entryTime}

                      </div>
                      :
                      <>
                        <img className="vsImg" src={vsImg} alt="" />
                        <img className="waiquan" src={waiquan} alt="" />
                        <img className="lightbg" src={lightbg} alt="" />
                        <img className="breakBg" src={breakBg} alt="" />
                      </>
                  }


                </div>
                <div className='loadingText'>
                  {
                    pvpData? t('game.arena.matchingCompleted'):renderText()
                  }
                </div>
              </div>

              {/* 敌方英雄 */}
              {renderHeroDom(pvpData?.prepareInfo.hero2.tokenId===leftHero.tokenId?pvpData?.prepareInfo.hero1:pvpData?.prepareInfo.hero2)}

            </div>
            <div className="loadingBox">
              {
                pvpData? <></>
                // <Button

                //   width="192px"
                //   height="48px"
                //   fontSize="18px"
                //   bold
                //   style={{display: 'none'}}
                //   className="mt-2"
                //   onClick={() =>{
                //     setPvpShow(true)

                //   }}
                // >
                //   {t('game.arena.viewBattle')}
                // </Button>
                  :<Button

                    width="192px"
                    height="48px"
                    fontSize="18px"
                    bold
                    onClick={() =>{
                      onCancel()

                    }}
                  >
                    {t('game.arena.unmatch')}
                  </Button>
              }


            </div>
          </div>:<div
            className="pve-container"
          >
            <Back className='clossBack' backCall={()=>{ leavepage(-1+'') }} />
            {
              pvpData&& <PVP pvpData={pvpData} backCall={()=>{ leavepage(-1+'') }} />
            }


          </div>}
      </div>
    </Spin>
  </PvpAwaitPageWrapper>


}

export default PvpAwaitPage


