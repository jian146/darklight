import { LogPageStyle } from './style'
import {useEffect, useState} from 'react'
import { getInfosApi } from 'src/pages/api/equip'

import { I_Equip } from '../../backpack'
import EquipImg from 'src/components/EquipImg/equipImg'
import { useTranslation } from 'react-i18next'
import Button from 'src/components/Button'
import { Spin } from 'antd'
import moment from 'moment'
import { useWeb3React } from '@web3-react/core'

interface I_LogPage{
    logList:I_forgeErrorLog[]
    onForgingRetry:(item:I_logInfoList)=>void
    forgeType:number
}
export interface I_forgeErrorLog{
    tokenId: string,
    subTokenId:string[]
    castId: string,
    castType: number,
    player: string,
    time:number
}
export type I_logInfoList=I_forgeErrorLog&{
    equip:I_Equip

}
const LogPage=(props:I_LogPage)=>{
  const {logList, onForgingRetry, forgeType}=props
  const { library } = useWeb3React()
  const { t, i18n: {language}} = useTranslation()
  const forgeLvTextArr=[
    t('game.backpack.FoundationForging'),
    t('game.backpack.MasterForging'),
    t('game.backpack.PalaceForging')
  ]
  const [loading, setLoading]=useState(false)
  const [logInfoList, setLogInfoList]=useState<I_logInfoList[]>([])
  const [playAddress, setPlayAddress]=useState('')
  useEffect(()=>{
    getEquipInfo()
  }, [])
  const getEquipInfo=async ()=>{
    const tokenIdList=logList.map((item)=>{
      return item.tokenId
    })
    setLoading(true)
    const myAddress = await library.getSigner().getAddress()
    setPlayAddress(myAddress)
    const res=await getInfosApi(tokenIdList)
    if (res){
      const newList=logList.map((item, index)=>{
        return {
          ...item,
          equip: res[index]
        }
      })

      setLogInfoList(newList)

    }
    setLoading(false)
  }
  const renderLogInfoList= ()=>{


    return logInfoList.map((item, index)=>{
      //是v1的数据
      const isV1Data=!item.subTokenId||item.subTokenId.length<=0
      if (playAddress!==item.player||isV1Data) return ''
      return <div key={index} className="logRowItem">
        {/* 装备图片 */}
        <div className="equipBox">
          <div className="equipImg">  <EquipImg equip={item.equip} className='img' isShowDetail={false} /></div>
          <div className="equipAttr ">
            {/* 装备名称 */}
            <div>
              <span className="name">{language==='en-US'?item.equip.en:item.equip.name} <span className="subName">({item.equip.castLv}/{item.equip.forge})</span></span>
            </div>
            {/* 装备属性 */}
            <div>
              <div className="attrBox">
                {/* 伤害倍数 */}
                {
                  item.equip.dbrk+item.equip.rbrk>0&&<span className="attrItem">
                    {t('game.backpack.InjuryMultiple')}:<span className="numberColor ml-1 mr-5">{(item.equip.dbrk+item.equip.rbrk)}%</span>
                  </span>
                }
                {/* 物理伤害 */}
                {
                  item.equip.dmg>0&& <span className="attrItem">
                    {t('game.backpack.PhysicalAttack')}
                    <span className="numberColor ml-1 mr-5">{item.equip.dmg}</span>
                  </span>
                }
                {/* 魔法伤害 */}
                {
                  item.equip.mag>0&& <span className="attrItem">
                    {t('game.backpack.MagicAttack')}
                    <span className="numberColor ml-1 mr-5">{item.equip.mag}</span>
                  </span>
                }
                {/* 防御 */}
                {
                  item.equip.def>0&& <span className="attrItem">
                    {t('game.backpack.Defense')}
                    <span className="numberColor ml-1 mr-5">{item.equip.def}</span>
                  </span>
                }
                {/* 魔抗 */}
                {
                  item.equip.res>0&& <span className="attrItem">
                    {t('game.backpack.Resistance')}
                    <span className="numberColor ml-1 mr-5">{item.equip.res}</span>
                  </span>
                }
                {/* 生命值 */}
                {
                  item.equip.hp>0&& <span className="attrItem">
                    {t('game.backpack.HP')}
                    <span className="numberColor ml-1 mr-5">{item.equip.hp}</span>
                  </span>
                }

                {/* 力量 */}
                {
                  item.equip.str>0&& <span className="attrItem">
                    {t('game.strength_s')}
                    <span className="numberColor ml-1 mr-5">{item.equip.str}</span>
                  </span>
                }
                {/* 精神 */}
                {
                  item.equip.spt>0&& <span className="attrItem">
                    {t('game.mind_s')}
                    <span className="numberColor ml-1 mr-5">{item.equip.spt}</span>
                  </span>
                }
                {/* 敏捷 */}
                {
                  item.equip.agi>0&& <span className="attrItem">
                    {t('game.agility_s')}
                    <span className="numberColor ml-1 mr-5">{item.equip.agi}</span>
                  </span>
                }
                {/* 意志 */}
                {
                  item.equip.wil>0&& <span className="attrItem">
                    {t('game.will_s')}
                    <span className="numberColor ml-1 mr-5">{item.equip.wil}</span>
                  </span>
                }
                {/* 体质 */}
                {
                  item.equip.con>0&& <span>
                    {t('game.stamina_s')}
                    <span className="numberColor ml-1 mr-5">{item.equip.con}</span>
                  </span>
                }
                {/* 智力 */}
                {
                  item.equip.inte>0&& <span className="attrItem">
                    {t('game.intelligence_s')}
                    <span className="numberColor ml-1 mr-5">{item.equip.inte}</span>
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
        {/* 装备锻造等级 */}
        <div className="forgeLv line">
          <div className="title">{t('game.forge.forgingGrade')}</div>
          <div>{forgeLvTextArr[item.castType]}</div>
        </div>
        {/* 锻造时间 */}
        <div className="forgeTime line">
          <div className="title">{t('game.forge.forgingTime')}</div>
          <div>{moment(item.time).format('YYYY-MM-DD HH:mm:ss') }</div>
        </div>
        {/* 重试按钮 */}
        <div className="forgeBtnRow">
          {
            forgeType<item.castType? <div className="title">{t('game.forge.insufficientForgingGrade')}</div>: <Button
              width="144px"
              height="46px"
              bold
              className="es-button"
              // disabled={!isDisabled}
              onClick={async () => {
                //有效性验证,判断余额
                onForgingRetry(item)
              }}
            >
              {t('retry')}
            </Button>
          }

        </div>

      </div>

    })
  }
  return <LogPageStyle>

    <Spin spinning={loading}>
      <div className="messageInfo">
        <p>1.{t('game.forge.logInfo1')}</p>
        <p>2.{t('game.forge.logInfo2')}</p>
      </div>
      <div className="logBox">
        {
          renderLogInfoList()
        }
      </div>

    </Spin>

  </LogPageStyle>

}
export default LogPage
