import { useCallback, useEffect, useState } from 'react'
import Button from 'src/components/Button'
import { ListWrapper } from './style'
import { useWeb3React } from '@web3-react/core'

import { notification, Spin, Select } from 'antd'
import { useNavigate } from 'react-router'
import useMountedRef, { copyToClipboard, subTokenId } from 'src/utils'
import { useTranslation } from 'react-i18next'
import { ReactComponent as SwtichCard } from 'src/assets/images/game/hero/switctcard.svg'
import { ReactComponent as SwtichList } from 'src/assets/images/game/hero/switchlist.svg'
import { ReactComponent as CopyIcon } from 'src/assets/images/game/hero/copy.svg'
import herodbg from 'src/assets/images/game/backpack/hero_d_bg.png'
import { useUrlQueryParam } from 'src/utils/url'
import { getQualityPic, HeroImgList } from 'src/config'
import { EquType, useWindowSize } from 'src/context'
import MobileHeroList from './MobileHeroList'
import HeroList from './HeroList'
import { pve_heroType, Occupations } from 'src/types/hero'
import NoData from 'src/components/NoData'
import NoviceImgMark from 'src/components/NoviceImgMark'
import btnDarkBg from 'src/assets/images/common/btn_arrow_dark.png'
import btnRedBg from 'src/assets/images/common/btn_arrow_red.png'
// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useSetState } from 'ahooks'
import { getPveHeroList } from 'src/web3/pve'
import { getIsQualifiedHero } from 'src/utils/attributeSetting'
import heroQualifiedBigImg from 'src/assets/images/game/hero/Hero-bg-big-qu.png'


