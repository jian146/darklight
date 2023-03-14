import { Drawer as AtDrawer } from 'antd'
import styled from '@emotion/styled'

export const Drawer = styled(AtDrawer)`
  .ant-drawer-content {
    background-color: #191317;
  }
  .ant-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #191317;
    border: none;

    .ant-drawer-title {
      color: #B28465;
      font-size: 16px;
    }

    .ant-drawer-close {
      padding: 0;
      position: relative;
    }
  }
  .ant-drawer-body {
    background-color: #191317;
  }
`
