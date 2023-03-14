import styled from '@emotion/styled'
import { Radio } from 'antd'

export const RadioButton = styled(Radio.Button)`
  text-align: center;
  font-size: 20px;
`

export const RadioGroup = styled(Radio.Group)<{
  // 间距
  space?: string
  // 字体大小
  fontSize?: string
  // 宽度
  width?: string
  // 高度
  height?: string
  // 背景颜色
  bgColor?: string
  // 字体是否加粗
  bold?: boolean
  // 字体颜色
  color?: string
  // 选中字体颜色
  activeColor?: string
  // 最外层容器宽度是或否是100%
  wFull?: boolean
}>`
  width: ${({wFull}) => wFull ? '100%' : undefined};
  display: ${({wFull}) => wFull ? 'flex' : 'inline-block'} !important;
  justify-content: space-between;
  .ant-radio-button-wrapper {
    user-select: none;
    font-size: ${({fontSize}) => fontSize};
    width: ${({width}) => width};
    height: ${({height}) => height};
    line-height: ${({height}) => height};
    background-color: ${({bgColor}) => bgColor} !important;
    font-weight: ${({bold}) => `${bold ? 'bold' : ''}`};
    border: 1px solid ${({color}) => `${color ?? '#664F42'}`} !important;
    color: ${({color}) => `${color ?? '#664F42'}`} !important;
    border-radius: 5px !important;
    &:not(:last-of-type) {
      margin-right: ${({space}) => `${space ?? 0}`};
    }

    &::before {
      display: none !important;
    }

    .ant-radio-button {
      border-radius: 5px !important;
    }
    
    .ant-radio-button-checked {
      background-color: ${({bgColor}) => bgColor} !important;
    }
  }
  .ant-radio-button-wrapper-checked {
    color: ${({activeColor}) => `${activeColor ?? '#B2856C'}`} !important;
    border: 1px solid ${({activeColor}) => `${activeColor ?? '#B2856C'}`} !important;
  }
`
