import radioCheckImg from 'src/assets/images/common/radioCheck.png'
import radioImg from 'src/assets/images/common/radio.png'
interface I_Radio {
  lable?: string | any;
  value: boolean;
  isDisabled?: boolean;
  onChange: (value: boolean) => void;
  size?: number;
  boxClassName?: string;
  color?: string;
  textStyle?: any;
  boxStyle?: any
  lableClassName?:string
}
const Radio: React.FC<I_Radio> = (props: I_Radio) => {
  const { lable = '', onChange, value, isDisabled = false, size = 35, boxClassName, color = '#B2856C', textStyle, boxStyle, lableClassName } = props

  return (
    <div className={`flex  items-center justify-center  ${boxClassName}`}
      style={{
        ...boxStyle
      }}
    >
      <div
        onClick={() => {
          if (!isDisabled) {
            onChange(!value)
          }

        }}
        style={{ width: size, height: size }}
        className="flex relative items-center justify-center cursor-pointer mr-2"
      >
        <img
          src={radioImg}
          style={{
            width: size,
            height: size,
            filter: isDisabled ? 'grayscale(1)' : 'grayscale(0)'
          }}
          alt=""
        ></img>
        {value && (
          <img
            style={{
              width: size - 10,
              filter: isDisabled ? 'grayscale(1)' : 'grayscale(0)'
            }}
            src={radioCheckImg}
            className="absolute "
            alt=""
          ></img>
        )}
      </div>
      <span
        className={`${lableClassName}`}
        style={{
          color: color,
          ...textStyle
        }}>{lable}</span>
    </div>
  )
}

export default Radio
