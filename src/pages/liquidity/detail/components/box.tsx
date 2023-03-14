import { I_boxItem } from '..'
import { BoxItemWrapper } from './style'
import Button from 'src/components/Button'
import tramsferImg from 'src/assets/images/liquidity/arrow.png'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import { isCloseLiuidity } from 'src/config/switch'
const BoxItem:React.FC<{
    data:I_boxItem
}>=({data})=>{
  return <BoxItemWrapper>
    <div className="title">{data.title}</div>
    <div className="count">{data.count}</div>
    <img alt="" className="tramsferImg " src={tramsferImg}></img>
    <Button
      onClick={data.onClick}
      img={btnRedBg}
      width="186px"
      height="46px"
      disabled={data.disabled||isCloseLiuidity}
      bold
      fontSize="16px"
    >{data.btnText}</Button>
  </BoxItemWrapper>
}
export default BoxItem
