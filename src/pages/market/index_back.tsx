import { RadioGroup, RadioButton } from 'src/components/RadioButtonGroup'
import { NtfWrapper } from './style'
import { useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Slider from 'src/components/Slider'
import { notification, RadioChangeEvent, Select, Spin } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import btnDarkBg from 'src/assets/images/common/btn_dark.png'
import purchaseImg from 'src/assets/images/market/icon-purchase.png'
import myBuyImg from 'src/assets/images/market/icon-mybuy.png'
import heroDecor from 'src/assets/images/market/hero-decor.png'
import equipDecor from 'src/assets/images/market/equip-decor.png'
import classnames from 'classnames'
import { useWeb3React } from '@web3-react/core'
import { stopSale } from 'src/web3/market'
import HeroItemTwo from './widgets/hero-item/hero-item-two'
import HeroItemOne from './widgets/hero-item/hero-item-one'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useWindowSize } from 'src/context'
import { HeroWithPriceType } from 'src/types/hero'
import useSafeState from 'ahooks/lib/useSafeState'
import { useSetState } from 'ahooks'
import { useUrlQueryParam } from 'src/utils/url'
import { isVoid } from 'src/utils'
import { ethers } from 'ethers'
// import { getQualityPic } from 'src/config'
import { useTranslation } from 'react-i18next'
import SimplePagination from 'src/components/SimplePagination/index _back'
import {getMarketList} from 'src/pages/api/market'

const { Option } = Select

