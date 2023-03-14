import { useEffect, useState } from 'react'
import Back from 'src/components/Back'
import Container from './style'
import buyHeroBg from 'src/assets/images/market/buy_hero_bg.png'
import Button from 'src/components/Button'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import btnDarkBg from 'src/assets/images/common/btn_dark.png'
import { Spin, notification, message } from 'antd'
import { useTranslation } from 'react-i18next'

import { ReactComponent as CopyIcon } from 'src/assets/images/game/hero/copy.svg'
import { copyToClipboard, isVoid, subTokenId } from 'src/utils'
import { useNavigate, useParams } from 'react-router'

import { useWeb3React } from '@web3-react/core'
import { queryAndApprove } from 'src/web3'
import { useUrlQueryParam } from 'src/utils/url'
import { BigNumber } from 'ethers'
import { SaleStateType } from '..'
import { ColdTimeDom, initEquip, I_Equip } from 'src/pages/game/widgets/backpack'
import { getEquipImg } from 'src/pages/game/widgets/backpack/equipUtils'
import { attributesType } from 'src/utils/attributeSetting'

import hurt1Img from 'src/assets/images/game/backpack/hurt1.png'
import magImg from 'src/assets/images/game/backpack/mag.png'
import dmgImg from 'src/assets/images/game/backpack/dmg.png'

