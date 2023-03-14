import { useWeb3React } from '@web3-react/core'

import { notification } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'


import { ChoseEquipStyle } from './style'

import { useSetState } from 'ahooks'
import { I_Equip } from '../../backpack'
import { getMyEquipsApi } from 'src/pages/api/equip'
interface I_ChoseEquip{
    setVisible:(visible:boolean) =>void;
    onChoseEquip:(equipItem:I_Equip, index:number) =>void;
    setLoading:(loading:boolean) =>void;
    tokenNncryption?:number;
    className?:string;
    useList?:I_Equip[];
    style?:any;
    filterList?:string[],
}
const ChoseEquip:React.FC<I_ChoseEquip>=(props:I_ChoseEquip)=>{
  const { account, library } = useWeb3React()
  const {setVisible, onChoseEquip, setLoading, useList, filterList=[]}=props
  //所选择职业
  const [equipTab, setEquipTab] = useState(99)
  const [equipList, setEquipList] = useState<I_Equip[]>([])
  const { t, i18n: {language}} = useTranslation()
  //排序
  const [sortConfig, setSortConfig]=useSetState({
    level: 'asc'
  })

  const getMyEuipList = useCallback(async () => {
    if (useList){
      setEquipList(useList)
      return
    }
    if (account) {
      setLoading(true)
      // 获取所有英雄

      const myAddress =await library.getSigner().getAddress()
      getMyEquipsApi(myAddress, 2).then((res:I_Equip[]) => {

        setEquipList(res)
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
    getMyEuipList()
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
      lable: t('game.backpack.Weapon')
    },
    {
      id: 1,
      lable: t('game.backpack.OffHand')
    },
    {
      id: 2,
      lable: t('game.backpack.Helmet')
    },
    {
      id: 3,
      lable: t('game.backpack.Necklace')
    },
    {
      id: 4,
      lable: t('game.backpack.Armor')
    },
    {
      id: 5,
      lable: t('game.backpack.Glove')
    },
    {
      id: 6,
      lable: t('game.backpack.Ring')
    }
    ,
    {
      id: 8,
      lable: t('game.backpack.Belt')
    }
    ,
    {
      id: 9,
      lable: t('game.backpack.Boots')
    }
  ]
  return <ChoseEquipStyle className={props.className??''} style={{...props.style}} >
    <div className="choseTitle ">
      <div className="closeBtn" onClick={() =>setVisible(false)}></div>
      <div
        className="tabs flex  w-full text-base"
      >
        {
          tabsList.map((item)=>{
            return <div
              className={`tabItem ${equipTab===item.id?'activeItem':''}`}
              key={item.id}
              onClick={()=>{ setEquipTab(item.id) }}
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
          {/* LV
          <ArrowRightAltIcon
            style={{
              transform: sortConfig.level==='desc'?'rotate(90deg)':'rotate(270deg)',
              marginTop: '-2px',
              marginRight: 5
            }} />*/}
        </div>

      </div>


    </div>
    <div className="choseList">
      {
        equipList.filter((item)=>{
          if (equipTab===99){
            return true

          } else {
            if (equipTab<=6){
              //没到戒指
              return item.equip===equipTab

            } else if (equipTab===6){
              //戒指
              return item.equip===6||item.equip===7
            } else {
              //8腰带   9鞋子
              return item.equip===equipTab
            }
          }
        }).filter((item)=>{
          if (filterList.length===0){
            return true
          } else {
            return filterList.indexOf(item.tokenId)<0
          }


        }).map((equipItem, index)=>{
          return <div key={index} className="listItem"
            onClick={()=>{ onChoseEquip(equipItem, index) }}
          >
            <div className="listItem-row">
              <span>
                {/* 职业 */}
                <span className="mr-1 "> {language==='en-US'?equipItem.en:equipItem.name}</span>
                {/* 强化等级 */}
                <span className="mr-1">(+{equipItem.castLv})</span>
                {/* 等级 */}
                <span className="mr-1">LV.{equipItem.lv}</span>
              </span>
              {/* 竖线 */}
              <span className="h-14px w-1px mx-2 bg-primary"></span>
              <div>
                {/* 伤害倍数 */}
                {
                  equipItem.dbrk+equipItem.rbrk>0&&<span>
                    {t('game.backpack.InjuryMultiple')}:<span className="numberColor ml-1 mr-5">{(equipItem.dbrk+equipItem.rbrk)}%</span>
                  </span>
                }
                {/* 物理伤害 */}
                {
                  equipItem.dmg>0&& <span>
                    {t('game.backpack.PhysicalAttack')}
                    <span className="numberColor ml-1 mr-5">{equipItem.dmg}</span>
                  </span>
                }
                {/* 魔法伤害 */}
                {
                  equipItem.mag>0&& <span>
                    {t('game.backpack.MagicAttack')}
                    <span className="numberColor ml-1 mr-5">{equipItem.mag}</span>
                  </span>
                }
                {/* 防御 */}
                {
                  equipItem.def>0&& <span>
                    {t('game.backpack.Defense')}
                    <span className="numberColor ml-1 mr-5">{equipItem.def}</span>
                  </span>
                }
                {/* 魔抗 */}
                {
                  equipItem.res>0&& <span>
                    {t('game.backpack.Resistance')}
                    <span className="numberColor ml-1 mr-5">{equipItem.res}</span>
                  </span>
                }
                {/* 生命值 */}
                {
                  equipItem.hp>0&& <span>
                    {t('game.backpack.HP')}
                    <span className="numberColor ml-1 mr-5">{equipItem.hp}</span>
                  </span>
                }

                {/* 力量 */}
                {
                  equipItem.str>0&& <span>
                    {t('game.strength_s')}
                    <span className="numberColor ml-1 mr-5">{equipItem.str}</span>
                  </span>
                }
                {/* 精神 */}
                {
                  equipItem.spt>0&& <span>
                    {t('game.mind_s')}
                    <span className="numberColor ml-1 mr-5">{equipItem.spt}</span>
                  </span>
                }
                {/* 敏捷 */}
                {
                  equipItem.agi>0&& <span>
                    {t('game.agility_s')}
                    <span className="numberColor ml-1 mr-5">{equipItem.agi}</span>
                  </span>
                }
                {/* 意志 */}
                {
                  equipItem.wil>0&& <span>
                    {t('game.will_s')}
                    <span className="numberColor ml-1 mr-5">{equipItem.wil}</span>
                  </span>
                }
                {/* 体质 */}
                {
                  equipItem.con>0&& <span>
                    {t('game.stamina_s')}
                    <span className="numberColor ml-1 mr-5">{equipItem.con}</span>
                  </span>
                }
                {/* 智力 */}
                {
                  equipItem.inte>0&& <span>
                    {t('game.intelligence_s')}
                    <span className="numberColor ml-1 mr-5">{equipItem.inte}</span>
                  </span>
                }
              </div>

            </div>
            <div className="listItem-row text-xs"
              style={{
                color: 'rgb(102, 79, 66)'
              }}
            >

              {/* tokenID */}
              {/* <span className="ml-0"> Token ID：<span className="ml-0">{subTokenId(equipItem?.tokenId, tokenNncryption)}</span></span> */}
              <span className='ml-7'>
                {/* <span>{t('game.FatigueValue')}</span> */}
                {/* <span className="ml-3">{equipItem.fatigue}</span> */}
              </span>
            </div>


          </div>
        })
      }
    </div>
  </ChoseEquipStyle>


}

export default ChoseEquip
