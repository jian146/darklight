import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { message, notification } from 'antd'
import { ethers } from 'ethers'
import { RoleWrapper } from './style'
import {
  approveDLT,
  approveGlod,
  checkDlc,
  checkDlt,
  queryAndApprove,
  queryApproveDLT,
  queryApproveGold
} from 'src/web3'
// eslint-disable-next-line import/namespace
import { buyHerobyCountAbi } from 'src/web3/hero'
import gameBgL from 'src/assets/images/game/card/gamebg-l.jpeg'
import gameBgR from 'src/assets/images/game/card/gamebg-r.jpeg'
import newCardBg from 'src/assets/images/game/card/new_card_bg.png'
import Button from 'src/components/Button'
import roleContImg from 'src/assets/images/game/card/role_cont_img.png'
import { useNavigate } from 'react-router'
import useMountedRef, { subTokenId } from 'src/utils'
import { getQualityPic, HeroImgList } from 'src/config'
import Loading from 'src/components/Loading'
import { useTranslation } from 'react-i18next'
import { HeroType, Occupations } from 'src/types/hero'
import classnames from 'classnames'
import { CardType } from 'src/types/card'
import leftImg from 'src/assets/images/game/left.png'
import rightImg from 'src/assets/images/game/right.png'
import NoviceImgMark from 'src/components/NoviceImgMark'
import btnBg from 'src/assets/images/common/btn_arrow_red.png'
import btnDarkBg from 'src/assets/images/common/btn_arrow_dark.png'
import jinbiImg from 'src/assets/images/game/card/jinbi.png'
import luckImg from 'src/assets/images/game/card/luckValue.png'
import prizePoolBox_Bg from 'src/assets/images/game/card/prizePoolBox_Bg.png'
import luckHeroBg from 'src/assets/images/dialog/drawHero_dialog/luckly_heroBg.png'
import luckDlt from 'src/assets/images/game/card/luckly_light_bg.png'
import { useSetState } from 'ahooks'
import { DrawHeroDialog } from 'src/components/Dialog'