import guardImg from 'src/assets/images/game/backpack/guard.png'
import lifeImg from 'src/assets/images/game/backpack/life.png'
import mageImg from 'src/assets/images/game/backpack/mage.png'
import strengthImg from 'src/assets/images/game/hero/strength.png'
import agilityImg from 'src/assets/images/game/hero/agility.png'
import staminaImg from 'src/assets/images/game/hero/stamina.png'
import willImg from 'src/assets/images/game/hero/will.png'
import intelligenceImg from 'src/assets/images/game/hero/intelligence.png'
import mindImg from 'src/assets/images/game/hero/mind.png'
import { attrList } from 'src/components/Dialog/equipmentDialog/equipmentDialog'
import Star from 'src/components/Star/star'
import { buyEquipAbi, stopSellEquipAbi } from 'src/web3/marketEquip'
import moment from 'moment'
import { getEquipmarketApi } from 'src/pages/api/market'
const BuyHero: React.FC = () => {


  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { library, account } = useWeb3React()
  const { t, i18n: {language}} = useTranslation()
  const [equip, setEquip]=useState<I_Equip>(initEquip)
  // const { hero, saleState }: { hero: HeroWithPriceType, saleState: SaleStateType } = location.state
  const { id } = useParams()


  const [onSell_Q] = useUrlQueryParam(['onSell'])
  // const [sellTime_q] = useUrlQueryParam(['sellTime'])??''
  const [saleState_Q, setParams] = useUrlQueryParam(['saleState'])

  const sellNo=BigNumber.from(id)
  // const sellTime=parseInt(sellTime_q.sellTime)??0
  const onSell=onSell_Q.onSell==='true'
  const saleState=saleState_Q.saleState==='undefined'||!saleState_Q?undefined:saleState_Q.saleState as SaleStateType
  const [isBuy, setIsBuy]=useState(false)
  const [sellTime, setSellTime]=useState(0)
  const [price, setPrice]=useState('0')
  useEffect(() => {

    getEquipmarket()
  }, [account, library])


  const getEquipmarket=async()=>{
    setLoading(true)
    const res=await getEquipmarketApi(sellNo.toNumber())
    if (res){
      setEquip(res.equip)
      setSellTime(res.soldTime)
      setPrice(res.price)
    } else {
      notification.error({
        message: 'Error',
        description: 'server error !'
      })
    }
    setLoading(false)
  }
  const buyEquip = async () => {
    if (account) {
      setLoading(true)
      try {
        const dltIsPass = await queryAndApprove(
          library,
          account,
          'marketEquip',
          'dlt'
        )
        if (!dltIsPass) {
          //授权失败
          message.warn(t('message.privilegeGrantFailed'))
          return
        }
        await buyEquipAbi(library, (sellNo))
        setParams({saleState: 'buy'})
        setIsBuy(true)
        message.success(t('success'))
        setTimeout(() => {
          navigate('/market?marketType=equip')
        }, 2000)
      } catch (e: any) {
        notification.error({
          message: 'Error',
          description: e?.data?.message
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const cancel = async () => {
    setLoading(true)
    stopSellEquipAbi(library, sellNo).then(() => {
      message.success(t('success'))
      setTimeout(() => {
        navigate('/market?marketType=equip')
      }, 2000)
    }).catch(e => {
      notification.error({
        message: 'Error',
        description: e?.message
      })
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getClassNameByAttr=(attr:string, type='text')=>{
    if (type==='text'){
      return equip.canForgeAttrs&&equip.canForgeAttrs.indexOf(attr)>=0?'addColor':''
    } else {

      const addValue=equip.casts&&equip.casts[attrList.indexOf(attr)]
      return addValue>0?'addColor':''
    }


  }
  return (
    <Container>
      <Back backCall={()=>{ navigate('/market?marketType=equip') }} />
      <Spin spinning={loading}>

        <div className="flex md:mt-20 mt-5 justify-center flex-wrap">
          <div className="left md:mr-44 w-full md:w-440px">
            <div className="bg relative">
              <ColdTimeDom equip={equip} />
              <img src={buyHeroBg} alt="" />

              {/* 图片 */}
              <img className="equip-img" src={ equip?getEquipImg(equip.name):''} alt="" />
              <div className="absolute left-0 pl-5 pr-5 top-12 w-full" >
                <div className="titleRow font-bold">
                  <span className="name">{language==='en-US'?equip.en:equip.name} <span className="subName">({equip.castLv}/{equip.forge})</span></span>
                  <span className="relative z-50 tokenId">
                    <span >{t('market.nAddr')}：{ subTokenId(equip?.tokenId, 5)}</span>
                    <CopyIcon
                      width="16"
                      height="16"
                      fill="#664F42"
                      style={{ marginLeft: '10px', cursor: 'pointer' }}
                      onClick={(e) => copyToClipboard(equip?.tokenId, e)}
                    />
                  </span>
                </div>
                <div> <Star count={equip.rarity} className="starBox" /></div>
              </div>
            </div>
          </div>
          <div className="right w-full md:w-492px mt-6 md:mt-0">
            <div className="text-center">
              <span className="price text-2xl relative text-664F42">
                {t('market.price')}：
                <span className="text-valueColor">{price} DLT</span>
              </span>
            </div>
            <div className="text-center my-10">
              {
                // 从市场哪里过来的
                isVoid(saleState) && <>
                  <Button
                    width="184px"
                    fontSize="20px"
                    bold
                    disabled={!onSell}
                    height="46px"
                    onClick={onSell ? buyEquip : undefined}
                    img={onSell ? btnRedBg : btnDarkBg}
                  >
                    { onSell||!isBuy ? t('market.BuyNow') : t('market.sold') }
                  </Button>
                </>
              }
              {
                // 从我的售卖哪里过来
                saleState === 'sale'&&sellTime===0 && <>
                  <Button
                    width="184px"
                    fontSize="20px"
                    bold
                    disabled={!onSell}
                    height="46px"
                    onClick={onSell ? cancel : undefined}
                    img={onSell ? btnRedBg : btnDarkBg}
                  >
                    { onSell ? t('market.cancel') : t('market.sold') }
                  </Button>


                </>
              }
              {
                // 从我的售卖哪里过来
                <>
                  {
                    sellTime>0&& <div className="saleTime">
                      {t('market.saleTime')}:{moment.unix(sellTime).format('YYYY-MM-DD HH:mm')}

                    </div>
                  }

                  {/* <Button
                    width="184px"
                    fontSize="20px"
                    bold
                    disabled
                    height="46px"
                    img={btnDarkBg}
                  >
                    { t('market.purchased') }
                  </Button> */}
                </>
              }
            </div>
            <div className="attrBox">
              {/* 穿戴要求 */}
              <div className="infoRow">
                <div className="infoRowItem">
                  <div className="label">{t('game.backpack.RoleRequiRements')}</div>
                  <div>
                    {
                      equip.class.map((item, index)=>{
                        return <span key={index} className="classItem">
                          { item>=0&&item<=3? t(`home.${attributesType[item].name}`):'-'}
                        </span>
                      })
                    }
                  </div>
                </div>
                <div className="infoRowItem">
                  <div className="label">{t('game.backpack.AttributeRequirements')}</div>
                  <div className="classItem">-</div>
                </div>
                <div className="infoRowItem">
                  <div className="label">{t('game.backpack.GradeRequirements')}</div>
                  <div className="classItem">LV.{equip.lv}</div>
                </div>
                <div className="infoRowItem">
                  <div className="label">{t('game.backpack.Weight')}</div>
                  <div className="classItem">0KG</div>
                </div>
              </div>

              {/* 属性信息 */}
              <div className="attrRow">
                <div className="attr-top">
                  <div className="at-item">
                    <img src={hurt1Img} alt="" />
                    <div className="text">
                      <span >{t('game.backpack.InjuryMultiple')}</span>
                      <span className="num" >{equip.dbrk+equip.rbrk===0?0:((equip.dbrk+equip.rbrk)+'%')}</span>
                    </div>
                  </div>
                  <div className="at-item">
                    <img src={dmgImg} alt="" />
                    <div className="text">
                      <span className={`${getClassNameByAttr('dmg')}`}>{t('game.backpack.PhysicalAttack')}</span>
                      <span className={`num ${getClassNameByAttr('dmg', 'number')}`}>{equip.dmg}</span>
                    </div>
                  </div>
                  <div className="at-item">
                    <img src={magImg} alt="" />
                    <div className="text">
                      <span className={`${getClassNameByAttr('mag')}`}>{t('game.backpack.MagicAttack')}</span>
                      <span className={`num ${getClassNameByAttr('mag', 'number')}`}>{equip.mag}</span>
                    </div>
                  </div>
                  <div className="at-item">
                    <img src={guardImg} alt="" />
                    <div className="text">
                      <span className={`${getClassNameByAttr('def')}`}>{t('game.backpack.Defense')}</span>
                      <span className={`num ${getClassNameByAttr('def', 'number')}`}>{equip.def}</span>
                    </div>
                  </div>
                  <div className="at-item">
                    <img src={mageImg} alt="" />
                    <div className="text">
                      <span className={`${getClassNameByAttr('res')}`}>{t('game.backpack.Resistance')}</span>
                      <span className={`num  ${getClassNameByAttr('res', 'number')}`}>{equip.res}</span>
                    </div>
                  </div>
                  <div className="at-item">
                    <img src={lifeImg} alt="" />
                    <div className="text">
                      <span className={`${getClassNameByAttr('hp')}`}>{t('game.backpack.HP')}</span>
                      <span className={`num ${getClassNameByAttr('hp', 'number')}`}>{equip.hp}</span>
                    </div>
                  </div>

                </div>

                <div className="attr-bottom">
                  <div className="at-item">
                    <img src={strengthImg} alt="" />
                    <div className="text">
                      <span className={`${getClassNameByAttr('str')}`}>{t('game.strength_s')}</span>
                      <span className={`num ${getClassNameByAttr('str', 'number')}`}>{equip.str}</span>
                    </div>
                  </div>
                  <div className="at-item">
                    <img src={mindImg} alt="" />
                    <div className="text">
                      <span className={`${getClassNameByAttr('spt')}`}>{t('game.mind_s')}</span>
                      <span className={`num ${getClassNameByAttr('spt', 'number')}`}>{equip.spt}</span>
                    </div>
                  </div>
                  <div className="at-item">
                    <img src={agilityImg} alt="" />
                    <div className="text">
                      <span className={`${getClassNameByAttr('agi')}`}>{t('game.agility_s')}</span>
                      <span className={`num ${getClassNameByAttr('agi', 'number')}`}>{equip.agi}</span>
                    </div>
                  </div>
                  <div className="at-item">
                    <img src={willImg} alt="" />
                    <div className="text">
                      <span className={`${getClassNameByAttr('wil')}`}>{t('game.will_s')}</span>
                      <span className={`num ${getClassNameByAttr('wil', 'number')}`}>{equip.wil}</span>
                    </div>
                  </div>
                  <div className="at-item">
                    <img src={staminaImg} alt="" />
                    <div className="text">
                      <span className={`${getClassNameByAttr('con')}`}>{t('game.stamina_s')}</span>
                      <span className={`num ${getClassNameByAttr('con', 'number')}`}>{equip.con}</span>
                    </div>
                  </div>
                  <div className="at-item">
                    <img src={intelligenceImg} alt="" />
                    <div className="text">
                      <span className={`${getClassNameByAttr('inte')}`}>{t('game.intelligence_s')}</span>
                      <span className={`num ${getClassNameByAttr('inte', 'number')}`}>{equip.inte}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </Spin>
    </Container>
  )
}

export default BuyHero