export type SaleStateType = 'sale' | 'buy' | '' | undefined;
export interface i_marketFilter {
  occupation?: string|number;
  quality?: string;
  level: [number, number];
  totalProperty: [number, number];
  strength: [number, number];
  stamina: [number, number];
  agility: [number, number];
  will: [number, number];
  intelligence: [number, number];
  mind: [number, number];
  sort?: 'createTime' | 'totalProperty' | 'price';
  order: 'asc' | 'desc';
  isSold: boolean;
}
const NTFMarket: React.FC = () => {
  const { account, library } = useWeb3React()

  const navigate = useNavigate()
  const { t } = useTranslation()
  const [params, setParams] = useUrlQueryParam(['type'])
  const { windowSize } = useWindowSize()
  const [saleState, setSaleState] = useState<SaleStateType>(
    params.type as SaleStateType
  )
  // 移动端的展开状态
  const [expand, setExpand] = useState<boolean>(true)
  // 市场英雄列表
  const [heroList, setHeroList] = useSafeState<HeroWithPriceType[]>([])
  // 英雄的数量
  // const [heroNum, setHeroNum] = useSetState({
  //   ordersNum: 0,
  //   publishNum: 0,
  //   soldNum: 0,
  //   marketPublishNum: 0,
  //   marketSoldNum: 0
  // })
  const [rquestType, setRquestType] = useSetState<{
    marketType: 'p' | 's';
    myType: 'p' | 's';
  }>({
    marketType: 'p',
    myType: 'p'
  })
  // 页面加载状态
  const [pageLoading, setPageLoading] = useSafeState<boolean>(false)
  // 过滤条件
  const [filter, setFilter] = useSetState<i_marketFilter>({
    occupation: '99',
    quality: '',
    level: [1, 12],
    totalProperty: [1, 450],
    strength: [1, 100],
    stamina: [1, 100],
    agility: [1, 100],
    will: [1, 100],
    intelligence: [1, 100],
    mind: [1, 100],
    sort: 'createTime',
    order: 'desc',
    isSold: false
  })
  const [currentPage, setCurrentPage] = useSafeState(1)
  const [totalProperty, setTotalProperty] = useSafeState(0)

  // 过滤获取符合条件的英雄
  const getCurrentHeroList = useMemo(() => {
    return heroList.map((hero) =>{
      return {
        ...hero,
        total: hero.totalProperty as number,
        price: ethers.utils.formatEther(hero.price)
      }
    })
  }, [heroList])

  // 获取英雄
  const getMarketHeros = useCallback(async () => {
    if (account) {
      if (!pageLoading) setPageLoading(true)
      try {
        setHeroList([])
        const newFilter=Object.assign({}, filter)
        const myAddress =await library.getSigner().getAddress()

        const shopData:{
          buyer?: string,
          seller?: string
        }={}
        if (saleState === 'sale') {
          //售卖
          shopData.seller=myAddress
        } else if (saleState === 'buy'){
          //买
          shopData.buyer=myAddress
        }
        //isSold为true情况,已经卖掉了---    我的售卖:已结束,  市场:已结束   我的购买
        newFilter.isSold=rquestType.myType==='s'||saleState === 'buy'||rquestType.marketType==='s'
        // newFilter.isSold=rquestType.marketType==='p'&&rquestType.myType!=='s'
        newFilter.occupation=parseInt(newFilter.occupation as string)
        //清空多余属性
        if (newFilter.occupation===99){
          delete newFilter.occupation
        }
        if (newFilter.quality===''){
          delete newFilter.quality
        }
        const resNew = await getMarketList({ ...newFilter, page: currentPage, ...shopData })
        if (resNew && resNew?.products.length > 0) {
          setHeroList(resNew.products)
        }
      } catch (error: any) {
        notification.error({
          message: 'Error',
          description: error?.message
        })
      } finally {
        setPageLoading(false)
      }
    }
  }, [account, saleState, rquestType, currentPage, filter])
  // const getMarketHeros = useCallback(async () => {
  //   if (account) {
  //     if (!pageLoading) setPageLoading(true)
  //     try {
  //       setHeroList([])
  //       if (isVoid(saleState)) {
  //         const res = await getMarketHeroList(library, currentPage, rquestType.marketType === 's')
  //         // 按钮切换不再当前的状态，不设置
  //         if (!isVoid(saleState)) return
  //         setHeroList(res.list)
  //         setTotalProperty(res.total)
  //         rquestType.marketType === 's' ?
  //           setHeroNum({ marketSoldNum: res.total }) :
  //           setHeroNum({ marketPublishNum: res.total })
  //       }
  //       if (saleState === 'sale') {
  //         const res = await getMySales(library, rquestType.myType === 's')
  //         if (saleState !== 'sale') return
  //         setHeroList(res)
  //         rquestType.myType === 's' ?
  //           setHeroNum({ soldNum: res.length }) :
  //           setHeroNum({ publishNum: res.length })
  //       }
  //       if (saleState === 'buy') {
  //         const res = await getMyOrders(library)
  //         if (saleState !== 'buy') return
  //         setHeroList(res)
  //         setHeroNum({ ordersNum: res.length })
  //       }
  //     } catch (error: any) {
  //       notification.error({
  //         message: 'Error',
  //         description: error?.message
  //       })
  //     } finally {
  //       setPageLoading(false)
  //     }
  //   }
  // }, [account, saleState, rquestType, currentPage])

  useEffect(() => {
    getMarketHeros()
  }, [getMarketHeros])

  // 重置分页
  const resetPagination = () => {
    setCurrentPage(1)
    setTotalProperty(0)
  }

  const changeMarketState = (p: SaleStateType) => {
    setParams({ type: p as string })
    setSaleState(p)
    setRquestType({
      marketType: 'p',
      myType: 'p'
    })
    resetPagination()
  }

  // 购买英雄
  const buyHero = (hero: HeroWithPriceType) => {
    navigate(`/market/buy/${hero.tokenId}`, {
      state: {
        hero: hero,
        saleState
      }
    })
  }

  const handleClear = () => {
    setFilter({
      level: [1, 12],
      totalProperty: [1, 450],
      strength: [1, 100],
      stamina: [1, 100],
      agility: [1, 100],
      will: [1, 100],
      intelligence: [1, 100],
      mind: [1, 100]
    })
  }

  const cancel = async (sellNo: ethers.BigNumber) => {
    setPageLoading(true)
    stopSale(library, sellNo)
      .then((res) => {
        getMarketHeros()
      })
      .catch((e) => {
        setPageLoading(false)
        notification.error({
          message: 'Error',
          description: e?.message
        })
      })
  }

  const sellHero = () => navigate('/market/publish')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Spin spinning={pageLoading}>
      <NtfWrapper className="m-auto pt-12 px-4 md:px-0 flex flex-col md:flex-row md:justify-start">

        <div className="left md:w-255px md:flex-shrink-0 w-full md:max-w-sm md:mr-6">
          <div className="w-full flex justify-center">
            <RadioGroup
              value="a"
              space="20px"
              width={'150px'}
              height="40px"
              fontSize="18px"
              bold
              className="no-border"
              bgColor="#0C0909"
              buttonStyle="solid"
            >
              <RadioButton value="a">
                <div className="flex justify-center items-center">
                  <img src={heroDecor} className="h-6 mr-2" alt="" />
                  {t('market.heroMarket')}
                </div>
              </RadioButton>
              <RadioButton value="b">
                <div className="flex justify-center items-center">
                  <img src={equipDecor} className="h-6 mr-2" alt="" />
                  {t('market.equipmentMarket')}
                </div>
              </RadioButton>
            </RadioGroup>
          </div>
          <div
            className="mt-10 px-5 pt-9 border border-solid rounded-xl bd-col-514031 bg-171212"
            style={{ height: 'calc(100% - 76px)' }}
          >
            <div>
              <div className="flex items-end mb-6 justify-between">
                <h1 className="color-B2856C mb-0">{t('market.myMarket')}</h1>

                {!isVoid(saleState) && (
                  <div
                    className="color-B2856C text-base cursor-pointer"
                    onClick={() => changeMarketState(undefined)}
                  >
                    {t('market.return')}
                  </div>
                )}
              </div>
              <div className="text-lg color-664F42 flex justify-center">
                <span
                  className={classnames('flex items-center cursor-pointer', {
                    'text-primary': saleState === 'sale'
                  })}
                  onClick={() => changeMarketState('sale')}
                >
                  <img className="h-7 mr-2" src={purchaseImg} alt="" />
                  {t('market.mySale')}
                </span>
                <span
                  className={classnames(
                    'ml-11 flex items-center cursor-pointer',
                    {
                      'text-primary': saleState === 'buy'
                    }
                  )}
                  onClick={() => changeMarketState('buy')}
                >
                  <img className="h-7 mr-2" src={myBuyImg} alt="" />
                  {t('market.myPurchase')}
                </span>
              </div>
              <div className="flex justify-center mt-8">
                <Button
                  img={btnRedBg}
                  width="186px"
                  height="46px"
                  bold
                  fontSize="16px"
                  onClick={() => sellHero()}
                >
                  {t('market.publish')}
                </Button>
              </div>
              <div className="w-full h-1px divider mt-7" />
            </div>

            <div className="mt-8 mb-5">
              <div className="flex items-center justify-between">
                <span className="color-B2856C text-2xl">
                  {t('market.filter')}
                </span>
                <span
                  className="color-664F42 text-lg cursor-pointer"
                  onClick={handleClear}
                >
                  {t('market.clearFilter')}
                </span>
              </div>
            </div>
            <div
              className={windowSize === 'phone' && expand ? 'hidden' : 'block'}
            >
              <Slider
                id="s1"
                title={t('game.mine.level')}
                max={12}
                min={1}
                range
                value={filter.level}
                onChange={(e) => setFilter({ level: e })}
              />
              <Slider
                id="s2"
                title={t('market.totalAttributes')}
                range
                min={1}
                max={450}
                value={filter.totalProperty}
                onChange={(e) => setFilter({ totalProperty: e })}
              />
              <Slider
                title={t('game.strength')}
                id="s3"
                range
                min={1}
                max={100}
                value={filter.strength}
                onChange={(e) => setFilter({ strength: e })}
              />
              <Slider
                title={t('game.agility')}
                id="s5"
                range
                min={1}
                max={100}
                value={filter.agility}
                onChange={(e) => setFilter({ agility: e })}
              />
              <Slider
                title={t('game.stamina')}
                id="s4"
                range
                min={1}
                max={100}
                value={filter.stamina}
                onChange={(e) => setFilter({ stamina: e })}
              />
              <Slider
                title={t('game.will')}
                id="s6"
                range
                min={1}
                max={100}
                value={filter.will}
                onChange={(e) => setFilter({ will: e })}
              />
              <Slider
                title={t('game.intelligence')}
                id="s7"
                range
                min={1}
                max={100}
                value={filter.intelligence}
                onChange={(e) => setFilter({ intelligence: e })}
              />
              <Slider
                title={t('game.mind')}
                id="s8"
                range
                min={1}
                max={100}
                value={filter.mind}
                onChange={(e) => setFilter({ mind: e })}
              />
            </div>
            <div
              className={classnames('w-full h-1px divider md:hidden', {
                'mt-20': !expand,
                'mt-10': expand
              })}
            />
            <div className="text-center mt-3 md:hidden">
              <span
                className="cursor-pointer"
                onClick={() => {
                  setExpand((prev) => !prev)
                }}
              >
                <ArrowBackIosNewIcon
                  sx={{
                    color: '#b2856c',
                    transform: `rotate(${expand ? 270 : 90}deg)`
                  }}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="right md:flex-1">
          <div className="md:mx-3 flex md:justify-between mt-6 md:mt-0">
            <div className="hidden md:block">
              {isVoid(saleState) ? (
                <>
                  <RadioGroup
                    value={rquestType.marketType}
                    className="no-radius"
                    space="10px"
                    width="160px"
                    height="40px"
                    fontSize="18px"
                    bold
                    bgColor="#0C0909"
                    buttonStyle="solid"
                    onChange={(e: RadioChangeEvent) => {
                      setRquestType({
                        marketType: e.target.value
                      })
                      resetPagination()
                    }}
                  >
                    <RadioButton value="p">
                      {t('market.onSale')}
                      {/* {heroNum.marketPublishNum ? `（${heroNum.marketPublishNum}）` : ''} */}
                    </RadioButton>
                    <RadioButton value="s">
                      {t('market.end')}
                      {/* {heroNum.marketSoldNum ? `（${heroNum.marketSoldNum}）` : ''} */}
                    </RadioButton>
                  </RadioGroup>
                </>
              ) : saleState === 'sale' ? (
                <>
                  <RadioGroup
                    value={rquestType.myType}
                    className="no-radius"
                    space="10px"
                    width="160px"
                    height="40px"
                    fontSize="18px"
                    bold
                    bgColor="#0C0909"
                    buttonStyle="solid"
                    onChange={(e: RadioChangeEvent) => setRquestType({
                      myType: e.target.value
                    })
                    }
                  >
                    <RadioButton value="p">
                      {t('market.posted')}
                      {/* {heroNum.publishNum ? `（${heroNum.publishNum}）` : ''} */}
                    </RadioButton>
                    <RadioButton value="s">
                      {t('market.sold')}
                      {/* {heroNum.soldNum ? `（${heroNum.soldNum}）` : ''} */}
                    </RadioButton>
                  </RadioGroup>
                </>
              ) : (
                <Button
                  width="120px"
                  height="40px"
                  bold
                  fontSize="18px"
                  border="1px solid #B2856C"
                >
                  {t('market.purchased')}
                  {/* {heroNum.ordersNum ? `（${heroNum.ordersNum}）` : ''} */}
                </Button>
              )}
            </div>
            <div id="selectsort" className="flex items-center">
              <label className="md:inline-block hidden">
                {t('market.sortBy')}
              </label>
              <Select
                className="select-sort"
                placeholder={t('market.sortBy')}
                getPopupContainer={() => document.querySelector('#selectsort') ?? document.body
                }
                onChange={(e: any) => setFilter({ sort: e })}
                value={filter.sort}
              >
                <Option value="createTime">{t('market.publishedDate')}</Option>
                <Option value="totalProperty">{t('market.totalAttributes')}</Option>
                <Option value="price">{t('market.price')}</Option>
              </Select>
              <Button
                width="100px"
                height="40px"
                bold
                disabled={filter.sort === undefined}
                className="ml-1"
                fontSize="18px"
                border="1px solid #664F42"
                onClick={() => setFilter((prev) => ({
                  order: prev.order === 'asc' ? 'desc' : 'asc'
                }))
                }
              >
                {filter.order === 'asc'
                  ? t('market.ascending')
                  : t('market.descending')}
              </Button>
            </div>
          </div>

          <div
            className="md:mt-10 md:pl-5 md:pr-2 md:pt-9 md:border
                       md:border-solid rounded-xl bd-col-514031
                       md:min-h-1440px"
          >
            <div className="hidden md:block">
              <label className="text-sm text-primary mr-3 font-bold">
                {t('market.class')}:
              </label>
              <RadioGroup
                value={filter.occupation}
                space="10px"
                width="88px"
                height="34px"
                fontSize="14px"
                bold
                bgColor="#0C0909"
                buttonStyle="solid"
                onChange={(e: RadioChangeEvent) => setFilter({ occupation: e.target.value })
                }
              >
                <RadioButton value="99">{t('game.total')}</RadioButton>
                <RadioButton value="0">{t('home.warrior')}</RadioButton>
                <RadioButton value="1">{t('home.mage')}</RadioButton>
                <RadioButton value="2">{t('home.hunter')}</RadioButton>
                <RadioButton value="3">{t('home.assassin')}</RadioButton>
              </RadioGroup>
            </div>
            <div className="mt-3 hidden md:block">
              <label className="text-sm  text-primary mr-3 font-bold">
                {t('game.card.quality')}:
              </label>
              <RadioGroup
                value={filter.quality}
                space="10px"
                width="88px"
                height="34px"
                fontSize="14px"
                bold
                bgColor="#0C0909"
                buttonStyle="solid"
                onChange={(e: RadioChangeEvent) => setFilter({ quality: e.target.value })
                }
              >
                <RadioButton value="">{t('game.total')}</RadioButton>
                <RadioButton value="legendary">
                  {t('game.card.legendary')}
                </RadioButton>
                <RadioButton value="epic">{t('game.card.epic')}</RadioButton>
                <RadioButton value="superb">
                  {t('game.card.superb')}
                </RadioButton>
                <RadioButton value="excellent">
                  {t('game.card.excellent')}
                </RadioButton>
                <RadioButton value="normal">
                  {t('game.card.normal')}
                </RadioButton>
              </RadioGroup>
            </div>
            <div className="mt-7 flex flex-wrap md:justify-start justify-center">
              {
                // 市场全部英雄
                isVoid(saleState) && (
                  <>
                    {getCurrentHeroList.map((item) => (
                      <HeroItemOne
                        key={item.tokenId}
                        hero={item}
                        onClick={buyHero}
                      />
                    ))}
                  </>
                )
              }
              {
                // 我的售卖
                saleState === 'sale' && (
                  <>
                    {getCurrentHeroList.map((item) => (
                      <HeroItemTwo
                        key={item.tokenId}
                        hero={item}
                        onClick={buyHero}
                      >
                        <Button
                          img={item.onSell ? btnRedBg : btnDarkBg}
                          width="184px"
                          height="46px"
                          fontSize="18px"
                          bold
                          onClick={
                            item.onSell ? () => cancel(item.sellNo) : undefined
                          }
                        >
                          {item.onSell ? t('market.cancel') : t('market.sold')}
                        </Button>
                      </HeroItemTwo>
                    ))}
                  </>
                )
              }
              {
                // 我的购买
                saleState === 'buy' && (
                  <>
                    {getCurrentHeroList.map((item) => (
                      <HeroItemTwo
                        key={item.tokenId}
                        hero={item}
                        onClick={buyHero}
                      >
                        <Button
                          img={btnDarkBg}
                          width="184px"
                          height="46px"
                          fontSize="18px"
                          bold
                          disabled
                          color="#42352E"
                        >
                          {t('market.purchased')}
                        </Button>
                      </HeroItemTwo>
                    ))}
                  </>
                )
              }
            </div>
            <div className="flex justify-center mb-4">
              <SimplePagination
                current={currentPage}
                total={totalProperty}
                currentPageCount={heroList.length}
                pageSize={9}
                currentChange={(val) => {
                  setCurrentPage(val)
                }}
              />
            </div>
            {/* {isVoid(saleState) && (
              <>
                <div className="flex justify-center mb-4">
                  <SimplePagination
                    current={currentPage}
                    total={totalProperty}
                    currentPageCount={heroList.length}
                    pageSize={9}
                    currentChange={(val) => {
                      setCurrentPage(val)
                    }}
                  />
                </div>
              </>
            )} */}
          </div>

        </div>


      </NtfWrapper>
    </Spin>
  )
}

export default NTFMarket
