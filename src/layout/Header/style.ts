import { Drawer } from 'antd'
import styled from '@emotion/styled'
import NavActiveImg from 'src/assets/images/header/nav_active.png'

export const PCHeaderWrapper = styled.div`
  height: 96px;
  width: 100%;
  background-color: #080706;
  position: fixed;
  z-index: 900;
  top: 0;
  
  .header-box {
    max-width: 1440px;
    padding: 0 6.3%;
    margin: auto;
  }

  .pc-header {
    display: flex;
    justify-content: space-between;
    height: 100%;
    height: 96px;
  }
  .left {
    display: flex;
    align-items: center;
    overflow: hidden;
    flex: 1;
    
    .menu {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      height: 100%;
      height: 52px;
      overflow: hidden;
      margin-left: 24px;
      > a {
        display: flex;
        align-items: center;
        font-size: 20px;
        color: #FFF;
        flex-shrink: 0;
        height: 52px;
        line-height: 52px;
        cursor: pointer;
        padding: 0 16px;
        font-weight: bolder;

        &.active {
          background: url(${NavActiveImg}) no-repeat center 0!important;
          background-size: auto 100%;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
`

export const MobileHeaderWrapper = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: rgba(15, 17, 20, 1);
  position: fixed;
  z-index: 100;
  box-sizing: border-box;
  top: 0;

  .right {
    display: flex;
    align-items: center;
    > span {
      color: #b2856c;
      font-weight: 700;
      font-size: 16px;
      margin-left: 20px;

      &.m-menu-title {
        display: flex;
        align-items: center;
      }
      > img {
        margin-left: 6px;
      }
    }
  }
`

export const MenuDrawer = styled(Drawer)`
  .ant-drawer-content {
    background-color: #141110;
    color: hsla(0,0%,100%,.8);

    .ant-drawer-close {
      color: #fff;
    }

    .ant-drawer-body {
      padding-top: 70px;
      text-align: center;
      padding-bottom: 18px;

      .content {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        .menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        width: 100%;
        padding-bottom: 76px;
        > a {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          font-weight: bolder;
          font-size: 18px;
          color: #FFF;
          height: 52px;
          margin: 0 15px;
          display: flex;
          flex-shrink: 0;
          cursor: pointer;
          margin-bottom: 16px;

          &.active {
            background: url(${NavActiveImg}) no-repeat center 0!important;
            background-size: auto 100%;
          }
        }
      }

    }
    }
  }
`
