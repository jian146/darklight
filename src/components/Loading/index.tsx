import { Spin } from 'antd'
import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface Props extends React.ComponentProps<typeof Spin> {
  center?: boolean,
  fixed?: boolean,
  zIndex?: number
}

const LoadingWrapper = styled.div<{
  center?: boolean,
  fixed?: boolean,
  zIndex?: number,
  spinning?: boolean
}>`
  ${props => props.center && css`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 110;
    min-height: 120px
  `}
  ${props => props.fixed && css`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: ${props.zIndex};
  `}
  display: ${ props => props.spinning !== false ?
    props.center ? 'flex' : 'block' : 'none'};
  .ant-spin-dot-item {
    background-color: ${props => props.color};
  }
`

const Loading: React.FC<Props> = ({
  center,
  size = 'large',
  fixed,
  zIndex,
  spinning,
  ...res
}) => {
  return (
    <LoadingWrapper
      zIndex={zIndex}
      fixed={fixed}
      center={center}
      spinning={spinning}
    >
      <Spin spinning={spinning} {...res} size={size}>
        {res.children}
      </Spin>
    </LoadingWrapper>
  )
}

export default Loading
