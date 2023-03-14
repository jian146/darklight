
import NoviceImgMark from 'src/components/NoviceImgMark'
import { getQualityPic } from 'src/config'
import { HeroType, Occupations } from 'src/types/hero'

import defaultImg from 'src/assets/images/market/defult-img.png'
import { useTranslation } from 'react-i18next'
import { AlchemyHeroStyle } from './style'
import { subTokenId } from 'src/utils'
import HeroImg from 'src/components/Hero/HeroImg'

const AlchemyHero: React.FC<{ hero: HeroType| undefined}>=(props:{ hero: HeroType| undefined}) => {
  const {hero}=props

  const { t} = useTranslation()

  return <AlchemyHeroStyle >

    <div className="AlchemyHero relative ">
      <>
        {/* 新手卡标识 */}
        {hero?.newbie && (
          <NoviceImgMark
            className="mark "
            top={15}
            right={10}
            height={30}
          />
        )}
        <div className="flex attributeRow" >
          {/* 职业 */}
          {
            hero&& <span

              className="text-2xl Occupations font-bold ml-4"
            >
              {t(`home.${Occupations[hero.occupation]}`)}
            </span>
          }

          {/* 等级 */}
          <span className="ml-4 mr-3 font-bold text-base">
          LV.{hero?.level??''}
          </span>

          {/* 品质 */}
          {
            hero&& <img
              className=" w-8 h-8 qualityImg "
              src={getQualityPic(hero.total)?.[1]}
              alt=""
            />
          }

        </div>
        <div className="text-sm heroTokenId ml-4">
        TokenID：{hero&&subTokenId(hero?.tokenId, 12)}
        </div>
        {/* 英雄图片 */}
        <div className="flex items-center justify-center">
          <HeroImg
            className="self-center w-36 heroImg  scale-75 md:scale-110"
            occupation={hero?.occupation}
            src={!hero?defaultImg:undefined}
            style={{
              height: !hero?486:''
            }}
          />
        </div>
      </>

    </div>
  </AlchemyHeroStyle>

}

export default AlchemyHero
