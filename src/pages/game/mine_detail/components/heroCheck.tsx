

import checkImg from 'src/assets/images/common/check.png'
import checkedImg from 'src/assets/images/common/checked.png'
type t_onChange=(value: boolean) => void
interface I_HeroCheck{
    value:boolean;
    onChange:t_onChange
}
const HeroCheck:React.FC<I_HeroCheck>=(props:I_HeroCheck) => {
  const {value, onChange}=props

  return (
    <div className="absolute top-0 right-0 flex pointer cursor-pointer"
      onClick={()=>{ onChange(!value) }}
    >
      <img alt="" src={value?checkedImg:checkImg} className="w-5"></img>
      {/* <svg onClick={()=>{ onChange(!value) }} style={{marginRight: -20, marginTop: -20}} width='40' height='40'>
        <path d="M 0.00 20.00 A 20 20 0 0 0 20.00 40.00 L 20 20 Z" fill={`${value?'#D68C3F':'#221F1F'}`} ></path>
      </svg> */}
    </div>
  )

}

export default HeroCheck
