import { RadioGroup, RadioButton } from 'src/components/RadioButtonGroup'
import { NtfWrapper } from './style'
import Button from 'src/components/Button'
import Slider from 'src/components/Slider'
import { message, notification, RadioChangeEvent, Select, Spin } from 'antd'
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
import { HeroWithPriceTypeWithMarket } from 'src/types/hero'
import useSafeState from 'ahooks/lib/useSafeState'
import { useSetState } from 'ahooks'
import { useUrlQueryParam } from 'src/utils/url'
import { isVoid } from 'src/utils'
import { ethers } from 'ethers'
import { getQualityPic } from 'src/config'
import { useTranslation } from 'react-i18next'
import SimplePagination from 'src/components/SimplePagination'

import { isServerConfig } from 'src/config/switch'

import EquipmentCard from './equipmentCard/equipmentCard'
import { I_Equip, initEquip } from '../game/widgets/backpack'
import { getEquipmarketListApi, getMarketApi } from '../api/market'

const { Option } = Select

export interface I_Equip_market{
  buyer:string
  //创建时间
  createTime:number
  equip:I_Equip&{destory:boolean}
  onSell:boolean
  price:string
  sellNo:string
  seller:string
  //成交时间
  soldTime:number
  tokenId:string

}
export const init_Equip_market:I_Equip_market={
  buyer: '',
  createTime: 0,
  equip: {...initEquip, destory: false},
  onSell: false,
  price: '0',
  sellNo: '',
  seller: '',
  soldTime: 0,
  tokenId: ''
}
export type SaleStateType = 'sale' | 'buy' | '' | undefined

