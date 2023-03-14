import { useWeb3React } from '@web3-react/core'

import { notification } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { attributesType, t_attribute } from 'src/utils/attributeSetting'
import { HeroType, Occupations } from 'src/types/hero'
import { subTokenId } from 'src/utils'
import { myHerosNew } from 'src/web3/hero'
import { ChoseHeroStyle } from './style'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useSetState } from 'ahooks'
interface I_ChoseHero{
    setVisible:(visible:boolean) =>void;
    onChoseHero:(hero:HeroType, index:number) =>void;
    setLoading:(loading:boolean) =>void;
    tokenNncryption?:number;
    className?:string;
    useList?:HeroType[];
    style?:any;
}
const ChoseHero:React.FC<I_ChoseHero>=(props:I_ChoseHero)=>{
  const { account, library } = useWeb3React()
  const {setVisible, onChoseHero, setLoading, tokenNncryption=5, useList}=props
  //所选择职业
  const [occupationTab, setOccupationTab] = useState(99)
  const [heroList, setHeroList] = useState<HeroType[]>([])
  const { t } = useTranslation()
  //排序
  const [sortConfig, setSortConfig]=useSetState({
    level: 'asc'
  })

  const getMyHeros = useCallback(() => {
    if (useList){
      setHeroList(useList)
      return
    }
    if (account) {
      setLoading(true)
      // 获取所有英雄
      myHerosNew(library).then((res:HeroType[]) => {
        const list=res.sort((a, b) => {
          return a.total - b.total
        })
        setHeroList(list)
      }).catch(error => {
        notification.error({
          message: 'Error',
          description: error?.message
        })
        setLoading(false)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [account])
  useEffect(() => {
    getMyHeros()
  }, [account])
  //获取英雄列表

  //职业tabs
  const tabsList=[
    {
      id: 99,
      lable: t('game.total')
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
  return <ChoseHeroStyle className={props.className??''} style={{...props.style}} >
    <div className="choseTitle ">
      <div className="closeBtn" onClick={() =>setVisible(false)}></div>
      <div
        className="tabs flex flex-nowrap w-full text-base"
      >
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
      {/* 排序 */}
      <div className="sortList">
        <div className="flex flex-nowrap cursor-pointer"
          onClick={()=>{
            setSortConfig({
              level: sortConfig.level==='desc'?'asc':'desc'
            })
          }}
        >
          LV
          <ArrowRightAltIcon
            style={{
              transform: sortConfig.level==='desc'?'rotate(90deg)':'rotate(270deg)',
              marginTop: '-2px',
              marginRight: 5
            }} /></div>

      </div>


    </div>
    <div className="choseList">
      {
        heroList.filter((item)=>(occupationTab===99||occupationTab===item.occupation)&&item.level>0 ).sort(
          (a, b)=>{
            return sortConfig.level==='desc'?b.level-a.level:a.level-b.level
          }
        ).map((hero, index)=>{
          return <div key={index} className="listItem"
            onClick={()=>{ onChoseHero(hero, index) }}
          >
            <div className="listItem-row">
              <span>
                {/* 职业 */}
                <span className="mr-1 "> {t(`home.${Occupations[hero.occupation]}`)}</span>
                {/* 等级 */}
                <span className="mr-1">LV.{hero.level}</span>
              </span>
              {/* 竖线 */}
              <span className="h-14px w-1px mx-2 bg-primary"></span>
              <div>
                {/* 总属性 */}
                <span>{t('game.total')}:<span className="numberColor ml-1 mr-5">{hero.total}</span></span>
                {/* 主属性 */}
                <span>{t('game.heros.main')}<span className="numberColor ml-1 mr-5">{hero[attributesType[hero.occupation].main as t_attribute]}</span></span>
                {/* 副属性 */}
                <span>{t('game.heros.sub')}<span className="numberColor ml-1 mr-0">{hero[attributesType[hero.occupation].sub as t_attribute]}</span></span>

              </div>

            </div>
            <div className="listItem-row text-xs"
              style={{
                color: 'rgb(102, 79, 66)'
              }}
            >

              {/* tokenID */}
              <span className="ml-0"> Token ID：<span className="ml-0">{subTokenId(hero?.tokenId, tokenNncryption)}</span></span>
              <span className='ml-7'>
                <span>{t('game.FatigueValue')}</span>
                <span className="ml-3">{hero.fatigue}</span>
              </span>
            </div>


          </div>
        })
      }
    </div>
  </ChoseHeroStyle>


}

export default ChoseHero
