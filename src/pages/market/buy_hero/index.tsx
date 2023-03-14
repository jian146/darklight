import { useEffect, useState } from 'react'
import Back from 'src/components/Back'
import Container from './style'
import buyHeroBg from 'src/assets/images/market/buy_hero_bg.png'
import Button from 'src/components/Button'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import btnDarkBg from 'src/assets/images/common/btn_dark.png'
import { Progress, Spin, notification, message } from 'antd'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'
import RenderSpecTitle from 'src/pages/game/widgets/heros/renderSpecTitle'
import { Occupations, pve_heroType } from 'src/types/hero'
import strengthImg from 'src/assets/images/game/hero/strength.png'
import agilityImg from 'src/assets/images/game/hero/agility.png'
import staminaImg from 'src/assets/images/game/hero/stamina.png'
import willImg from 'src/assets/images/game/hero/will.png'
import intelligenceImg from 'src/assets/images/game/hero/intelligence.png'
import mindImg from 'src/assets/images/game/hero/mind.png'
import { ReactComponent as CopyIcon } from 'src/assets/images/game/hero/copy.svg'
import { copyToClipboard, isVoid, subTokenId } from 'src/utils'
import { useNavigate, useParams } from 'react-router'
import { buy, stopSale } from 'src/web3/market'
import { useWeb3React } from '@web3-react/core'

import { useGetState } from 'ahooks'
import { approveDLT, queryApproveDLT } from 'src/web3'
import NoviceImgMark from 'src/components/NoviceImgMark'
import { getAttrLevel } from 'src/utils/attributeSetting'
import HeroImg from 'src/components/Hero/HeroImg'
import { getHeroByTokenId } from 'src/web3/hero'
import { useUrlQueryParam } from 'src/utils/url'
import { BigNumber, ethers } from 'ethers'
import { SaleStateType } from '..'
import { getHeromarketApi } from 'src/pages/api/market'