const NTFMarket: React.FC = () => {

  const pageSize= 9

  const { account, library } = useWeb3React()


  const { t } = useTranslation()
  const [params, setParams] = useUrlQueryParam(['type'])
  const [marketTypeParams, setMarketTypeParams] = useUrlQueryParam(['marketType'])
  const { windowSize } = useWindowSize()
  const [saleState, setSaleState] = useState<SaleStateType>(params.type as SaleStateType)
  // 移动端的展开状态
  const [expand, setExpand] = useState<boolean>(true)
  // 市场英雄列表
  const [heroList, setHeroList] = useSafeState<HeroWithPriceTypeWithMarket[]>([])
  //市场装备列表
  const [equipList, setEquipList] = useState<I_Equip_market[]>([])
  // const [heroListAbi, setHeroListAbi] = useSafeState<HeroWithPriceTypeWithMarket[]>([])
  // 英雄的数量
  const [heroNum, setHeroNum] = useSetState({
    ordersNum: 0,
    publishNum: 0,
    soldNum: 0,
    marketPublishNum: 0,
    marketSoldNum: 0
  })
  // 装备的数量
  const [equipNum, setEquipNum] = useSetState({
    ordersNum: 0,
    publishNum: 0,
    soldNum: 0,
    marketPublishNum: 0,
    marketSoldNum: 0
  })
  const [rquestType, setRquestType] = useSetState<
    {
      marketType: 'p' | 's',
      myType: 'p' | 's'
    }
  >({
    marketType: 'p',
    myType: 'p'
  })
  const [type, setType] = useState<'hero'|'equip'>('hero')
  // 页面加载状态
  const [pageLoading, setPageLoading] = useSafeState<boolean>(false)
  // 过滤条件
  const [filter, setFilter] = useSetState<{
    role: string,
    quality: string,
    level: [number, number],
    total: [number, number],
    strength: [number, number],
    stamina: [number, number],
    agility: [number, number],
    will: [number, number],
    intelligence: [number, number],
    mind: [number, number],
    sort?: 'time' | 'total' | 'price',
    order: 'asc' | 'desc'
  }>({
    role: '',
    quality: '',
    level: [1, 12],
    total: [1, 450],
    strength: [1, 100],
    stamina: [1, 100],
    agility: [1, 100],
    will: [1, 100],
    intelligence: [1, 100],
    mind: [1, 100],
    sort: 'time',
    order: 'desc'
  })

  const [equipFilter, setEquipFilter]=useSetState<
  {
    role: string,
    category:string,
    sort?: 'time' | 'rarity' | 'price',
    order: 'asc' | 'desc'
    categoryRage:[number, number]
  }
  >({
    role: '',
    category: '',
    sort: 'time',
    order: 'desc',
    categoryRage: [1, 5]

  })
  const [currentPage, setCurrentPage] = useSafeState(1)
  const [total, setTotal] = useSafeState(0)
  const [myAddress, setMyAddress]=useState('')
  // 过滤获取符合条件的英雄
  const getCurrentHeroList = useMemo(() => {

    const { sort: sorts, order } = filter
    const isVoid = (value: unknown) => value === undefined || value === null || value === ''
    //过滤
    let filterList= heroList
      .filter(item => isVoid(filter.role) ? true : item.occupation.toString() === filter.role)
      .filter(item => isVoid(filter.quality) ? true : getQualityPic(item.total)?.[0] === filter.quality)
      .filter(item => item.level >= filter.level[0] && item.level <= filter.level[1])
      .filter(item => item.total >= filter.total[0] && item.total <= filter.total[1])
      .filter(item => item.strength >= filter.strength[0] && item.strength <= filter.strength[1])
      .filter(item => item.stamina >= filter.stamina[0] && item.stamina <= filter.stamina[1])
      .filter(item => item.agility >= filter.agility[0] && item.agility <= filter.agility[1])
      .filter(item => item.will >= filter.will[0] && item.will <= filter.will[1])
      .filter(item => item.intelligence >= filter.intelligence[0] && item.intelligence <= filter.intelligence[1])
      .filter(item => item.mind >= filter.mind[0] && item.mind <= filter.mind[1])
    if (isVoid(saleState)){
      //市场
      //出售中列表
      const sellList= filterList.filter(item=>item.onSell)
      //已结束列表
      const endList= filterList.filter(item=>!item.onSell)
      setHeroNum({
        marketSoldNum: endList.length,
        marketPublishNum: sellList.length
      })
      //s 为已结束
      rquestType.marketType === 's' ?filterList=endList:filterList=sellList


    } else if (saleState === 'sale') {
      //我的售卖  onSell:true,地址为自己
      //已发布
      const publishList= filterList.filter(item=>item.onSell&&item.seller===myAddress)
      //已销售
      const soldList= filterList.filter(item=>!item.onSell&&item.seller===myAddress)
      //s 已销售
      rquestType.myType === 's' ?filterList=soldList:filterList=publishList
      setHeroNum({
        publishNum: publishList.length,
        soldNum: soldList.length
      })
    } else if (saleState === 'buy'){
      //买
      filterList= filterList.filter(item=>!item.onSell&&item.buyer===myAddress)
      setHeroNum({
        ordersNum: filterList.length
      })
    }
    //排序 先过滤在排序性能优化一点
    if (sorts) {
      filterList=filterList.sort((a, b) => {
        // 降序排列
        if (sorts === 'price') {
          return order === 'asc' ? parseFloat(a.price) - parseFloat(b.price):parseFloat(b.price) - parseFloat(a.price)
        } else if (sorts === 'time') {

          return order === 'asc' ? (a.soldTime>b.soldTime?-1:1):(a.soldTime>b.soldTime?1:-1)
          // return order === 'asc' ? (a.soldTime.gt(b.soldTime)?-1:1):(a.soldTime.gt(b.soldTime)?1:-1)

        } else {
          return order === 'asc' ? a.total - b.total : b.total - a.total
        }

      })
    }
    //分页
    const allPage= parseInt((filterList.length / pageSize) as any)+(filterList.length%pageSize>0?1:0)

    if (type==='hero'){
      setTotal(filterList.length)
    }


    if (currentPage===allPage){
      //最后一页
      return filterList.slice(pageSize*(currentPage-1), filterList.length)
    } else {
      return filterList.slice(pageSize*(currentPage-1), pageSize*(currentPage))
    }
  }, [heroList, filter, currentPage, type])

  //过滤符合条件的装备
  const getCurrentEquipList = useMemo(() => {

    const { sort: sorts, order } = equipFilter

    const isVoid = (value: unknown) => value === undefined || value === null || value === ''
    //过滤
    let filterList= equipList
      .filter(item => isVoid(equipFilter.role) ? true : item.equip.class.indexOf(parseInt(equipFilter.role))>=0 )
      .filter(item => item.equip.rarity >= equipFilter.categoryRage[0] && item.equip.rarity <= equipFilter.categoryRage[1])
      .filter((item)=>{
        const equipTab=equipFilter.category
        if (equipTab===''){
          return true

        } else {
          if ((parseInt(equipTab))<=6){
            //没到戒指
            return item.equip.equip+''===equipTab

          } else if (equipTab==='6'){
            //戒指
            return item.equip.equip===6||item.equip.equip===7
          } else {
            //8腰带   9鞋子
            return (item.equip.equip+'')===equipTab
          }
        }
      })


    if (isVoid(saleState)){
      //市场
      //出售中列表
      const sellList= filterList.filter(item=>item.onSell)
      //已结束列表
      const endList= filterList.filter(item=>!item.onSell)
      setEquipNum({
        marketSoldNum: endList.length,
        marketPublishNum: sellList.length
      })
      //s 为已结束
      rquestType.marketType === 's' ?filterList=endList:filterList=sellList


    } else if (saleState === 'sale') {
      //我的售卖  onSell:true,地址为自己

      //已发布
      const publishList= filterList.filter(item=>item.onSell&&item.seller===myAddress)

      //已销售
      const soldList= filterList.filter(item=>!item.onSell&&item.seller===myAddress)

      //s 已销售
      rquestType.myType === 's' ?filterList=soldList:filterList=publishList
      setEquipNum({
        publishNum: publishList.length,
        soldNum: soldList.length
      })
    } else if (saleState === 'buy'){
      //买

      filterList= filterList.filter(item=>!item.onSell&&item.buyer===myAddress)
      setEquipNum({
        ordersNum: filterList.length
      })

    }
    //排序 先过滤在排序性能优化一点
    if (sorts) {
      filterList=filterList.sort((a, b) => {
        // 降序排列
        if (sorts === 'price') {
          return order === 'asc' ? parseFloat(a.price) - parseFloat(b.price):parseFloat(b.price) - parseFloat(a.price)
        } else if (sorts === 'time') {

          return order === 'asc' ? (a.createTime>b.createTime?-1:1):(a.createTime>b.createTime?1:-1)
          // return order === 'asc' ? (a.soldTime.gt(b.soldTime)?-1:1):(a.soldTime.gt(b.soldTime)?1:-1)

        } else if (sorts === 'rarity') {


          return order === 'asc' ? a.equip.rarity-b.equip.rarity:b.equip.rarity-a.equip.rarity
          // return order === 'asc' ? (a.soldTime.gt(b.soldTime)?-1:1):(a.soldTime.gt(b.soldTime)?1:-1)

        } else {
          return 1
        }

      })
    }
    //分页
    const allPage= parseInt((filterList.length / pageSize) as any)+(filterList.length%pageSize>0?1:0)
    if (type==='equip'){
      setTotal(filterList.length)
    }
    if (currentPage===allPage){
      //最后一页
      return filterList.slice(pageSize*(currentPage-1), filterList.length)
    } else {
      return filterList.slice(pageSize*(currentPage-1), pageSize*(currentPage))
    }
  }, [equipList, filter, currentPage, equipFilter, type, saleState, rquestType])
  useEffect(() => {

    if (type==='equip'){
      getMarketEquip()
    }


  }, [account, library, type, saleState])

  const getMarketEquip=async()=>{
    if (account){
      setPageLoading(true)
      const res=await getEquipmarketListApi()
      if (res){
        setEquipList(res)
      }
      setPageLoading(false)
    }

  }
  // 获取英雄
  const getMarketHeros = useCallback(async () => {
    if (account) {
      setPageLoading(true)
      try {
        const allList=await getMarketApi()
        setHeroList(allList)
        // const allListAbi=await getAllMarketHeroList(library)
        // setHeroListAbi(allListAbi)


      } catch (error: any) {
        notification.error({
          message: 'Error',
          description: error?.message
        })
      } finally {

      }
      setPageLoading(false)
    }
  }, [account, saleState, rquestType, currentPage])

  useEffect(() => {
    if (isServerConfig){
      notification['info']({
        message: t('message.serverMaintenance'),
        duration: null,
        description: ''
      })

    } else {
      getMarketHeros()
    }


  }, [getMarketHeros, filter, currentPage])

  // 重置分页
  const resetPagination = () => {
    setCurrentPage(1)
    setTotal(0)
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
  const buyHero = (hero: HeroWithPriceTypeWithMarket) => {
    let saleStateQuery =saleState
    let onSellQuery = hero.onSell
    if (myAddress===hero.seller){
      saleStateQuery='sale'
      onSellQuery=true
    }


    window.open(`/market/buy/${hero.tokenId}?saleState=${saleStateQuery}&sellNo=${hero.sellNo}&onSell=${onSellQuery}`)
    // navigate(`/market/buy/${hero.tokenId}`, {
    //   state: {
    //     hero: hero,
    //     saleState
    //   }
    // })
  }
  //购买装备
  const buyEquip = (marketEquip: I_Equip_market) => {
    if (marketEquip.equip.destory){
      return message.info(t('market.equip.equipmentDestroyed'))

    }
    let saleStateQuery =saleState

    let onSellQuery = marketEquip.onSell
    if (myAddress===marketEquip.seller){
      saleStateQuery='sale'
      onSellQuery=true
    }
    window.open(`/market/buyEquip/${marketEquip.sellNo}?saleState=${saleStateQuery}&onSell=${onSellQuery}`)

    // window.open(`/market/buyEquip/${equip.tokenId}`)
    // navigate(`/market/buy/${hero.tokenId}`, {
    //   state: {
    //     hero: hero,
    //     saleState
    //   }
    // })
  }
  const handleClear = () => {
    setFilter({
      level: [1, 12],
      total: [1, 450],
      strength: [1, 100],
      stamina: [1, 100],
      agility: [1, 100],
      will: [1, 100],
      intelligence: [1, 100],
      mind: [1, 100]
    })
  }
  const handleEquipClear = () => {
    setEquipFilter({
      categoryRage: [1, 5]

    })
  }
  const cancel = async (sellNo: ethers.BigNumber) => {
    setPageLoading(true)
    stopSale(library, sellNo).then(res => {
      getMarketHeros()
    }).catch(e => {
      setPageLoading(false)
      notification.error({
        message: 'Error',
        description: e?.message
      })
    })
  }

  const sellHero = () => {
    window.open('/market/publish')
  }

  const sellEquip = () => {
    window.open('/market/sellEquip')
  }
  useEffect( () => {
    window.scrollTo(0, 0)
    if (marketTypeParams?.marketType==='equip'){
      setType('equip')
    } else {
      setType('hero')
    }
    if (library){
      getMyaddress()
    }
  }, [library])

  const getMyaddress = async () =>{
    setPageLoading(true)

    try {
      const _myAddress=await library.getSigner().getAddress()
      setMyAddress(_myAddress)
      setPageLoading(false)
    } catch (error) {
      //console.error('error获取钱包地址失败')
    }

  }
  //英雄排序
  const heroSortDom=<div id="selectsort" className="flex items-center">
    <label className="md:inline-block hidden">{t('market.sortBy')}</label>
    <Select
      className="select-sort"
      placeholder={t('market.sortBy')}
      getPopupContainer={() => (document.querySelector('#selectsort') ?? document.body)}
      onChange={(e: any) => setFilter({ sort: e })}
      value={filter.sort}
    >
      <Option value="time">
        { t('market.publishedDate') }
      </Option>
      <Option value="total">
        { t('market.totalAttributes') }
      </Option>
      <Option value="price">
        { t('market.price') }
      </Option>
    </Select>
    <Button
      width="100px"
      height="40px"
      bold
      disabled={filter.sort === undefined}
      className="ml-1"
      fontSize="18px"
      border="1px solid #664F42"
      onClick={() => setFilter(prev => ({
        order: prev.order === 'asc' ? 'desc' : 'asc'
      }))}
    >
      { filter.order === 'asc' ? t('market.ascending') : t('market.descending') }
    </Button>
  </div>
  //装备排序
  const equipSortDom=<div id="selectsort" className="flex items-center">
    <label className="md:inline-block hidden">{t('market.sortBy')}</label>
    <Select
      className="select-sort"
      placeholder={t('market.sortBy')}
      getPopupContainer={() => (document.querySelector('#selectsort') ?? document.body)}
      onChange={(e: any) => setEquipFilter({ sort: e })}
      value={equipFilter.sort}
    >
      <Option value="time">
        { t('market.publishedDate') }
      </Option>
      <Option value="rarity">
        { t('market.rarity') }
      </Option>
      <Option value="price">
        { t('market.price') }
      </Option>
    </Select>
    <Button
      width="100px"
      height="40px"
      bold
      disabled={equipFilter.sort === undefined}
      className="ml-1"
      fontSize="18px"
      border="1px solid #664F42"
      onClick={() => setEquipFilter(prev => ({
        order: prev.order === 'asc' ? 'desc' : 'asc'
      }))}
    >
      { equipFilter.order === 'asc' ? t('market.ascending') : t('market.descending') }
    </Button>
  </div>
  //英雄过滤
  const heroRadioFilterDom=<>
    <div className="hidden md:block radioRow">
      <label className="text-sm text-primary mr-3 font-bold">{t('market.class')}:</label>
      <RadioGroup
        value={filter.role}
        space="10px"
        width="88px"
        height="34px"
        fontSize="14px"
        bold
        bgColor="#0C0909"
        buttonStyle="solid"
        onChange={(e: RadioChangeEvent) => {
          setFilter({ role: e.target.value })
          resetPagination()
        }
        }
      >
        <RadioButton value="">
          { t('game.total') }
        </RadioButton>
        <RadioButton value="0">
          { t('home.warrior') }
        </RadioButton>
        <RadioButton value="1">
          { t('home.mage') }
        </RadioButton>
        <RadioButton value="2">
          { t('home.hunter') }
        </RadioButton>
        <RadioButton value="3">
          { t('home.assassin') }
        </RadioButton>
      </RadioGroup>
    </div>
    <div className="mt-3 hidden md:block radioRow">
      <label className="text-sm  text-primary mr-3 font-bold">{t('game.card.quality')}:</label>
      <RadioGroup
        value={filter.quality}
        space="10px"
        width="88px"
        height="34px"
        fontSize="14px"
        bold
        bgColor="#0C0909"
        buttonStyle="solid"
        onChange={(e: RadioChangeEvent) => {
          setFilter({ quality: e.target.value })
          resetPagination()
        }
        }
      >
        <RadioButton value="">
          { t('game.total') }
        </RadioButton>
        <RadioButton value="legendary">
          { t('game.card.legendary') }
        </RadioButton>
        <RadioButton value="epic">
          { t('game.card.epic') }
        </RadioButton>
        <RadioButton value="superb">
          { t('game.card.superb') }
        </RadioButton>
        <RadioButton value="excellent">
          { t('game.card.excellent') }
        </RadioButton>
        <RadioButton value="normal">
          { t('game.card.normal') }
        </RadioButton>
      </RadioGroup>
    </div>
  </>
  //装备过滤
  const equipRadioFilterDom=<>
    {/* 品质 */}
    <div className="hidden md:block radioRow">
      <label className="text-sm text-primary mr-3 font-bold">{t('market.class')}:</label>
      <RadioGroup
        value={equipFilter.role}
        space="10px"
        width="88px"
        height="34px"
        fontSize="14px"
        bold
        bgColor="#0C0909"
        buttonStyle="solid"
        onChange={(e: RadioChangeEvent) => {
          setEquipFilter({ role: e.target.value })
          resetPagination()
        }
        }
      >
        <RadioButton value="">
          { t('game.total') }
        </RadioButton>
        <RadioButton value="0">
          { t('home.warrior') }
        </RadioButton>
        <RadioButton value="1">
          { t('home.mage') }
        </RadioButton>
        <RadioButton value="2">
          { t('home.hunter') }
        </RadioButton>
        <RadioButton value="3">
          { t('home.assassin') }
        </RadioButton>
      </RadioGroup>
    </div>
    {/* 类别 */}
    <div className="mt-3 hidden md:flex  radioRow">
      <label className="text-sm  text-primary mr-3 font-bold " style={{marginTop: 6}}>{t('market.equip.category')}:</label>
      <RadioGroup
        value={equipFilter.category}
        space="10px"
        width="88px"
        height="34px"
        fontSize="14px"
        className='categoryRow'
        bold
        bgColor="#0C0909"
        buttonStyle="solid"
        onChange={(e: RadioChangeEvent) => {
          setEquipFilter({ category: e.target.value })
          resetPagination()
        }
        }
      >
        <RadioButton value="">
          { t('game.total') }
        </RadioButton>
        <RadioButton value="0">
          { t('game.backpack.Weapon') }
        </RadioButton>
        <RadioButton value="1">
          { t('game.backpack.OffHand') }
        </RadioButton>
        <RadioButton value="2">
          { t('game.backpack.Helmet') }
        </RadioButton>
        <RadioButton value="3">
          { t('game.backpack.Necklace') }
        </RadioButton>
        <RadioButton value="4">
          { t('game.backpack.Armor') }
        </RadioButton>
        <RadioButton value="5">
          { t('game.backpack.Glove') }
        </RadioButton>
        <RadioButton value="6">
          { t('game.backpack.Ring') }
        </RadioButton>
        <RadioButton value="8">
          { t('game.backpack.Belt') }
        </RadioButton>
        <RadioButton value="9">
          { t('game.backpack.Boots') }
        </RadioButton>
      </RadioGroup>
    </div>
  </>
  return (
    <NtfWrapper className="m-auto pt-12 px-4 md:px-0 flex flex-col md:flex-row md:justify-start">
      <div
        className="left md:w-255px md:flex-shrink-0 w-full md:max-w-sm md:mr-6"
      >
        {/* 更改英雄市场和装备市场 */}
        <div className="w-full flex justify-center">
          <RadioGroup
            value={type}
            space="20px"
            width={'150px'}
            height="40px"
            fontSize="18px"
            bold
            className="no-border"
            bgColor="#0C0909"
            buttonStyle="solid"
            onChange={(e)=>{
              setType(e.target.value)
              setMarketTypeParams({
                marketType: e.target.value
              })
              resetPagination()
            }}
          >
            <RadioButton value="hero">
              <div className="flex justify-center items-center">
                <img src={heroDecor} className="h-6 mr-2" alt="" />
                { t('market.heroMarket') }
              </div>
            </RadioButton>
            <RadioButton value="equip">
              <div className="flex justify-center items-center">
                <img src={equipDecor} className="h-6 mr-2" alt="" />
                { t('market.equipmentMarket') }
              </div>
            </RadioButton>
          </RadioGroup>
        </div>
        <div
          className="mt-10 px-5 pt-9 border border-solid rounded-xl bd-col-514031 bg-171212"
          style={{height: 'calc(100% - 76px)'}}
        >
          <div>
            <div className="flex items-end mb-6 justify-between">
              <h1 className="color-B2856C mb-0">
                { t('market.myMarket') }
              </h1>
              {
                !isVoid(saleState) && <div
                  className="color-B2856C text-base cursor-pointer"
                  onClick={() => changeMarketState(undefined)}
                >
                  { t('market.return') }
                </div>
              }
            </div>
            <div className="text-lg color-664F42 flex justify-center">
              <span
                className={classnames('flex items-center cursor-pointer', {
                  'text-primary': saleState === 'sale'
                })}
                onClick={() => changeMarketState('sale')}
              >
                <img className="h-7 mr-2" src={purchaseImg} alt="" />
                { t('market.mySale') }
              </span>
              <span
                className={classnames('ml-11 flex items-center cursor-pointer', {
                  'text-primary': saleState === 'buy'
                })}
                onClick={() => changeMarketState('buy')}
              >
                <img className="h-7 mr-2" src={myBuyImg} alt="" />
                { t('market.myPurchase') }
              </span>
            </div>
            <div className="flex justify-center mt-8">
              <Button
                img={btnRedBg}
                width="186px"
                height="46px"
                bold
                fontSize="16px"
                onClick={() => type==='equip'?sellEquip():sellHero()}
              >
                { t('market.publish')}
                {/* {type==='equip'? t('market.publishHero'):t('market.publishEquip') } */}
              </Button>
            </div>
            <div className="w-full h-1px divider mt-7" />
          </div>
          {/* 筛选框 */}
          {
            type==='equip'?<>
              <div className="mt-8 mb-5">
                <div className="flex items-center justify-between">
                  <span className="color-B2856C text-2xl">
                    { t('market.filter') }
                  </span>
                  <span
                    className="color-664F42 text-lg cursor-pointer"
                    onClick={handleEquipClear}
                  >
                    { t('market.clearFilter') }
                  </span>
                </div>
              </div>
              <div className={(windowSize === 'phone' && expand) ? 'hidden' : 'block'}>
                <Slider
                  id="s1"
                  title={t('market.rarity')}
                  max={5}
                  min={1}
                  range
                  value={equipFilter.categoryRage}
                  onChange={e => setEquipFilter({ categoryRage: e })}
                />

              </div>
            </>:<>
              <div className="mt-8 mb-5">
                <div className="flex items-center justify-between">
                  <span className="color-B2856C text-2xl">
                    { t('market.filter') }
                  </span>
                  <span
                    className="color-664F42 text-lg cursor-pointer"
                    onClick={handleClear}
                  >
                    { t('market.clearFilter') }
                  </span>
                </div>
              </div>
              <div className={(windowSize === 'phone' && expand) ? 'hidden' : 'block'}>
                <Slider
                  id="s1"
                  title={t('game.mine.level')}
                  max={12}
                  min={1}
                  range
                  value={filter.level}
                  onChange={e => setFilter({ level: e })}
                />
                <Slider
                  id="s2"
                  title={t('market.totalAttributes')}
                  range
                  min={1}
                  max={450}
                  value={filter.total}
                  onChange={e => setFilter({ total: e })}
                />
                <Slider
                  title={t('game.strength')}
                  id="s3"
                  range
                  min={1}
                  max={100}
                  value={filter.strength}
                  onChange={e => setFilter({ strength: e })}
                />
                <Slider
                  title={t('game.agility')}
                  id="s5"
                  range
                  min={1}
                  max={100}
                  value={filter.agility}
                  onChange={e => setFilter({ agility: e })}
                />
                <Slider
                  title={t('game.stamina')}
                  id="s4"
                  range
                  min={1}
                  max={100}
                  value={filter.stamina}
                  onChange={e => setFilter({ stamina: e })}
                />
                <Slider
                  title={t('game.will')}
                  id="s6"
                  range
                  min={1}
                  max={100}
                  value={filter.will}
                  onChange={e => setFilter({ will: e })}
                />
                <Slider
                  title={t('game.intelligence')}
                  id="s7"
                  range
                  min={1}
                  max={100}
                  value={filter.intelligence}
                  onChange={e => setFilter({ intelligence: e })}
                />
                <Slider
                  title={t('game.mind')}
                  id="s8"
                  range
                  min={1}
                  max={100}
                  value={filter.mind}
                  onChange={e => setFilter({ mind: e })}
                />
              </div>
            </>
          }

          <div className={classnames('w-full h-1px divider md:hidden', {
            'mt-20': !expand,
            'mt-10': expand
          })} />
          <div className="text-center mt-3 md:hidden">
            <span
              className="cursor-pointer"
              onClick={() => {
                setExpand(prev => !prev)
              }}>
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
          {/* 顶部排序 */}
          <div className="hidden md:block">
            {/* 出售中  已结束 */}
            {
              isVoid(saleState) ? <>
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
                    {
                      type==='equip'?(equipNum.marketPublishNum ? `（${equipNum.marketPublishNum}）` : ''):
                        (heroNum.marketPublishNum ? `（${heroNum.marketPublishNum}）` : '')
                    }
                  </RadioButton>
                  <RadioButton value="s">
                    {}
                    {t('market.end')}{
                      type==='equip'?
                        (equipNum.marketSoldNum ? `（${equipNum.marketSoldNum}）` : ''):
                        (heroNum.marketSoldNum ? `（${heroNum.marketSoldNum}）` : '')}
                  </RadioButton>
                </RadioGroup>
              </> : saleState === 'sale' ? <>
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
                  onChange={(e: RadioChangeEvent) =>{
                    setRquestType({
                      myType: e.target.value
                    })
                    resetPagination()
                  }
                  }
                >
                  <RadioButton value="p">
                    {t('market.posted')}{ type==='equip'?
                      (equipNum.publishNum ? `（${equipNum.publishNum}）` : ''): t
                      (heroNum.publishNum ? `（${heroNum.publishNum}）` : '')
                    }
                  </RadioButton>
                  <RadioButton value="s">
                    {t('market.sold')}{type==='equip'?
                      (equipNum.soldNum ? `（${equipNum.soldNum}）` : ''):
                      (heroNum.soldNum ? `（${heroNum.soldNum}）` : '')
                    }
                  </RadioButton>
                </RadioGroup>
              </> :<RadioGroup
                value={'aa'}
                className="no-radius"
                space="10px"
                width="160px"
                height="40px"
                fontSize="18px"
                bold
                bgColor="#0C0909"
                buttonStyle="solid"

              >
                <RadioButton value="aa">

                  {t('market.purchased')}{type==='equip'?
                    (equipNum.ordersNum ? `（${equipNum.ordersNum}）` : ''):
                    (heroNum.ordersNum ? `（${heroNum.ordersNum}）` : '')
                  }

                </RadioButton>

              </RadioGroup>

            }
          </div>
          {
            type==='equip'?equipSortDom:heroSortDom
          }
        </div>
        <Spin spinning={pageLoading}>
          <div
            className="md:mt-10 md:pl-5 md:pr-2 md:pt-9 md:border
                       md:border-solid rounded-xl bd-col-514031
                       md:min-h-1440px"
          >
            {
              type==='hero'?heroRadioFilterDom:equipRadioFilterDom
            }


            <div className="mt-7 flex flex-wrap md:justify-start justify-center">
              {
                // 装备列表
                type==='equip' ? <>
                  {
                    getCurrentEquipList.map((item, index) => (
                      <EquipmentCard
                        key={'_index'+index}
                        marketEquip={item}
                        saleState={saleState}
                        marketType={saleState?rquestType.myType:rquestType.marketType}
                        onLoad={ getMarketEquip}
                        onClick={(equip:I_Equip_market)=>{ buyEquip(equip) }}
                      />
                    ))
                  }
                </>:
                  <>
                    {/* 市场英雄列表 */}
                    {
                      // 市场全部英雄
                      isVoid(saleState) && <>
                        {
                          getCurrentHeroList.map((item, index) => (
                            <HeroItemOne
                              key={'_index'+index}
                              hero={item}
                              onClick={buyHero}
                            />
                          ))
                        }
                      </>
                    }
                    {
                      // 我的售卖
                      saleState === 'sale' && <>
                        {
                          getCurrentHeroList.map((item, index) => (
                            <HeroItemTwo
                              key={'_index'+index}
                              hero={item}
                              onClick={buyHero}
                            >
                              <Button
                                img={item.onSell ? btnRedBg : btnDarkBg}
                                width="184px"
                                height="46px"
                                fontSize="18px"
                                bold
                                onClick={item.onSell ? () => cancel(item.sellNo) : undefined}
                              >
                                {item.onSell ? t('market.cancel') : t('market.sold')}
                              </Button>
                            </HeroItemTwo>
                          ))
                        }
                      </>
                    }
                    {
                      // 我的购买
                      saleState === 'buy' && <>
                        {
                          getCurrentHeroList.map((item, index) => (
                            <HeroItemTwo
                              key={index}
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
                                { t('market.purchased') }
                              </Button>
                            </HeroItemTwo>
                          ))
                        }
                      </>
                    }
                  </>

              }
            </div>
            <div className="flex justify-center mb-4">
              <SimplePagination
                current={currentPage}
                total={total}
                pageSize={9}
                currentChange={val => setCurrentPage(val)}
              />
            </div>
          </div>
        </Spin>
      </div>
    </NtfWrapper>
  )
}

export default NTFMarket
