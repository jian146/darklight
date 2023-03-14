import React from 'react'
import { BackTop as AtBackTop, BackTopProps } from 'antd'
import backTopImg from 'src/assets/images/header/backtop.png'

const BackTop: React.FC<BackTopProps> = () => {
  return (
    <AtBackTop style={{ width: 50, height: 50 }}>
      <img
        className='w-full'
        src={backTopImg}
        draggable={false}
        alt=""
      />
    </AtBackTop>
  )
}

export default BackTop
