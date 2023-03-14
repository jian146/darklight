import hurt1Img from 'src/assets/images/game/backpack/hurt1.png'
import guardImg from 'src/assets/images/game/backpack/guard.png'
import magImg from 'src/assets/images/game/backpack/mag.png'
import dmgImg from 'src/assets/images/game/backpack/dmg.png'
import mageImg from 'src/assets/images/game/backpack/mage.png'
import lifeImg from 'src/assets/images/game/backpack/life.png'
import { useTranslation } from 'react-i18next'
import marketHeroBgS from 'src/assets/images/market/heroBg-s.png'
import { EquipmentCardStyle } from './style'
import Star from 'src/components/Star/star'
import { getEquipImg } from 'src/pages/game/widgets/backpack/equipUtils'
import { I_Equip_market, SaleStateType } from '..'
import Button from 'src/components/Button'
import { notification, Spin, message } from 'antd'
import { stopSellEquipAbi } from 'src/web3/marketEquip'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { BigNumber } from 'ethers'
import herodbg from 'src/assets/images/game/backpack/hero_d_bg.png'
interface I_EquipmentCard{
    onClick:(equip:I_Equip_market)=>void
    marketEquip:I_Equip_market
    saleState:SaleStateType
    marketType:string
    //p|s   saleState=='sale' 已发布:已销售   saleState===undefined出售中:已结束
    onLoad:()=>void
}

const EquipmentCard=(props:I_EquipmentCard)=>{
  const { marketEquip, onClick, saleState, onLoad, marketType}=props
  const {equip}=marketEquip
  const { t, i18n: {language}} = useTranslation()
  const isQualifiedHero=false
  const { library } = useWeb3React()
  const [loading, setLoading]=useState(false)

  const cancel = async () => {
    setLoading(true)
    stopSellEquipAbi(library, BigNumber.from(marketEquip.sellNo) ).then(() => {
      message.success(t('success'))

    }).catch(e => {
      notification.error({
        message: 'Error',
        description: e?.message
      })
    }).finally(() => { setLoading(true);onLoad() })
  }

  return (
    <Spin spinning={loading}>
      <EquipmentCardStyle

        className="cursor-pointer mb-3 md:mr-3 relative"
        onClick={() => onClick?.(marketEquip)}
        style={{
          backgroundImage: isQualifiedHero?`url(${marketHeroBgS})`:'',
          filter: marketEquip.equip.destory?'grayscale(100%)':'',
          cursor: marketEquip.equip.destory?'not-allowed':''
        }}
      >
        <div className=" w-full flex justify-center  items-center imgBox">
          <img className="bgImg" src={herodbg} alt="" />
          <img className="equip-img" src={ equip?getEquipImg(equip.name):''} alt="" />
        </div>
        <div className="px-4 attr font-bold overflow-hidden desBox">
          <div className="starRow"><Star count={equip.rarity} />  <span className="price">{marketEquip.price} DLT</span></div>
          <div className="top mt-1 mb-1 flex justify-between items-baseline">
            <span className="equipname">
              { language==='en-US'?equip.en:equip.name}(+{equip.castLv+'/'+equip.forge})
            </span>

          </div>
          <div className="hurtRow">
            {/* 物理倍数和法伤倍数 */}
            {equip.dbrk+equip.rbrk>100&&
          <div className="at-item">
            <img src={hurt1Img} alt="" />
            <div className="text">
              <span className="label">{t('game.backpack.InjuryMultiple_s')}:</span>
              <span className="num">{equip.dbrk+equip.rbrk}%</span>
            </div>
          </div>
            }
            {/* 物理伤害 */}
            {
              equip.dmg>0&& <div className="at-item">
                <img src={dmgImg} alt="" />
                <div className="text">
                  <span className="label">{t('game.backpack.PhysicalAttack')}:</span>
                  <span className="num">{equip.dmg}</span>
                </div>
              </div>
            }

            {/* 魔法伤害 */}
            {equip.mag>0&& <div className="at-item">
              <img src={magImg} alt="" />
              <div className="text">
                <span className="label">{t('game.backpack.MagicAttack')}:</span>
                <span className="num">{equip.mag}</span>
              </div>
            </div>
            }

            {/* 护甲 */}
            {equip.def>0&& <div className="at-item">
              <img src={guardImg} alt="" />
              <div className="text">
                <span className="label">{t('game.backpack.Defense')}:</span>
                <span className="num">{equip.def}</span>
              </div>
            </div>
            }
            {/* 魔抗 */}
            {equip.res>0&& <div className="at-item">
              <img src={mageImg} alt="" />
              <div className="text">
                <span className="label"> {t('game.backpack.Resistance')}:</span>
                <span className="num">{equip.res}</span>
              </div>
            </div>
            }
            {/* 生命 */}
            {equip.hp>0&& <div className="at-item">
              <img src={lifeImg} alt="" />
              <div className="text">
                <span className="label"> {t('game.backpack.HP')}:</span>
                <span className="num">{equip.hp}</span>
              </div>
            </div>
            }

          </div>
          <div className="flex mt-1 justify-between items-baseline">
            <span className="text-primary text-sm">
              { t('game.sStrength') }
              <span className="text-secondary"> {equip.str}</span>
            </span>
            <span className="text-primary">/</span>
            <span className="text-primary text-sm">
              { t('game.sStamina') }
              <span className="text-secondary"> {equip.con}</span>
            </span>
            <span className="text-primary">/</span>
            <span className="text-primary text-sm">
              { t('game.sAgility') }
              <span className="text-secondary"> {equip.agi}</span>
            </span>
            <span className="text-primary">/</span>
            <span className="text-primary text-sm">
              { t('game.sWill') }
              <span className="text-secondary"> {equip.wil}</span>
            </span>
            <span className="text-primary">/</span>
            <span className="text-primary text-sm">
              { t('game.sIntelligence') }
              <span className="text-secondary"> {equip.inte}</span>
            </span>
            <span className="text-primary">/</span>
            <span className="text-primary text-sm">
              { t('game.sMind') }
              <span className="text-secondary"> {equip.spt}</span>
            </span>

          </div>
        </div>
        {
          saleState&& <div className="btnRow">
            {
              saleState==='sale'&&marketType!=='s'&&<Button
                width="184px"
                fontSize="20px"
                bold

                height="46px"
                onClick={(e)=>{ e.stopPropagation(); cancel() }}
                // img={btnRedBg }
              >
                { t('market.cancel')}
              </Button>
            }

          </div>
        }

      </EquipmentCardStyle>
    </Spin>

  )
}

export default EquipmentCard