const BuyHero: React.FC = () => {


  const initHero:pve_heroType={
    agility: 0,
    fatigue: 0,
    intelligence: 0,
    level: 0,
    mind: 0,
    newbie: false,
    occupation: 0,
    pveCount: -1,
    stamina: 0,
    strength: 0,
    tokenId: '000000000000000000000000000000000000000000000000000000000000000000',
    total: 0,
    will: 0
  }
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [, setDltApprove, getState] = useGetState<boolean>(false)
  const { library, account } = useWeb3React()
  const { t } = useTranslation()
  const [hero, setHero]=useState<pve_heroType>(initHero)
  // const { hero, saleState }: { hero: HeroWithPriceType, saleState: SaleStateType } = location.state
  const { id } = useParams()

  const [sellNo_Q] = useUrlQueryParam(['sellNo'])
  const [onSell_Q] = useUrlQueryParam(['onSell'])
  const [saleState_Q, setParams] = useUrlQueryParam(['saleState'])

  const sellNo=BigNumber.from(sellNo_Q.sellNo)
  const onSell=onSell_Q.onSell==='true'
  const saleState=saleState_Q.saleState==='undefined'||!saleState_Q?undefined:saleState_Q.saleState as SaleStateType
  const [isBuy, setIsBuy]=useState(false)
  const [price, setPrice]=useState('0')
  useEffect(() => {

    // 先查询是否授权dlt
    if (account) {
      queryApproveDLT(library, account, 'market').then(res => {
        if (res.lte(ethers.utils.parseEther('1'))) {
          setDltApprove(false)
        } else setDltApprove(true)
      }).catch(() => setDltApprove(false))
    }

  }, [account, library])
  useEffect(() => {
    getHero()
    getEquipmarket()
  }, [id, account, library])

  const getEquipmarket=async()=>{
    setLoading(true)
    const res=await getHeromarketApi(sellNo.toNumber())
    if (res){

      setPrice( ethers.utils.formatEther(res.price))
    } else {
      notification.error({
        message: 'Error',
        description: 'server error !'
      })
    }
    setLoading(false)
  }
  const getHero=async() =>{
    setLoading(true)
    if (!id){
      message.error('error')
      return
    }
    getHeroByTokenId(library, id as string, true)
      .then((res) => {
        setHero(res)
        setLoading(false)
      }).catch(()=>{
        setLoading(false)
      })

  }
  /**
   * 授权dlt
   */
  const authorizeDlt = async () => {
    setDltApprove(false)
    if (account) {
      const tx = await approveDLT(library, 'market')
      await tx.wait()
      setDltApprove(true)
    }
  }

  const buyHero = async () => {
    if (account) {
      setLoading(true)
      try {
        if (getState()) {
          // 已授权 dlt
          await buy(library, (sellNo))
          message.success(t('success'))
          setTimeout(() => {
            navigate(-1)
          }, 2000)
        } else {
          // 授权dlt
          await authorizeDlt()
          buyHero()
          setParams({saleState: 'buy'})
          setIsBuy(true)
        }
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
    stopSale(library, sellNo).then(() => {
      message.success(t('success'))
      setTimeout(() => {
        navigate(-1)
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

  return (
    <Container>
      <Back backCall={()=>{ navigate('/market') }} />
      <Spin spinning={loading}>

        <div className="flex md:mt-20 mt-5 justify-center flex-wrap">
          <div className="left md:mr-44 w-full md:w-440px">
            <div className="bg relative">
              <img src={buyHeroBg} alt="" />
              {hero?.newbie && (
                <NoviceImgMark
                  className="mark"
                  top={15}
                  right={10}
                  height={45}
                />
              )}
              <HeroImg className="absolute top-1/2 left-1/2 mt-8 transform
                        -translate-x-1/2 -translate-y-1/2 scale-75 md:scale-110" occupation={hero.occupation} />

              <div className="absolute left-5 top-12">
                <p className="text-primary text-22px font-bold">
                  { t(`home.${Occupations[hero.occupation]}`) } LV.{hero.level}
                  <span className="text-lg ml-5 font-normal">
                    {t('game.FatigueValue')} <span className="text-valueColor">{hero.fatigue}</span>
                  </span>
                  <span className="text-lg ml-5 font-normal">
                    {t('game.adventure.Times')} <span className="text-valueColor">{hero.pveCount>0?hero.pveCount:0}</span>
                  </span>
                </p>
                <p className="relative z-50">
                  <span className="text-lg text-664F42">{t('market.nAddr')}：{ subTokenId(hero?.tokenId, 5)}</span>
                  <CopyIcon
                    width="16"
                    height="16"
                    fill="#664F42"
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                    onClick={(e) => copyToClipboard(hero?.tokenId, e)}
                  />
                </p>
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
                    onClick={onSell ? buyHero : undefined}
                    img={onSell ? btnRedBg : btnDarkBg}
                  >
                    { onSell||!isBuy ? t('market.BuyNow') : t('market.sold') }
                  </Button>
                </>
              }
              {
                // 从我的售卖哪里过来
                saleState === 'sale' && <>
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
                saleState === 'buy' && <>
                  <Button
                    width="184px"
                    fontSize="20px"
                    bold
                    disabled
                    height="46px"
                    img={btnDarkBg}
                  >
                    { t('market.purchased') }
                  </Button>
                </>
              }
            </div>
            <div className="bottom-attr">
              <div className="title-box">
                <span className="title">
                  {t('game.heros.attributes')}
                </span>
                <span className="total">
                  {t('game.total')}
                  :{hero.total}</span>
              </div>
              <div className="attr-list">
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={strengthImg} draggable="false" alt="" />
                      <RenderSpecTitle
                        type="strength"
                        hero={hero}
                      >
                        {t('game.strength')}
                      </RenderSpecTitle>
                    </div>
                    <div className={
                      classnames('i-val', {
                        'primary': getAttrLevel('strength', hero )
                      })
                    }>{hero.strength}</div>
                  </div>
                  <Progress percent={hero.strength} showInfo={false} />
                </div>
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={agilityImg} draggable="false" alt="" />
                      <RenderSpecTitle
                        type="agility"
                        hero={hero}
                      >
                        {t('game.agility')}
                      </RenderSpecTitle>
                    </div>
                    <div className={
                      classnames('i-val', {
                        'primary': getAttrLevel('agility', hero )
                      })
                    }>{hero.agility}</div>
                  </div>
                  <Progress percent={hero.agility} showInfo={false} />
                </div>
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={staminaImg} draggable="false" alt="" />
                      <RenderSpecTitle
                        type="stamina"
                        hero={hero}
                      >
                        {t('game.stamina')}
                      </RenderSpecTitle>
                    </div>
                    <div className={
                      classnames('i-val', {
                        'primary': getAttrLevel('stamina', hero )
                      })
                    }>{hero.stamina}</div>
                  </div>
                  <Progress percent={hero.stamina} showInfo={false} />
                </div>
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={willImg} draggable="false" alt="" />
                      <span>{t('game.will')}</span>
                    </div>
                    <div className="i-val">{hero.will}</div>
                  </div>
                  <Progress percent={hero.will} showInfo={false} />
                </div>
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={intelligenceImg} draggable="false" alt="" />
                      <RenderSpecTitle
                        type="intelligence"
                        hero={hero}
                      >
                        {t('game.intelligence')}
                      </RenderSpecTitle>
                    </div>
                    <div className={
                      classnames('i-val', {
                        'primary': getAttrLevel('intelligence', hero )
                      })
                    }>{hero.intelligence}</div>
                  </div>
                  <Progress percent={hero.intelligence} showInfo={false} />
                </div>
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={mindImg} draggable="false" alt="" />
                      <RenderSpecTitle
                        type="mind"
                        hero={hero}
                      >
                        {t('game.mind')}
                      </RenderSpecTitle>
                    </div>
                    <div className={
                      classnames('i-val', {
                        'primary': getAttrLevel('mind', hero )
                      })
                    }>{hero?.mind}</div>
                  </div>
                  <Progress percent={hero?.mind} showInfo={false} />
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
