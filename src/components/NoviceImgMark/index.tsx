import noviceCard from 'src/assets/images/common/novice-card.png'
import noviceCardS from 'src/assets/images/common/novice-card-s.png'
import { useTranslation } from 'react-i18next'
import { CSSProperties } from 'react'
import {isOpenNovice} from 'src/config/switch'
type Props = {
  top: number | string
  right: number | string
  height: number | string
  className?: string,
  style?: CSSProperties,
  position?: 'absolute' | 'fixed' | 'static' | 'relative' | 'unset'
}

const NoviceImgMark: React.FC<Props> = ({ position = 'absolute', style, className, ...props }) => {

  const { i18n: {language} } = useTranslation()

  return isOpenNovice?<img
    className={className}
    style={{...props, position, ...style}}
    src={ language === 'zh-CN' ? noviceCard : noviceCardS }
    alt=""
  />:<></>
}

export default NoviceImgMark
