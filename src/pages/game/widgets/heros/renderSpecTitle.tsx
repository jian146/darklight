import { useTranslation } from 'react-i18next'
import { HeroAttrList, HeroType } from 'src/types/hero'
import { getAttrLevel } from 'src/utils/attributeSetting'

interface RenderSpecTitleProps {
  type: keyof typeof HeroAttrList
  hero:HeroType
}

const RenderSpecTitle: React.FC<RenderSpecTitleProps> = ({ children, type, hero}) => {
  const { t } = useTranslation()
  if (hero === undefined) {
    return <>
      { children }
    </>
  }
  return (
    <>
      {children}
      {
        children === undefined ? (
          <i className="ml-1 not-italic text-B28465">
            {
              getAttrLevel(type, hero)===1?`(${t('game.heros.main')})`:getAttrLevel(type, hero)===2? `(${t('game.heros.sub')})`:''
            }
          </i>
        ) : (
          <i className="ml-1 not-italic text-valueColor">
            {
              getAttrLevel(type, hero)===1?`(${t('game.heros.main')})`:getAttrLevel(type, hero)===2? `(${t('game.heros.sub')})`:''
            }

          </i>
        )
      }
    </>
  )
}

export default RenderSpecTitle
