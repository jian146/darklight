import { CSSProperties } from 'react'
import styled from '@emotion/styled'
import { Spin } from 'antd'
import btnRedBg from 'src/assets/images/common/btn_red.png'
interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  width?: string
  height?: string
  img?: string
  fontSize?: number | string
  color?: string
  style?: CSSProperties
  background?: string
  className?: string
  padding?: string
  borderRadius?: string
  border?: string
  disabled?: boolean
  loading?:boolean
  bold?: boolean
  size?:'large' | 'middle' | 'small'
}

const Container = styled.div<ButtonProps>`
  display: inline-block;
  text-align: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  line-height: ${({ height }) => height};
  font-size: ${({ fontSize }) => fontSize};
  border: ${({ border }) => border};
  color: ${({ color }) => color ?? '#B2856C'};
  border-radius: ${({ borderRadius }) => borderRadius ?? 0};
  background: ${({ background, img }) => background ?? `url(${img??btnRedBg}) no-repeat center`};
  background-size: 100% 100%;
  user-select: none;
  cursor: pointer;
  z-index: 10;
  button {
    width: 100%;
    appearance: none;
    background: transparent;
    padding: ${({ padding }) => padding ?? 0};
    outline: none;
    border: none;
    cursor: pointer;
    font-weight: ${({ bold }) => bold ? 'bold' : 'normal'};

    &:disabled {
      cursor: not-allowed;
    }
  }
`


const Button: React.FC<ButtonProps> = ({ children, disabled, loading=false, ...props }) => {
  return (
    <Container {...props}
      style={{
        filter: disabled ?'grayscale(100%)':''
      }}
    >
      <Spin spinning={loading}>
        <button disabled={disabled}>
          { children }
        </button>
      </Spin>
    </Container>
  )
}

export default Button
