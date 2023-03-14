import { HeroImgList } from 'src/config'
import { HeroWithPriceTypeWithMarket, Occupations } from 'src/types/hero'
import { OneItemWrapper } from './style'
import { useTranslation } from 'react-i18next'
import NoviceImgMark from 'src/components/NoviceImgMark'
import { getIsQualifiedHero } from 'src/utils/attributeSetting'
import marketHeroBgS from 'src/assets/images/market/heroBg-s.png'
interface HeroItemOneProps {
  onClick?: (hero: HeroWithPriceTypeWithMarket) => void
  hero: HeroWithPriceTypeWithMarket
}

const HeroItemOne: React.FC<HeroItemOneProps> = ({ onClick, hero }) => {

  const { t } = useTranslation()
  const isQualifiedHero=getIsQualifiedHero(hero)
  return (
    <OneItemWrapper
      className="cursor-pointer mb-3 md:mr-3 relative"
      onClick={() => onClick?.(hero)}
      style={{
        backgroundImage: isQualifiedHero?`url(${marketHeroBgS})`:''
      }}
    >
      <div className=" w-full flex justify-center">
        <img className="hero-img" src={HeroImgList[hero.occupation]} alt="" />
      </div>
      <div className="px-4 attr font-bold overflow-hidden">
        <div className="top mt-3 flex justify-between items-baseline">
          <span className="text-secondary text-base">
            { t(`home.${Occupations[hero.occupation]}`) }
            <span className="text-primary"> / LV.{hero.level}</span>
          </span>
          <span className="text-secondary text-sm">{hero.price} DLT</span>
        </div>
        <div className="flex mt-2 justify-between items-baseline">
          <span className="text-primary text-sm">
            {t('game.total')}
            <span className="text-secondary"> {hero.total}</span>
          </span>
          <span className="text-primary text-sm">
            {t('game.FatigueValue')}
            <span className="text-valueColor"> {hero.fatigue}</span>
          </span>
        </div>
        <div className="flex mt-2 justify-between items-baseline">
          <span className="text-primary text-sm">
            { t('game.sStrength') }
            <span className="text-secondary"> {hero.strength}</span>
          </span>
          <span className="text-primary">/</span>
          <span className="text-primary text-sm">
            { t('game.sStamina') }
            <span className="text-secondary"> {hero.stamina}</span>
          </span>
          <span className="text-primary">/</span>
          <span className="text-primary text-sm">
            { t('game.sAgility') }
            <span className="text-secondary"> {hero.agility}</span>
          </span>
          <span className="text-primary">/</span>
          <span className="text-primary text-sm">
            { t('game.sWill') }
            <span className="text-secondary"> {hero.will}</span>
          </span>
          <span className="text-primary">/</span>
          <span className="text-primary text-sm">
            { t('game.sIntelligence') }
            <span className="text-secondary"> {hero.intelligence}</span>
          </span>
          <span className="text-primary">/</span>
          <span className="text-primary text-sm">
            { t('game.sMind') }
            <span className="text-secondary"> {hero.mind}</span>
          </span>

        </div>
      </div>
      {hero.newbie && (
        <NoviceImgMark
          className="mark"
          top={15}
          right={10}
          height={35}
        />
      )}
    </OneItemWrapper>
  )
}

export default HeroItemOne
