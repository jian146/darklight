import styled from '@emotion/styled'
import { bigHeroImgList } from 'src/config'
interface I_HeroImg{
    occupation?:number
    style?:any
    className?:string
    src?:string
    boxClassName?:string
    boxStyle?:any
}
const HeroImgCss = styled.div`
    z-index:10;
    img{
        height:488px;
        z-index:10 !important;
    }

`
const HeroImg=(props:I_HeroImg) =>{
  const {occupation, className, style, src, boxClassName, boxStyle}=props
  return <HeroImgCss
    className={boxClassName}
    style={{
      ...boxStyle
    }}
  > {occupation!== undefined&& <img
      style={{
        ...style
      }}
      className={`${className}`}
      src={
        src?src: bigHeroImgList[occupation]

      }
      draggable="false"
      alt=""
    />}
  </HeroImgCss>
}
export default HeroImg
