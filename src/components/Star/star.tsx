
import starImg from 'src/assets/images/common/star.png'
import { StarStyle } from './style'
interface I_star{
    count:number
    width?:number
    className?:string
}
const Star=(props:I_star)=>{
  const {count, width, className}=props


  const renderStar=()=>{
    const domArr:React.ReactNode[]=[]
    for (let i=0;i<count;i++){
      domArr.push(<img key={i} className="starItem" style={{width: width?width:''}} src={starImg} alt="" />)
    }
    return domArr
  }

  return <StarStyle className={className}>
    {
      renderStar()
    }
  </StarStyle>
}

export default Star
