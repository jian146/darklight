import { ModalProps, Spin } from 'antd'
import { cardFlipTime, DrawHeroModal } from './style'
import Button from '../Button'
import { useTranslation } from 'react-i18next'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import decoratorBg from 'src/assets/images/game/magic/decorator.png'
import luckDlt from 'src/assets/images/dialog/drawHero_dialog/luckDlt.png'
import luckHeroBg from 'src/assets/images/dialog/drawHero_dialog/luckly_heroBg.png'
import cardBg from 'src/assets/images/dialog/drawHero_dialog/cardBg.png'
import { getQualityPic, HeroImgList } from 'src/config'
import { HeroType, Occupations } from 'src/types/hero'
import NoviceImgMark from '../NoviceImgMark'
import { attributesType, t_attribute } from 'src/utils/attributeSetting'
type i_drawCard=() => void
export interface drawHeroDialogProps extends ModalProps {
  list?: HeroType[];
  luckyIndex:number;
  drawCardFn:i_drawCard
  id?:string;
}

const DrawHero: React.FC<drawHeroDialogProps> = ({
  list = [],
  luckyIndex=-1,
  id='',
  ...props
}) => {
  const { t, i18n: {language} } = useTranslation()

  // 没有显示，渲染空
  if (!props.visible) return <></>

  return (
    <DrawHeroModal
      width={1100}
      title={null}
      centered
      maskClosable={false}
      destroyOnClose
      closable={false}
      footer={null}
      getContainer={() => document.getElementById(id) || document.body}
      {...props}
    >

      <div className="heroContent  ">
        {list.map((hero: HeroType, index: number) => {
          return (
            <div key={index} className="faItem"
              style={{
                animationDelay: (index+1)*cardFlipTime+'s'
              }}>

              {/* 卡片背面 */}
              <img className="flex justify-between  mr-1 p-5 w-42 cardBack" src={cardBg} alt="未找到图片" />
              <div className="flex justify-between heroItem mr-1 p-5 w-42 "
                style={{
                  backgroundImage: luckyIndex===index?`url(${luckHeroBg})`:''
                }}
              >
                {/* 新手卡标识 */}
                {hero.newbie && (
                  <NoviceImgMark
                    className="mark "
                    top={15}
                    right={10}
                    height={30}
                  />
                )}
                {/* 抽中了dlt奖金池 */}
                {
                  luckyIndex===index&&<div className="flex justify-between  mr-1 p-5 w-42 cardBack luckImg zIndex-99">
                    <img alt="图片获取失败" src={luckDlt} />
                  </div>
                }

                {/* 背景图 */}
                <div className="bgBox">
                  <img alt="图片获取失败" src={decoratorBg} />
                </div>
                {/* 职业 */}
                <span
                  style={{ color: '#402d1a' }}
                  className="text-2xl Occupations"
                >
                  {t(`home.${Occupations[hero.occupation]}`)}
                </span>
                {/* 主副属性 */}
                <span
                  style={{ color: '#402d1a' }}
                  className="text-base mainAttrBox"
                >

                  {/* 主属性 */}
                  <span className='pr-1'>{t('game.heros.main')}<span >{hero[attributesType[hero.occupation].main as t_attribute]}</span></span>
                  {/* 副属性 */}
                  <span>{t('game.heros.sub')}<span >{hero[attributesType[hero.occupation].sub as t_attribute]}</span></span>


                </span>

                {/* 英雄图片 */}
                <img
                  className="self-center w-36 heroImg"
                  src={HeroImgList[hero.occupation]}
                  alt=""
                />
                <div className="hero-bottom">
                  <div className="flex justify-center">
                    {/* 全部 */}
                    <div
                      style={{ color: '#402D1A' }}
                      className="heroText heriTotal text-base font-bold"
                    >
                      {t('game.total')}:{ hero.total}
                    </div>
                  </div>
                  <div>
                    {/* 品质 */}
                    <div
                      style={{ color: '#402D1A' }}
                      className="heroText text-base font-bold flex justify-center items-center "
                    >
                      <img
                        className="mr-1 w-4 h-4 qualityImg "
                        src={getQualityPic(hero.total)?.[1]}
                        alt=""
                      />
                      {/* 英文状态下添加此样式,h5隐藏英文的品质 */}
                      <span className={ `${language==='en-US'?'qualityText':''}`}> {t(`game.card.${getQualityPic(hero.total)?.[0]}`)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="row mb-2 mt-6 justify-center flex ">
        {/*防止重复操作: 因为已经触发加载了,用spin的加载会有两层加载效果 */}
        {
          list.length>0&&<Spin spinning={false} size="small">
            <Button
              width="186px"
              height="46px"
              fontSize="18px"
              bold
              img={btnRedBg}
              onClick={props.onOk}
              className="btnLeftMargin btnGroupItem leftBtn"
            >
              {t('game.card.Receive')}
            </Button>
            <Button
              width="186px"
              height="46px"
              fontSize="18px"
              bold
              img={btnRedBg}
              onClick={props.drawCardFn}
              className="btnGroupItem rightBtn"
            >
              {t('game.card.Draw10Too')}
            </Button>
          </Spin>
        }

      </div>
    </DrawHeroModal>
  )
}

export default DrawHero
