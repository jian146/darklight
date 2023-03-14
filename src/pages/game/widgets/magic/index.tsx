import { MagicWrapper } from './style'
import decoratorImg from 'src/assets/images/game/magic/decorator.png'
import Button from 'src/components/Button'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import BottomDrawer from 'src/components/BottomDrawer'
import { useTranslation } from 'react-i18next'
import { message, notification, Spin } from 'antd'
import { useWeb3React } from '@web3-react/core'
import { combineCard, myHerosNew, syncData } from 'src/web3/hero'
import { HeroAttrList, HeroType, Occupations } from 'src/types/hero'
import NoData from 'src/components/NoData'
import { useSafeState, useSetState } from 'ahooks'
import classnames from 'classnames'
import { HeroImgList } from 'src/config'
import ResultDialog, {
  ResultDialogProps
} from 'src/components/Dialog/ResultDialog'
import { BigNumber } from 'ethers'
import { useNavigate } from 'react-router-dom'
import menuCloseIcon from 'src/assets/images/header/m_menu_close.png'
import RenderSpecTitle from '../heros/renderSpecTitle'
import titleImg from 'src/assets/images/game/card/role_title_bg.png'
import leftImg from 'src/assets/images/game/left.png'
import rightImg from 'src/assets/images/game/right.png'
import { CardType } from 'src/types/card'
import NoviceImgMark from 'src/components/NoviceImgMark'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import btnDarkBg from 'src/assets/images/common/btn_dark.png'
import Radio from 'src/components/Radio'
import ChoseHero from '../alchemy/components/choseHero'
import MergeDialog, { HeroDialogProps } from 'src/components/Dialog/MergeDialog'
import {isOpenNovice} from 'src/config/switch'
import { checkDlt, checkGold, queryAndApprove } from 'src/web3'
import { getHerosApi } from 'src/pages/api/card'
import { DrawHeroDialog } from 'src/components/Dialog'
type CardPositionType = {
  top?: HeroType;
  right?: HeroType;
  bottom?: HeroType;
  left?: HeroType;
};

