import { TwoItemWrapper } from './style'
import { HeroImgList } from 'src/config'
import { HeroWithPriceTypeWithMarket, Occupations } from 'src/types/hero'
import { useTranslation } from 'react-i18next'
import NoviceImgMark from 'src/components/NoviceImgMark'

type Props = {
  onClick?: (hero: HeroWithPriceTypeWithMarket) => void
  hero: HeroWithPriceTypeWithMarket
}

const HeroItemTwo: React.FC<Props> = ({ children, hero, onClick }) => {

  const { t } = useTranslation()

  return (
    <TwoItemWrapper className="mb-3 md:mr-3 relative">
      <div className="flex flex-col h-full justify-between px-2 py-8">
        <div
          className="flex justify-evenly md:justify-between"
          onClick={() => onClick?.(hero)}
        >
          {hero.newbie && (
            <NoviceImgMark
              className="mark"
              top={15}
              right={10}
              height={30}
            />
          )}
          <div>
            <img className="hero-img ml-3 -mt-3" src={HeroImgList[hero.occupation]} alt="" />
          </div>
          <div>
            <p className="text-secondary text-2xl md:text-lg mb-2">
              { t(`home.${Occupations[hero.occupation]}`) }
              <span className="text-primary text-lg">/ LV.{hero.level}</span>
            </p>
            <p
              className="text-primary text-base md:text-sm underline
                            cursor-pointer overflow-hidden overflow-ellipsis
                            whitespace-nowrap max-w-140px"
            >
              { `${t('game.sStrength')} ${hero?.strength} / ${t('game.sAgility')} ${hero?.agility} / ${t('game.sStamina')} ${hero?.stamina} / ${t('game.sWill')} ${hero?.will} / ${t('game.sIntelligence')} ${hero?.intelligence} / ${t('game.sMind')} ${hero?.mind}` }
            </p>
            <p className="text-primary text-lg md:text-sm mt-2">
              {t('game.total')}: <span className="text-secondary">{hero.total}</span>
            </p>
            <p className="text-primary text-lg md:text-sm mt-2">
              {t('game.FatigueValue')}: <span className="text-secondary">{hero.fatigue}</span>
            </p>
          </div>
        </div>
        <div className="text-center text-2xl md:text-lg text-secondary">
          {t('market.price')}: <span className="text-thirdly">{hero.price} DLT</span>
        </div>
        <div className="text-center">
          { children }
        </div>
      </div>
    </TwoItemWrapper>
  )
}

export default HeroItemTwo