type t_sortAttr='level'|'attributes'
interface I_setSortConfig{
  sort: 'asc'|'desc',
  attr:t_sortAttr
}
type t_quality='all'|'quality'|'unqualified'
interface I_initFilter{
  quality:t_quality
}
const Heros: React.FC = () => {
  const {Option} =Select

  const { account, library } = useWeb3React()
  const [loading, setLoading] = useState<boolean>(true)
  const [heroList, setHeroList] = useState<pve_heroType[]>([])
  //所选择职业
  const [occupationTab, setOccupationTab] = useState(99)
  const [params, setViewType] = useUrlQueryParam(['view'])
  const viewType = params.view || 'list'
  const { windowSize } = useWindowSize()
  //排序
  const [sortConfig, setSortConfig]=useSetState<I_setSortConfig>({
    sort: 'asc',
    attr: 'level'
  })

  const initFilter:I_initFilter={

    quality: 'all'
  }
  const [filterConfig, setFilterConfig] = useSetState(initFilter)

  const { t } = useTranslation()
  //职业tabs
  const tabsList=[
    {
      id: 99,
      lable: t('game.heros.allRoles')
    },
    {
      id: 0,
      lable: t('home.warrior')
    },
    {
      id: 1,
      lable: t('home.mage')
    },
    {
      id: 2,
      lable: t('home.hunter')
    },
    {
      id: 3,
      lable: t('home.assassin')
    }

  ]
  const navigate = useNavigate()
  // 组件挂在状态
  const mountedRef = useMountedRef()

  const getHero = useCallback(async () => {
    setLoading(true)
    try {
      const heros = await getPveHeroList(library)
      if (mountedRef.current) {
        setHeroList(heros.reverse())
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      notification.error({
        message: 'Error',
        description: (error as Error).message
      })
    }

  }, [library, mountedRef])

  useEffect(() => {
    if (account) {
      getHero()
    }
  }, [account, getHero])

  const goDetail = (tokenId: string) => {
    navigate(`/game/hero/${tokenId}`)
  }

  const sortList=heroList.filter((item)=>occupationTab===99||occupationTab===item.occupation ).sort((a, b)=>{
    if (sortConfig.attr==='level'){
      return sortConfig.sort==='desc'? a.level-b.level:b.level-a.level
    } else if (sortConfig.attr==='attributes'){
      return sortConfig.sort==='desc'? a.total-b.total:b.total-a.total
    } else {
      return 1
    }

  }).filter((item)=>{
    if (filterConfig.quality==='all'){
      return true
    } else if (filterConfig.quality==='quality'){
      return getIsQualifiedHero(item)

    } else if (filterConfig.quality==='unqualified'){
      return !getIsQualifiedHero(item)
    } else {
      return true
    }


  })
  return (
    <ListWrapper>
      <div className="switch-view">
        <div className='flex flex-nowrap'>


          <div className="choseTitle ">

            <div
              className="leftRow flex  w-full text-base"
            >
              <div className="flex  flex-nowrap items-center w-full text-base">
                {
                  tabsList.map((item)=>{
                    return <div
                      className={`tabItem ${occupationTab===item.id?'activeItem':''}`}
                      key={item.id}
                      onClick={()=>{ setOccupationTab(item.id) }}
                    >
                      {item.lable}
                    </div>

                  })
                }
              </div>

              <div id='selectsort' className="flex items-center flex-nowrap cursor-pointer ">
                <Select style={{width: 80}} value={filterConfig.quality} bordered={false} className="selectColor"
                  size="small"
                  getPopupContainer={() => { return document.getElementById('selectsort')??document.body }}
                  dropdownClassName='dropdownClassName'
                  onChange={(value:t_quality)=>{
                    setFilterConfig({
                      quality: value
                    })
                  }}
                >
                  <Option value="all"> {t('game.backpack.All')}</Option>
                  <Option value="quality">{t('game.heros.qualify')}</Option>
                  <Option value="unqualified">{t('game.heros.unqualified')}</Option>
                </Select>
                <Select value={sortConfig.attr} bordered={false} className="selectColor"
                  size="small"
                  getPopupContainer={() => { return document.getElementById('selectsort')??document.body }}
                  dropdownClassName='dropdownClassName'
                  onChange={(value)=>{
                    setSortConfig({
                      attr: value
                    })
                  }}
                >
                  <Option value="level"> {t('game.mine.level')}</Option>
                  <Option value="attributes">{t('game.heros.attributes')}</Option>
                </Select>

                <Button
                  width="60px"
                  height="30px"
                  bold
                  className="ml-1"
                  fontSize="16px"
                  size="small"
                  border="1px solid #664F42"
                  onClick={()=>{
                    setSortConfig({
                      sort: sortConfig.sort==='desc'?'asc':'desc'
                    })
                  }}
                >
                  { sortConfig.sort==='desc' ? t('game.heros.asc') : t('game.heros.desc') }
                </Button>
                {/* <ArrowRightAltIcon
                  onClick={()=>{
                    setSortConfig({
                      sort: sortConfig.sort==='desc'?'asc':'desc'
                    })
                  }}
                  style={{
                    transform: sortConfig.sort==='desc'?'rotate(90deg)':'rotate(270deg)',
                    marginTop: '-2px'
                  }} /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="rightItem">
          <SwtichCard
            className={`${viewType === 'card' && 'active'}`}
            onClick={() => setViewType({ view: 'card' })}
          />
          <SwtichList
            className={`${viewType === 'list' && 'active'}`}
            onClick={() => setViewType({ view: 'list' })}
          />
        </div>

      </div>
      <Spin spinning={loading}>
        {
          heroList.length > 0 ?
            viewType === 'list'
              ?
              windowSize === EquType.PC ?
                <HeroList heroList={sortList} /> :
                <MobileHeroList heroList={sortList} />
              :
              <div className="list-card">
                {
                  sortList.map(item => {
                    const isQualifiedHero=getIsQualifiedHero(item)
                    return (
                      <div key={item.tokenId} className="list-card-item"
                        style={{
                          backgroundImage: isQualifiedHero?`url(${heroQualifiedBigImg})`:''
                        }}
                      >
                        <div className="top-desc">
                          <div className="left">
                            <span className="flex items-center">
                              <p>{t(`home.${Occupations[item.occupation]}`)}</p>
                              <p className="mx-3">LV.{item.level}</p>
                              <img src={ getQualityPic(item.total)?.[1] } alt="" />
                            </span>
                            <div className="flex my-3">
                              <p>{t('game.FatigueValue')}</p>
                              <p className="text-valueColor ml-3">{item.fatigue}</p>
                            </div>
                            <span>
                          TokenID：{subTokenId(item.tokenId)}
                              <CopyIcon
                                width="16"
                                height="16"
                                fill="#664F42"
                                style={{ marginLeft: '4px', cursor: 'pointer' }}
                                onClick={(e) => copyToClipboard(item.tokenId, e)}
                              />
                            </span>
                          </div>
                          <div className="right">
                            <Button
                              width="157px"
                              height="48px"
                              img={btnRedBg}
                              bold
                              onClick={() => navigate('/game?name=adventure&view=list')}
                              className="es-button"
                            >
                              {t('game.nav.Adventure')}
                            </Button>
                            <Button
                              width="157px"
                              height="48px"
                              img={btnDarkBg}
                              bold
                              className="es-button"
                              onClick={() => navigate('/game?name=mine')}
                            >
                              {t('game.heros.goToWork')}
                            </Button>
                          </div>
                        </div>
                        <div className="img relative"
                        >
                          {!isQualifiedHero&& <img src={herodbg} className="bg" alt="" />}
                          <img
                            className="card-hero-bg"
                            style={{
                              marginRight:
                            item.occupation === Occupations['assassin'] ?
                              '40px' :
                              'unset'
                            }}
                            src={HeroImgList[item.occupation]}
                            alt=""
                            draggable="false"
                            onClick={() => goDetail(item.tokenId)}
                          />
                          {
                            item.newbie && <NoviceImgMark top={0} right={0} height={32} />
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            : <NoData />
        }
      </Spin>
    </ListWrapper>
  )
}

export default Heros