const MagicHouse: React.FC = () => {
  const [showDrawer, setShowDrawer] = useSetState<{
    show: boolean;
    position?: keyof CardPositionType;
  }>({
    show: false
  })
  const { account, library } = useWeb3React()

  const { t, i18n: {language} } = useTranslation()
  const navitate = useNavigate()
  const [loading, setLoading] = useSafeState(false)
  const [resultState, setResState] = useSetState<{
    show: boolean;
    type: ResultDialogProps['type'];
    content?: string;
  }>({
    show: false,
    type: 'success'
  })
  const [draw10ModalConfig, setDraw10ModalConfig] = useSetState<{
    list: HeroType[];
    visible: boolean;
    luckyIndex:number;
  }>({
    list: [],
    visible: false,
    luckyIndex: -1
  })
  const [combineType, setCombineType] = useState<CardType>('normal')
  const [heros, setHeros] = useSafeState<HeroType[]>([])
  const [check, setCheck] = useState(false)
  const [isShowChoseHero, setIsShowChoseHero] = useState(false)
  const [selHero, setSelHero] = useSetState<CardPositionType>({
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined
  })
  //点击合成的位置
  const [selectPostion, setSelectPostion] = useState<string>('')
  // 合成配置
  const [heroModalConfig, setHeroModalConfig] = useSetState<{
      content: HeroDialogProps['content'];
      visible: boolean;
    }>({
      content: '',
      visible: false
    })
  // 合卡成功的英雄
  const [resultHero, setResultHero] = useSafeState<HeroType | undefined>()
  //付费方式
  const [payforType, setPayforType] = useSafeState(1)
  // 合成按钮的点击状态
  const btnDisable = useMemo(() => {
    const selectArr = Object.values(selHero).filter(
      (item) => item !== undefined
    )
    const length = selectArr.length
    if (length === 0 || length === 1 || length === 3) return true

    const fatigueTotal= Object.values(selHero).reduce((x, y)=>{
      const newX:HeroType={
        ...x,
        fatigue: (x?.fatigue??0)+(y?.fatigue??0) as number
      }
      return newX
    } ).fatigue
    //疲劳值总和
    if (fatigueTotal<=1) return true
    //二合一只支持两个一级的
    if (length === 2 && selectArr[0].level !== 1) {
      return true
    }
    if (length === 0 || length === 1 || length === 3) return true

    return false
  }, [selHero])

  //获取所选英雄的等级
  const getLevl = () => {
    const selectHeroList = Object.values(selHero).filter(
      (item) => item !== undefined
    )
    if (selectHeroList.length === 0) {
      return 0
    } else {
      return selectHeroList[0].level
    }
  }

  //过滤掉已选择的英雄
  const isSelectHero=(item:HeroType) => {
    const selectArr = Object.values(selHero).filter(
      (item) => item !== undefined
    )
    if (selectArr.length === 0) return false
    let isSelect=false
    for (let i = 0; i < selectArr.length; i++){
      if (item.tokenId===selectArr[i].tokenId){
        isSelect=true
        break
      }
    }
    return isSelect

  }

  // 获取过滤后的英雄
  const sortedHeros = useMemo(() => {
    const level = getLevl()

    const list = heros.filter((item) => {
      return (
        item.newbie === (combineType === 'novice') &&
        (level === 0 ? true : item.level === level)&&!isSelectHero(item)
      )
    })
    return list
  }, [heros, combineType, selHero])

  const getHero = useCallback(async () => {
    if (account) {
      setLoading(true)
      await myHerosNew(library)
        .then((items) => {
          setHeros(
            items.sort((a, b) => {
              return a.total - b.total
            })
          )
        })
        .catch((error) => {
          notification.error({
            message: 'Error',
            description: (error as Error).message
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [account])

  // 获取英雄
  useEffect(() => {
    getHero()
  }, [getHero])

  // 选择英雄
  const handleHeroSelect = (target:HeroType) => {
    const p = selectPostion
    // 读取当前位置选中的英雄，如果不是undefined，说明选过了,需要归还已删除的英雄，并从设置选中
    // let delHero = undefined

    // const target = (heros as any)[key]
    if (target !== undefined) {
      setSelHero((prev) => {
        // delHero = prev[p]
        return {
          [p]: target
        }
      })
      // 删除英雄
      // const tmp = [...heros]
      // tmp.splice(index, 1)
      // setHeros(tmp)
      setIsShowChoseHero(false)


    }
  }

  const resetAllSelectHero = () => {
    // 清空全部，归还所选英雄
    delSelHero('top')
    delSelHero('right')
    delSelHero('bottom')
    delSelHero('left')
  }

  const switchCombineCard = (type: CardType) => {
    setCombineType(type)
    resetAllSelectHero()
  }

  // 英雄合成
  const handleHeroCombind =async () => {
    setHeroModalConfig({visible: false})
    let type='gold'
    //有效性验证,判断余额
    if (payforType===1){
      if (!await checkGold(library, renderPrice(6000, 1200)) ){
        message.info(t('message.gold_Insufficient'))
        return
      }
    } else if (payforType===2){
      type='dlt'
      if (!await checkDlt(library, renderPrice(1000, 200)) ){
        message.info(t('message.DLT_Insufficient'))
        return
      }
    }
    //判断是否授权
    if (account){
      const isPass=await queryAndApprove(library, account, 'hero', type)
      if (isPass) {
        // message.success(t('message.AuthorizationSuccessful'))
      } else {
        //授权失败
        message.warn(t('message.privilegeGrantFailed'))
        return
      }

    }

    setLoading(true)
    const selHeros = Object.values(selHero).filter(
      (item) => item !== undefined
    )
    const tokenIds = selHeros.map((item) => item.tokenId)
    // 清除上次合成结果
    setResultHero(undefined)
    combineCard(library, tokenIds, combineType === 'novice', payforType)
      .then(async (res) => {
        if (res.events) {
          for (const event of res.events) {
            if (
              event.event === 'CombineResult2' ||
              event.event === 'CombineResult4'
            ) {
              if (
                event.args &&
                Object.prototype.toString.call(event.args) === '[object Array]'
              ) {
                const length = event.args.length
                const tokenId: BigNumber = event.args[length - 1]


                if (tokenId.eq(BigNumber.from(0))) {
                  setResState({
                    type: 'fail',
                    show: true,
                    content: t('game.magic.failText')
                  })
                  await getHero()
                } else {
                  await syncData( [tokenId], library)
                  const res=await getHerosApi([tokenId.toHexString()])

                  if (res){
                    const hero=res[0].hero
                    const {
                      strength,
                      agility,
                      stamina,
                      will,
                      intelligence,
                      mind
                    } = hero
                    hero.total=strength + agility + stamina + will + intelligence + mind
                    setDraw10ModalConfig({
                      visible: true,
                      list: [hero],
                      luckyIndex: -1
                    })


                    setResultHero(hero)
                    await getHero()
                    // 成功
                    // setResState({
                    //   type: 'success',
                    //   show: true,
                    //   content: t('game.magic.successText')
                    // })
                  }
                  // const hero = await getHeroByTokenId(
                  //   library,
                  //   tokenId.toHexString()
                  // )


                }
                setHeroModalConfig({ visible: false })
                setSelHero({
                  left: undefined,
                  top: undefined,
                  right: undefined,
                  bottom: undefined
                })
              }
            }
          }
        }
      })
      .catch((e) => {
        setHeroModalConfig({ visible: false })
        setSelHero({
          left: undefined,
          top: undefined,
          right: undefined,
          bottom: undefined
        })
        notification.error({
          message: 'combindCard error',
          description: e.message ?? 'error'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const goDetail = (hero: HeroType | undefined) => {
    if (hero === undefined) return
    navitate(`/game/hero/${hero.tokenId}`)
  }

  const delSelHero = (position: keyof CardPositionType) => {
    const hero = selHero[position]
    if (hero === undefined) return
    // 清除选中位置的英雄
    setSelHero({
      [position]: undefined
    })
  }

  /**
   * @description 返回主副属性的jx函数
   * @param occupation 职业
   * @param mType 主属性的类型
   * @param mVal 主属性的值
   * @param sType 副属性的类型
   * @param sVal 副属性的值
   * @returns JSX.Element
   */
  const jsxPrimaryAttr = (
    occupation: Occupations,
    mType: keyof typeof HeroAttrList,
    mVal: number,
    sType: keyof typeof HeroAttrList,
    sVal: number,
    hero: HeroType
  ): JSX.Element => (
    <div>
      <span>
        <RenderSpecTitle type={mType} hero={hero}>
          {t(`game.${mType}`)}
        </RenderSpecTitle>
        <span className="ml-2 text-ecae18">{mVal}</span>
      </span>
      <span className="ml-3">
        <RenderSpecTitle type={sType} hero={hero}>
          {t(`game.${sType}`)}
        </RenderSpecTitle>
        <span className="ml-2 text-ecae18">{sVal}</span>
      </span>
    </div>
  )

  /**
   * @description 渲染主副属性
   * @param param 英雄属性
   * @returns JSX.Element | undefined
   */
  const renderPrimaryAttr = ({
    occupation,
    ...item
  }: HeroType): JSX.Element | undefined => {
    if (occupation === Occupations.warrior) {
      // 骑士 力量 体质
      return jsxPrimaryAttr(
        occupation,
        'strength',
        item.strength,
        'stamina',
        item.stamina,
        item as HeroType
      )
    }

    if (occupation === Occupations.assassin) {
      // 刺客 敏捷 力量
      return jsxPrimaryAttr(
        occupation,
        'agility',
        item.agility,
        'strength',
        item.strength,
        item as HeroType
      )
    }

    if (occupation === Occupations.mage) {
      // 法师 智力  精神
      return jsxPrimaryAttr(
        occupation,
        'intelligence',
        item.intelligence,
        'mind',
        item.mind,
        item as HeroType
      )
    }

    if (occupation === Occupations.hunter) {
      // 猎人 力量 敏捷
      return jsxPrimaryAttr(
        occupation,
        'strength',
        item.strength,
        'agility',
        item.agility,
        item as HeroType
      )
    }
  }


  const renderPrice = (gold: number, dlt: number) => {
    //新手卡的价格是10%
    if (combineType === 'novice') {
      gold = gold / 10
      dlt = dlt / 10
    }
    return Object.values(selHero).filter((item) => item !== undefined)
      .length === 4
      ? gold
      : dlt
  }
  return (
    <Spin spinning={loading}>


      <MagicWrapper className="mt-10 relative">
        {/* 结果窗口 */}
        <div id="resultModal">
          <ResultDialog
            id="resultModal"
            type={resultState.type}
            visible={resultState.show}
            content={resultState.content}
            onCancel={() => setResState({ show: false })}
          />
        </div>
        {/* 合成窗口 */}
        <div id="margeModal">
          <MergeDialog
            id="margeModal"
            heros={ Object.values(selHero).filter((item) => item !== undefined) }
            content={heroModalConfig.content}
            onCancel={() => setHeroModalConfig({ visible: false })}
            loading={loading}
            visible={heroModalConfig.visible}
            onOk={() =>{ handleHeroCombind() }}
            goldPrice={ `${payforType===1?renderPrice(6000, 1200):'0'}`}
            dltPrice={`${payforType===2?renderPrice(1000, 200):'0'}`}

          />
        </div>


        <div id="heroDrawler">
          {/* 抽卡展示接口 */}
          <DrawHeroDialog
            id="heroDrawler"
            visible={draw10ModalConfig.visible}
            list={draw10ModalConfig.list}
            luckyIndex={draw10ModalConfig.luckyIndex}
            drawCardFn={()=>{
              setDraw10ModalConfig({ visible: false, list: [] })
            }}
            onOk={() => {
              // const list=draw10ModalConfig.list
              setDraw10ModalConfig({ visible: false, list: [] })
              // setTimeout(()=>{
              //   setDraw10ModalConfig({ visible: true, list: list })
              // }, 1000)
            }}
          />
        </div>
        {/* 选择英雄框 */}
        {isShowChoseHero && (
          <ChoseHero
            tokenNncryption={5}
            useList={sortedHeros}
            setLoading={setLoading}
            className="h5Chose"
            setVisible={setIsShowChoseHero}
            onChoseHero={(item, index) => {
              handleHeroSelect(item)
            }}
          />
        )}
        <div className="absolute w-8/12 md:w-auto top-0 md:top-6 left-1/2 transform -translate-x-1/2"
          style={{
            top: 0
          }}
        >
          <img className="w-full" src={titleImg} alt="" />
          <span
            className="absolute top-1/2 left-1/2 w-full text-center transform -translate-x-1/2 font-bold
                      -translate-y-1/2 text-secondary text-base md:text-lg"
          >
            {combineType === 'normal'
              ? t('game.magic.fusionPremiumHero')
              : t('game.magic.fusionStandardHero')}
          </span>
        </div>
        <div className="wrapper mx-auto flex justify-start flex-col items-center">
          <div className="flex w-full relative justify-center mt-24 md:mt-32">
            <div className="absolute w-full left-1/2 top-2/3 flex justify-between transform -translate-x-1/2"
              style={{
                display: isOpenNovice?'': 'none'
              }}
            >
              <img
                className={classnames('h-8 ml-1 md:ml-12 cursor-pointer', {
                  'filter grayscale cursor-not-allowed':
                    combineType === 'normal'
                })}
                src={leftImg}
                alt=""
                onClick={() => switchCombineCard('normal')}
              />
              <img
                className={classnames('h-8 mr-1 md:mr-12 cursor-pointer', {
                  'filter grayscale cursor-not-allowed':
                    combineType === 'novice'||!isOpenNovice
                })}
                src={rightImg}
                alt=""
                onClick={(e) => {
                  isOpenNovice&&switchCombineCard('novice')
                  e.stopPropagation()
                }}
              />
            </div>
            <div style={{ width: '63.6%' }} className="relative">
              <img src={decoratorImg} className="w-full" alt="" />
              <div
                className={classnames(
                  'center absolute top-1/2 left-1/2 cursor-pointer',
                  {
                    new: resultHero !== undefined
                  }
                )}
                onClick={() => goDetail(resultHero)}
              >
                {resultHero === undefined ? (
                  ''
                ) : (
                  <img
                    src={HeroImgList[resultHero.occupation]}
                    className={classnames('h-full', {
                      'mr-2': resultHero?.occupation === Occupations.assassin
                    })}
                    alt=""
                  />
                )}
              </div>
              <div
                id="top"
                className={classnames(
                  'magic-select absolute z-50 -top-4 transform left-1/2 -translate-x-1/2',
                  {
                    selected: selHero.top !== undefined
                  }
                )}
                onClick={() => {
                  setIsShowChoseHero(true)
                  setSelectPostion('top')
                  // setShowDrawer({ show: true, position: 'top' })
                }}
              >
                {selHero.top !== undefined ? (
                  <>
                    <div className="absolute top-0 right-0">
                      <img
                        src={menuCloseIcon}
                        alt=""
                        onClick={(e) => {
                          e.stopPropagation()
                          delSelHero('top')
                        }}
                      />
                    </div>
                    <img
                      className="h-4/5"
                      src={HeroImgList[selHero.top.occupation]}
                      alt=""
                    />
                  </>
                ) : (
                  ''
                )}
                <>
                  <div className="w-full h-full block md:hidden" />
                </>
              </div>
              <div
                id="left"
                className={classnames(
                  'magic-select absolute z-40 top-1/2 transform -left-4 -translate-y-1/2',
                  {
                    selected: selHero.left !== undefined
                  }
                )}
                onClick={() => {
                  setIsShowChoseHero(true)
                  setSelectPostion('left')
                  // setShowDrawer({ show: true, position: 'top' })
                }}
              >
                {selHero.left !== undefined ? (
                  <>
                    <div className="absolute top-0 right-0">
                      <img
                        src={menuCloseIcon}
                        alt=""
                        onClick={(e) =>{
                          e.stopPropagation()
                          delSelHero('left')
                        } }
                      />
                    </div>
                    <img
                      className="h-4/5"
                      src={HeroImgList[selHero.left.occupation]}
                      alt=""
                    />
                  </>
                ) : (
                  ''
                )}
                <>
                  <div
                    className="w-full h-full block md:hidden"
                    // onClick={() => setShowDrawer({ show: true, position: 'left' })
                    // }
                  />
                </>
              </div>
              <div
                id="bottom"
                className={classnames(
                  'magic-select absolute z-30 -bottom-4 transform left-1/2 -translate-x-1/2',
                  {
                    selected: selHero.bottom !== undefined
                  }
                )}
                onClick={() => {
                  setIsShowChoseHero(true)
                  setSelectPostion('bottom')
                  // setShowDrawer({ show: true, position: 'top' })
                }}
              >
                {selHero.bottom !== undefined ? (
                  <>
                    <div className="absolute top-0 right-0">
                      <img
                        src={menuCloseIcon}
                        alt=""

                        onClick={(e) =>{
                          e.stopPropagation()
                          delSelHero('bottom')
                        } }
                      />
                    </div>
                    <img
                      className="h-4/5"
                      src={HeroImgList[selHero.bottom.occupation]}
                      alt=""
                    />
                  </>
                ) : (
                  ''
                )}
                <>
                  <div
                    className="w-full h-full block md:hidden"
                    // onClick={() => setShowDrawer({ show: true, position: 'bottom' })
                    // }
                  />
                </>
              </div>
              <div
                id="right"
                className={classnames(
                  'magic-select absolute z-40 top-1/2 transform -right-4 -translate-y-1/2',
                  {
                    selected: selHero.right !== undefined
                  }
                )}
                onClick={() => {
                  setSelectPostion('right')
                  setIsShowChoseHero(true)

                  // setShowDrawer({ show: true, position: 'top' })
                }}
              >
                {selHero.right !== undefined ? (
                  <>
                    <div className="absolute top-0 right-0">
                      <img
                        src={menuCloseIcon}
                        alt=""
                        onClick={(e) =>{
                          e.stopPropagation()
                          delSelHero('right')
                        } }
                      />
                    </div>
                    <img
                      className="h-4/5"
                      src={HeroImgList[selHero.right.occupation]}
                      alt=""
                    />
                  </>
                ) : (
                  ''
                )}
                <>
                  <div
                    className="w-full h-full block md:hidden"
                    // onClick={() => setShowDrawer({ show: true, position: 'right' })
                    // }
                  />
                </>
              </div>
            </div>
          </div>

          <div className={`w-3/5 mt-16 text-xs md:text-sm text-secondary ${language==='en-US'?'en-h5':''}`}>
            <p>
              1、
              {t(
                `game.magic.${
                  combineType === 'normal' ? 'tips1' : 'novicetips1'
                }`
              )}
            </p>
            <p className="mt-2">
              2、
              {t(
                `game.magic.${
                  combineType === 'normal' ? 'tips2' : 'novicetips2'
                }`
              )}
            </p>
          </div>
          <div className={'relative flex items-center pt-9 '}>
            <Button
              width="186px"
              height="46px"
              // className="ml-28 mr-4"
              fontSize="16px"
              bold
              img={btnDisable ? btnDarkBg : btnRedBg}
              onClick={()=>{
                setHeroModalConfig({visible: true })
              }}
              disabled={btnDisable}
            >
              {t('game.magic.heroFusion')}
            </Button>
            {/* 保险注释代码 */}
            {false && (
              <Radio
                boxClassName=""
                size={25}
                lable={t('game.magic.purchaseInsurance')}
                value={check}
                onChange={(isCheck: boolean) => {
                  setCheck(isCheck)
                }}
              />
            )}
          </div>
          {/* 价格选择 */}
          <div
            className="flex justify-center pt-6 "
            style={{
              color: '#B2856C'
            }}
          >
            <div className="mr-24">
              <Radio
                boxClassName=""
                size={25}
                lable={`${renderPrice(6000, 1200)} Gold`}
                value={payforType === 1}
                onChange={(isCheck: boolean) => {
                  setPayforType(1)
                }}
              />
            </div>
            <div>
              <Radio
                boxClassName=""
                size={25}
                lable={`${renderPrice(1000, 200)} Dlt`}
                value={payforType === 2}
                onChange={(isCheck: boolean) => {
                  setPayforType(2)
                }}
              />
            </div>
          </div>
        </div>
        <BottomDrawer
          visible={showDrawer.show}
          title={t('game.magic.choseHero')}
          height={360}
          onClose={() => setShowDrawer({ show: false, position: undefined })}
        >
          {sortedHeros.length > 0 ? (
            sortedHeros.map((item) => (
              <div
                key={item.tokenId}
                style={{
                  borderBottom: '1px solid #272225',
                  marginTop: '14px'
                }}
                className="flex h-14 text-primary"
                onClick={() => {
                  // 告诉编译器 position 在这一定有值
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  // handleHeroSelect(item.tokenId, showDrawer.position!)
                  // setShowDrawer({ show: false, position: undefined })
                }}
              >
                <div className="fex flex-col">
                  <div className="flex text-sm items-center">
                    <span className="flex text-sm">
                      <i className="not-italic text-base">
                        {t(`home.${Occupations[item.occupation]}`)}
                      </i>
                      <i className="not-italic ml-2">LV.{item.level}</i>
                    </span>
                    <span className="h-14px w-1px mx-5 bg-primary" />
                    <span>
                      {t('game.totalAttr')} {item.total}
                    </span>
                  </div>
                  <div style={{ color: '#664F42' }} className="tokenid text-xs">
                    {renderPrimaryAttr(item)}
                  </div>
                </div>
                {item.newbie && (
                  <NoviceImgMark
                    position="relative"
                    top={10}
                    right={0}
                    height={26}
                    style={{ marginLeft: 10 }}
                  />
                )}
              </div>
            ))
          ) : (
            <NoData />
          )}
        </BottomDrawer>
      </MagicWrapper>
    </Spin>
  )
}

export default MagicHouse
