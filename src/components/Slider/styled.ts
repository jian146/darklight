import styled from '@emotion/styled'
import { Slider } from 'antd'
import IconSlider from 'src/assets/images/market/icon-slider.png'
export type Props = React.ComponentProps<typeof Slider>
export const SliderSyled = styled(Slider)<Props>`
  .ant-slider-rail {
    background-color: transparent !important;
  }

  .ant-slider-track {
    height: 12px;
    background: linear-gradient(to right, #400d06, #7e1719, #400d06);
  }

  .ant-slider-step {
    height: 12px;
  }

  .ant-slider-handle {
    width: 26px;
    height: 26px;
    margin-top: -7px;
    border-color: #5c0b0d !important;
    box-shadow: none !important;
    background: url(${IconSlider}) no-repeat center;
  }

  .ant-slider-dot {
    display: none;
  }

`

export const SliderWrapper = styled.div`
  > h1 {
    color: #B2856C;
  }
  .ant-tooltip-arrow {
    display: none;
  }
  .ant-tooltip-placement-bottom {
    padding-top: 0;
  }
  .ant-tooltip-inner {
    background-color: transparent;
    font-size: 16px;
    color: #664F42;
    padding: 0;
  }
`