import { getHeroLuckyRate } from 'src/pages/api/card'
const isDisabled =false
const DrawCard: React.FC = () => {
  const { library, account } = useWeb3React()
  // 页面的加载状态
  const [loading, setLoading] = useState<boolean>(false)
  // dlt授权状态
  const [dltApprove, setDltApprove] = useState<boolean>(false)
  // gold 授权状态
  const [goldApprove, setGoldApprove] = useState<boolean>(false)
  // 执行动画
  const [animateIn, setAnimateIn] = useState<boolean>(false)
  // 抽卡获取到的英雄
  const [hero, setHero] = useState<HeroType&{luckyIndex:number} | undefined>()
  //幸运值
  const [luckValue, setLuckyValue] = useState(0)
  //抽奖池余额
  const [dltGroup, setDltGroup] = useState('0')
  // 抽卡类型，新手卡和普通卡
  const [cardType, setCardType] = useState<CardType>('normal')
  // 转移窗口配置
  const [draw10ModalConfig, setDraw10ModalConfig] = useSetState<{
    list: HeroType[];
    visible: boolean;
    luckyIndex:number;
  }>({
    list: [],
    visible: false,
    luckyIndex: -1
  })
  const navigate = useNavigate()
  const mountedRef = useMountedRef()
  const { t } = useTranslation()

  useEffect(() => {
    if (account) {
      getLuckilyAndDltGroup()
    }

  }, [account])
  useEffect(() => {
    // 先查询是否授权dlt
    if (account) {
      queryApproveDLT(library, account)
        .then((res) => {
          if (!mountedRef.current) return
          if (res.lte(ethers.utils.parseEther('1'))) {
            setDltApprove(false)
          } else setDltApprove(true)
        })
        .catch(() => setDltApprove(false))
    }
  }, [account, library, mountedRef])

  // 查询 gold 授权
  useEffect(() => {
    if (account) {
      queryApproveGold(library, account)
        .then((res) => {
          if (!mountedRef.current) return
          if (res.lte(ethers.utils.parseEther('1'))) {
            setGoldApprove(false)
          } else setGoldApprove(true)
        })
        .catch(() => setGoldApprove(false))
    }
  }, [account, library, mountedRef])

  const dltPrice=1000
  /**
   * 授权dlt
   */
  const authorizeDlt = async () => {
    try {
      if (account) {
        await approveDLT(library)
        setDltApprove(true)
      }
    } catch (error) {
      setDltApprove(false)
    }
  }

  /**
   * 授权gold
   */
  const authorizeGold = async () => {
    if (account) {
      approveGlod(library)
        .then((res) => {
          setGoldApprove(true)
        })
        .catch(() => setGoldApprove(false))
    }
  }

  const checkSubmit = async (price: number):Promise<boolean> => {
    try {

      if (cardType === 'normal' ){
        if (!await checkDlt(library, price)){
          message.info(t('message.DLT_Insufficient'))
          return false
        }
      } else {
        //判断是否授权
        if (account){
          const isPass=await queryAndApprove(library, account, 'hero', 'dlc')
          if (isPass) {
            // message.success(t('message.AuthorizationSuccessful'))
          } else {
            //授权失败
            message.warn(t('message.privilegeGrantFailed'))
            return false
          }

        }
        if (!await checkDlc(library, price)){
          message.info(t('message.DLC_Insufficient'))
          return false
        }
      }
      return true
    } catch (error) {
      message.error(`check ${cardType === 'normal'?'DLT':'DLC' }fail`)
      return false
    }

  }
  /**
   * 抽卡
   */
  const drawCard = async () => {
    if (account) {
      setLoading(true)
      //抽英雄
      try {
        if (! await checkSubmit(dltPrice)){
          return
        }
        const res= await buyHerobyCountAbi(library, 1, cardType === 'normal')

        if (res) {
          const resHero =res[0].hero
          setHero({
            ...resHero,
            luckyIndex: res[0].isUseLucky?0:-1,
            tokenId: resHero.tokenId,
            total:
              resHero.strength +
              resHero.agility +
              resHero.stamina +
              resHero.will +
              resHero.intelligence +
              resHero.mind
          })
          setAnimateIn(false)
          getLuckilyAndDltGroup()
          setTimeout(() => {
            // 5毫秒执行新的动画
            // setHeroImg(HeroImgList[res.occupation])
            setAnimateIn(true)
          }, 500)
        }
      } catch (error) {
        notification.error({
          message: 'Error',
          description: (error as Error).message,
          duration: 2
        })
      } finally {
        setLoading(false)
      }
    }
  }
  /**
   * 十连抽
   */
  const drawCard10 = async () => {

    if (account) {
      if (! await checkSubmit(dltPrice*10)){
        return
      }


      setLoading(true)
      //防止十连抽的过程可以点击按钮进行重复操作
      setDraw10ModalConfig({
        list: []
      })
      //抽英雄
      try {
        const res = await buyHerobyCountAbi(library, 10, cardType === 'normal')
        if (res) {
          let resluckyIndex=-1
          const newList= res.map((item, index) => {
            const heroItem=item.hero
            const hero={
              ...heroItem,
              total: heroItem.strength +
                heroItem.agility +
                heroItem.stamina +
                heroItem.will +
                heroItem.intelligence +
                heroItem.mind
            }
            if (item.isUseLucky){
              resluckyIndex=index
            }
            return hero
          })
          if (!draw10ModalConfig.visible){

            setDraw10ModalConfig({
              visible: true,
              list: newList,
              luckyIndex: resluckyIndex
            })
          } else {
            setDraw10ModalConfig({
              list: newList,
              luckyIndex: resluckyIndex
            })
          }
          setAnimateIn(false)
          getLuckilyAndDltGroup()
        }
      } catch (error) {
        setAnimateIn(false)
        notification.error({
          message: 'Error',
          description: (error as Error).message,
          duration: 2
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const goDetail = (tokenId?: string) => {
    if (!tokenId) return
    navigate(`/game/hero/${tokenId}`)
  }

  const addPackage = () => {
    setHero(undefined)
    setAnimateIn(false)
  }
  /**
   * 获取幸运值
   */
  const getLuckilyAndDltGroup=async () => {
    try {
      //调用了抽卡
      const myAddress =await library.getSigner().getAddress()
      const luck=await getHeroLuckyRate(myAddress)
      setLuckyValue(luck)
    } catch (error) {
      console.error('获取幸运值异常:', error)
    }
    try {
      setDltGroup('10000')
      // const dltGroup=await getLuckFomoDLT(library)
      // setDltGroup(dltGroup.split('.')[0])
    } catch (error) {
      console.error('获取幸运值奖金池异常:', error)
    }


  }

  return (
    <RoleWrapper>
      {loading && <Loading fixed center spinning={loading} />}
      <div className="flex">
        <img
          src={gameBgL}
          className={classnames('ani', {
            active: animateIn
          })}
          draggable="false"
          alt="card"
        />
        <img src={gameBgR} draggable="false" alt="card" />
      </div>
      {!animateIn ? (
        <div className="door-box">
          {/* 奖金池 */}
          <div className="prizePoolBox flex items-center absolute"
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              // background: `url(${prizePoolBox_Bg}) no-repeat center`,
              padding: '15px 5px',
              top: -50
            }}
          >
            <img alt="" src={prizePoolBox_Bg}
              style={{
                zIndex: -1,
                position: 'absolute',
                width: '100%',
                height: '100%'
              }}
            ></img>

            <img alt="" src={jinbiImg} />
            <span className="pl-1" style={{color: '#AC7F67'}}>{ t('game.card.prizePool')}:</span>
            <span
              className="font-bold pl-2 pr-2"
              style={{
                color: '#D68C3F'
              }}
            >{dltGroup}</span>
            <span style={{
              color: '#D68C3F'
            }}>DLT</span>
          </div>
          <div className="title relative">
            { t('game.card.getPremiumHero')}
          </div>
          <div className="cont relative">

            {/* 幸运值 */}
            <div className="luckbox absolute flex  items-center " >
              <div className="absolute luckValue">{luckValue}/100</div>
              <div
                style={{
                  width: luckValue+'%',
                  height: 15,
                  transition: 'width .3s linear',
                  background: `url(${luckImg}) no-repeat`,
                  backgroundSize: 'cover'

                }}
              ></div>
            </div>
            <div
              className="absolute w-full top-1/2 left-1/2 transform
                          -translate-x-1/2 -translate-y-1/2 flex justify-between"
            >
              <img
                className={classnames('h-8 ml-5 cursor-pointer', {
                  'filter grayscale cursor-not-allowed': cardType === 'normal'
                })}
                src={leftImg}
                alt=""
                onClick={() => setCardType('normal')}
              />
              <img
                className={classnames('h-8 mr-5 cursor-pointer', {
                  'filter grayscale cursor-not-allowed': cardType === 'novice'
                })}
                src={rightImg}
                alt=""
                onClick={() => setCardType('novice')}
              />
            </div>
            <div className="img">
              <img src={roleContImg} draggable="false" alt="" />
            </div>
            <p className="price">{dltPrice} {cardType === 'normal' ? 'DLT':'DLC'}</p>
          </div>
          {dltApprove ? (
            goldApprove ? (

              <div className="flex ">
                <Button
                  width="192px"
                  height="48px"
                  img={btnBg}
                  disabled={isDisabled}
                  bold
                  onClick={()=>{
                    if (isDisabled){
                      return
                    }
                    drawCard()
                  }}
                  style={{ zIndex: 1, filter: 'grayscale(100%)'}}
                >
                  {t('game.card.Draw')}
                </Button>
                <Button
                  width="192px"
                  height="48px"
                  img={btnBg}
                  bold
                  style={{ zIndex: 1, filter: 'grayscale(100%)'}}
                  disabled={isDisabled}
                  onClick={() => {
                    if (isDisabled){
                      return
                    }
                    drawCard10()
                  }}
                >
                  {t('game.card.Draw10')}
                </Button>

                <div className="w-1"></div>

              </div>


            ) : (
              <Button
                width="192px"
                height="48px"
                img={btnBg}
                bold
                onClick={authorizeGold}
                style={{ zIndex: 1 }}
              >
                {t('game.card.authorizeGold')}
              </Button>
            )
          ) : (
            <Button
              width="192px"
              height="48px"
              img={btnBg}
              bold
              onClick={authorizeDlt}
              style={{ zIndex: 1 }}
            >
              {t('game.card.authorizeDlt')}
            </Button>
          )}
        </div>
      ) : (
        hero && (
          <div className="door-box active">
            <div className="relative info-wrapper">

              <img className="w-full" src={`${hero.luckyIndex>0?luckHeroBg:newCardBg}`}
                style={{
                  maxHeight: 360
                }}
                alt="" />
              {
                hero.luckyIndex>0&& <img className=" absolute left-0" src={luckDlt}
                  style={{
                    width: 'calc(100% + 6rem - 20px)',
                    marginLeft: 'calc(-3rem + 10px)',
                    height: 'calc(100% + 72px)',
                    marginTop: -38

                  }}
                  alt="" />
              }

              {hero.newbie && <NoviceImgMark right={14} top={25} height={40} />}
              <div className="absolute w-full h-full top-0 left-0">
                <div className="flex justify-between h-full">
                  <div className="text-primary mt-5 box-border pl-12 flex flex-col items-start">
                    <h1 style={{ color: '#402d1a' }} className="text-3xl mt-10">
                      {t(`home.${Occupations[hero.occupation]}`)}
                    </h1>
                    <div style={{ color: '#6b553d' }} className="text-xl">
                      {t('game.total')}
                    </div>
                    <div style={{ color: '#402d1a' }} className="text-xl">
                      {hero.total}
                    </div>
                    <div style={{ color: '#6b553d' }} className="text-xl">
                      TokenId
                    </div>
                    <div style={{ color: '#402d1a' }} className="text-xl">
                      {subTokenId(hero.tokenId)}
                    </div>
                    <div style={{ color: '#6b553d' }} className="text-xl mt-2">
                      {t('game.card.quality')}
                    </div>
                    <div
                      style={{ color: '#402d1a' }}
                      className="text-xl flex items-center"
                    >
                      <img
                        className="mr-2"
                        src={getQualityPic(hero.total)?.[1]}
                        alt=""
                      />
                      {t(`game.card.${getQualityPic(hero.total)?.[0]}`)}
                    </div>
                  </div>
                  <img
                    className="self-center h-5/6"
                    src={HeroImgList[hero.occupation]}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center flex-col md:mt-10">
              <Button
                style={{ marginBottom: 10 }}
                width="192px"
                height="46px"
                bold
                img={btnDarkBg}
                onClick={() => goDetail(hero.tokenId)}
              >
                {t('game.card.details')}
              </Button>
              <div className="h-6 md:hidden block"></div>
              <Button
                img={btnDarkBg}
                width="192px"
                height="46px"
                bold
                onClick={addPackage}

              >
                {t('game.card.getAnotherOne')}
              </Button>
            </div>
          </div>
        )
      )}

      {/* 十连抽 */}
      <DrawHeroDialog
        visible={draw10ModalConfig.visible}
        list={draw10ModalConfig.list}
        luckyIndex={draw10ModalConfig.luckyIndex}
        drawCardFn={()=>{
          // setDraw10ModalConfig({ visible: false })
          // setTimeout(()=>{
          //   setDraw10ModalConfig({ visible: true })
          // }, 1000)

          drawCard10()
        }}
        onOk={() => setDraw10ModalConfig({ visible: false, list: [] })}
      />
    </RoleWrapper>
  )
}

export default DrawCard
