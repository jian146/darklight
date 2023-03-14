import { PriceImgStyle } from './style'
import dltImg from 'src/assets/images/common/DLT.png'
import goldImg from 'src/assets/images/common/gold.png'
import key1 from 'src/assets/images/common/key1.png'
import key2 from 'src/assets/images/common/key2.png'
import key3 from 'src/assets/images/common/key3.png'
import key4 from 'src/assets/images/common/key4.png'
interface I_dlt {
  width?: number | string;
  height?: number | string;
  count?: number;
  style?: any;
  className?: string;
  isShowDetail?: boolean;
  type?: 'dlt' | 'gold' | 'key1' | 'key2' | 'key3' | 'key4'|string;
  onImgClick?: (count: number) => void;
}

const PriceImg = (props: I_dlt) => {
  const {
    count = -1,
    width = 120,
    height = 120,
    style,
    className,
    isShowDetail = true,
    onImgClick,
    type = 'dlt'
  } = props
  //   const [visible, setVisible]=useState(false)
  const getImg = () => {
    let img = dltImg
    switch (type) {
      case 'dlt':
        img = dltImg
        break
      case 'gold':
        img = goldImg
        break

      case 'key1':
        img = key1
        break

      case 'key2':
        img = key2
        break
      case 'key3':
        img = key3
        break
      case 'key4':
        img = key4
        break
      default:
        img = dltImg
        break
    }
    return img
  }
  return (
    <PriceImgStyle>
      <div
        className={` box ${className}`}
        onClick={() => {
          if (isShowDetail) {
            //   setVisible(true)

            return
          }
          onImgClick && onImgClick(count)
        }}
        style={{
          height: height,
          width: width,
          ...style
        }}
      >
        <img src={getImg()} alt="" />
        <div className="count">{count}</div>
      </div>
    </PriceImgStyle>
  )
}

export default PriceImg
