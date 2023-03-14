import { AlchemyWrapper, HeroAttributes } from './style'
import React, { useEffect, useMemo, useState } from 'react'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import roleDecorator from 'src/assets/images/game/hero/role_decorator.png'
import tramsferImg from 'src/assets/images/liquidity/arrow.png'
import { useTranslation } from 'react-i18next'
import Button from 'src/components/Button'
import AlchemyHero from './components/alchemyHero'
import Radio from 'src/components/Radio'
import lock from 'src/assets/images/game/alchemy/lock.png'
import ChoseHero from './components/choseHero'
import { HeroType } from 'src/types/hero'
import { message, notification, Spin } from 'antd'
import { t_attribute, getAttrLevel } from 'src/utils/attributeSetting'
import { recast } from 'src/web3/hero'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { checkDlt, checkGold } from 'src/web3'
const Alchemy: React.FC = () => {
  //变更为固定3000
  const price = 3000
  const { library } = useWeb3React()
  const { t } = useTranslation()
  const [checkRadio, setCheckRadio] = useState('1')
  const [isShowChoseHero, setIsShowChoseHero] = useState(false)
  const [hero, setHero] = useState<HeroType>()
  const [newHero, setNewHero] = useState<HeroType>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsShowChoseHero(false)
  }, [])

  const onChoseHero = (hero: HeroType) => {
    setLoading(true)
    setNewHero(undefined)
    setHero(hero)
    setIsShowChoseHero(false)
    setLoading(false)
  }

  const renderPrice = useMemo(
    () => () => {
      //第一行为1级的费用,第二行为二级,3级为二级*2,4级为二级*2*2,从85开始,小于85按85计算 ,
      //dlt 价格是此价格基础上/6
      // const priceConfig = [
      //   [
      //     3000, 4500, 6000, 7500, 9000, 12000, 15000, 18000, 21000, 24000, 27000,
      //     30000, 33000, 36000, 39000, 42000
      //   ],
      //   [
      //     6000, 9000, 12000, 15000, 18000, 21000, 24000, 27000, 30000, 33000, 36000,
      //     39000, 42000, 45000, 48000, 51000
      //   ]
      // ]
      // //获取价格
      // const getPrice = () => {
      //   if (!hero) return 0
      //   const getMain = hero[attributesType[hero.occupation].main as t_attribute]
      //   const main = getMain < 85 ? 85 : getMain
      //   if (hero.level > 0 && hero.level < 3) {
      //     //第一行为1级的费用,第二行为二级,3级为二级*2,4级为二级*2*2,从85开始,小于85按85计算 ,
      //     //dlt 价格是此价格基础上/6
      //     return priceConfig[hero.level - 1][main - 85]
      //   } else {
      //     return priceConfig[1][main - 85] * (2 ** (hero.level - 2))
      //   }
      // }
      // const price = getPrice()
      //变更为固定3000
      // const price = 3000
      return (
        <div className="priceRow flex justify-between pt-4 pb-8 pl-24 pr-24">
          <Radio
            boxClassName="radioColor"
            size={25}
            lable={`${price} Gold`}
            value={checkRadio === '1'}
            onChange={(isCheck: boolean) => {
              setCheckRadio('1')
            }}
          />
          <Radio
            boxClassName="radioColor"
            size={25}
            lable={`${price / 6} DLT`}
            value={checkRadio === '2'}
            onChange={(isCheck: boolean) => {
              setCheckRadio('2')
            }}
          />
        </div>
      )
    },
    [checkRadio, hero]
  )

  //施法改变属性
  const onChangeAttr = (checkRadio:string) => {
    if (hero?.tokenId) {
      setLoading(true)
      recast(library, hero.tokenId, parseInt(checkRadio))
        .then((res) => {
          if (res.events) {
            for (const event of res.events) {
              if (event.event === 'Recast') {
                if (!event.args) return
                if (
                  Object.prototype.toString.call(event.args) ===
                  '[object Array]'
                ) {
                  const agility = (
                    event.args.agility as ethers.BigNumber
                  ).toNumber()
                  const intelligence = (
                    event.args.intelligence as ethers.BigNumber
                  ).toNumber()
                  const mind = (event.args.mind as ethers.BigNumber).toNumber()
                  const stamina = (
                    event.args.stamina as ethers.BigNumber
                  ).toNumber()
                  const strength = (
                    event.args.strength as ethers.BigNumber
                  ).toNumber()
                  const will = (event.args.will as ethers.BigNumber).toNumber()

                  const newHero = {
                    ...hero,
                    agility,
                    intelligence,
                    mind,
                    stamina,
                    strength,
                    will,
                    total:
                      agility + intelligence + mind + stamina + strength + will
                  }
                  setNewHero(newHero)
                }
              }
            }
          }
        })
        .catch((e) => {
          notification.error({
            message: 'error',
            description: e?.data?.message || 'error'
          })
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const renderShowAttrRows = (attr: string) => {
    const attrLeve = hero ? getAttrLevel(attr, hero) : 0
    return (
      <div className=" attItemRow">
        {renderOldAttr(attr, attrLeve)}
        {renderRecastAttr(attr, attrLeve)}
      </div>
    )
  }
  const renderOldAttr = (attr: string, attrLeve: number) => {
    return (
      <div className="attrItem">
        <span
          className={`${attrLeve && 'mianAttTextColor'} text-base baseColor`}
        >
          {t('game.' + attr)}
        </span>
        <span className={`${attrLeve && 'mianAttNumColor'} text-base leftItem`}>
          {hero && hero[attr as t_attribute]}
        </span>
        {attrLeve === 1 && <img src={lock} alt="" className="lockImg"></img>}
      </div>
    )
  }
  const TextRun: React.FC<{ text: number }> = (props: any) => {
    const text = (props.text < 10 ? `0${props.text}` : props.text + '').split(
      ''
    )

    const renderText = (textItem: string) => {
      const getRoundNumber = (x: number, y: number) => {
        return Math.round(Math.random() * (y - x) + x)
      }
      const arr = []
      arr.push(
        <span key={'textItem' + getRoundNumber(0, 99999)}>{textItem}</span>
      )
      for (let i = 0; i < 9; i++) {
        arr.push(<span key={i}>{getRoundNumber(0, 9) + ''}</span>)
      }

      return arr
    }

    return (
      <>
        {text.map((textItem, index) => {
          return (
            <span
              key={index}
              className="flexwrap textItem"
              style={{
                // overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: 20,
                animationDuration: 2.5 + index * 0.3 + 's'
              }}
            >
              {renderText(textItem)}
            </span>
          )
        })}
      </>
    )
  }
  const renderRecastAttr = (attr: string, attrLeve: number) => {
    return (
      <div className="attrItem">
        <span
          className={` ${attrLeve && 'mianAttTextColor'} text-base baseColor`}
        >
          {t(`game.${attr}`)}
        </span>
        <span
          className={`${newHero && 'starText'}
       ${attrLeve && 'mianAttNumColor'} text-base flex flex-nowrap`}
        >
          {attrLeve === 1 ? (
            hero && hero[attr as t_attribute]
          ) : newHero ? (
            <TextRun text={newHero[attr as t_attribute]} />
          ) : (
            '?'
          )}
        </span>
      </div>
    )
  }
  const renderRightAttr = useMemo(
    () => () => {
      return hero ? (
        <>
          {/* 总属性 */}
          <div className=" titleRow">
            <div className="titleItem">
              <span className="textTitleColor text-base">
                {t('game.alchemy.oldAttr')}
              </span>
              <span className="numberTitleColor text-base">{hero.total}</span>
            </div>
            <div className="titleItem">
              <span className="textTitleColor text-base">
                {t('game.alchemy.newAttr')}
              </span>
              <span
                className={`${
                  newHero && 'starText'
                } numberTitleColor text-base`}
              >
                {newHero?.total ?? '?'}
              </span>
            </div>
          </div>
          <div className="line"></div>
          {/* 基础属性 */}
          <div className="attrBox">
            {/* 转移按钮图片 */}
            <img alt="" className="tramsferImg " src={tramsferImg}></img>
            {/* 力量 */}
            {renderShowAttrRows('strength')}
            {/* 敏捷 */}
            {renderShowAttrRows('agility')}
            {/* 体质 */}
            {renderShowAttrRows('stamina')}
            {/* 意志 */}
            {renderShowAttrRows('will')}
            {/* 智力 */}
            {renderShowAttrRows('intelligence')}
            {/* 精神 */}
            {renderShowAttrRows('mind')}
          </div>
          {/* 提示部分 */}
          <div className="text-sm infoText">
            <p>{t('game.alchemy.info1')}</p>
            <p className="mt-1">{t('game.alchemy.info2')}</p>
            <p>{t('game.alchemy.info3')}</p>
          </div>

        </>
      ) : (
        <></>
      )
    },
    [newHero, hero]
  )
  return (
    <Spin spinning={loading}>
      <AlchemyWrapper>
        <div className="hero">
          <div style={{ marginTop: -3 }} className="title">
            {t('game.heros.hero')}
          </div>
          <div className="chose-hero">
            <div
              className="btn"
              onClick={() => {
                setIsShowChoseHero(true)
              }}
            >
              <img className="decor" src={roleDecorator} alt="" />
              <span>{t('game.backpack.selectHero')}</span>
            </div>
          </div>
          <div className="equipment relative">
            {/* 被选中英雄 */}
            <AlchemyHero hero={hero} />
            {/* 背景圆环 */}
            <img className="absolute absolute-center back-circular"
              src={require('src/assets/images/game/backpack/hero_d_bg.png')} alt="" />
            {/* 选择英雄框 */}
            {isShowChoseHero && (
              <ChoseHero
                setLoading={setLoading}
                setVisible={setIsShowChoseHero}
                onChoseHero={onChoseHero}
              />
            )}
          </div>
        </div>
        <div className="backpack">
          <div className="bp-title title">{t('game.heros.heroAttributes')}</div>
          <div className="tabs">
            {<HeroAttributes>
              {renderRightAttr()}
              {hero && <>
                {/* 确定按钮 */}
                <div className="flex justify-center">
                  <Button
                    width="157px"
                    height="48px"
                    img={btnRedBg}
                    bold
                    className="es-button"
                    onClick={ async () => {
                    //有效性验证,判断余额
                      if (checkRadio==='2'){
                        if (!await checkDlt(library, price/6)){
                          message.info(t('message.DLT_Insufficient'))
                          return
                        }
                      } else if (checkRadio==='1'){
                        if (!await checkGold(library, price)){
                          message.info(t('message.gold_Insufficient'))
                          return
                        }
                      }
                      onChangeAttr(checkRadio)
                    }}
                  >
                    {t('game.alchemy.castMagic')}
                  </Button>
                </div>
                {/* 渲染价格和付款方式 */}
                {
                  renderPrice()
                }
              </>}
            </HeroAttributes>}
          </div>
        </div>
      </AlchemyWrapper>
    </Spin>
  )
}

export default Alchemy
