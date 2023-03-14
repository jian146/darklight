/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Props, SliderSyled, SliderWrapper } from './styled'

type SliderProps = Props & {
  id: string
  title: string
}

const Slider: React.FC<SliderProps> = (props) => {
  return (
    <SliderWrapper
      id={props.id}
      className="mb-12"
    >
      <h1 className="text-lg">{props.title}</h1>
      <SliderSyled
        tooltipVisible
        tooltipPlacement="bottom"
        getTooltipPopupContainer={() => document.getElementById(`${props.id}`)!}
        {...props}
      />
    </SliderWrapper>
  )
}

export default Slider
