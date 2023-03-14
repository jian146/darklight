import styled from '@emotion/styled'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import tabsTop from 'src/assets/images/game/tabs_top.png'
import tabsBottom from 'src/assets/images/game/tabs_bottom.png'
import tabsActive from 'src/assets/images/game/tab_active.png'
import leftImg from 'src/assets/images/game/left.png'
import rightImg from 'src/assets/images/game/right.png'

export const GameWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  max-width: 1200px;
  margin: auto;
  margin-bottom: 100px;
 
  .menuBox{
    overflow: unset;
    position: relative;
    background: radial-gradient(43.47% 7718.51% at 50% 100%, rgb(44, 26, 26) 0px, rgba(41, 27, 27, 0.61) 86.48%, rgba(24, 18, 18, 0) 100%);
    &::before {
      content: "";
      width: 800px;
      max-width: 88.5%;
      height: 55px;
      position: absolute;
      bottom: 48px;
      left: 0;
      right: 0;
      margin: auto;
      background: url(${tabsTop}) no-repeat bottom;
      background-size: 100% auto;
      z-index: 1;
      border: none;
    }     
    &::after {
      content: "";
      width: 600px;
      max-width: 72%;
      height: 26px;
      position: absolute;
      bottom: -16px;
      left: 0;
      right: 0;
      margin: auto;
      background: url(${tabsBottom}) no-repeat 50%;
      background-size: 100% auto;
      z-index: 1;
    }
    .menuList{
      display:flex;
      justify-content:center;
      align-items: center;
      margin-top: 60px;
      height: 60px;
      min-height: 48px;      
      padding: 0 30px;
      border:none;
      background: radial-gradient(43.47% 7718.51% at 50% 100%, rgb(44, 26, 26) 0px, rgba(41, 27, 27, 0.61) 86.48%, rgba(24, 18, 18, 0) 100%);

     
      .faSubItem{
        display:flex;
        align-items: center;
        justify-content: center;
        min-width:112px;
      }
      .selectChildren{
        color: rgb(178, 133, 108);
        background: url(/static/media/tab_active.b4cb3aa7.png) no-repeat 50%;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        text-shadow: 0 3px 4px rgb(10 7 2 / 97%);
      }
      .ant-menu-item,.ant-menu-submenu{
        padding:0px 0px !important;
        min-width:112px;
        &::after {
          content:none;
          border-bottom:none;
        }
        &::hover {
          
          content:none;
          border-bottom:none;
        }
      }
      .ant-menu-item-selected{
        color: rgb(178, 133, 108);
        background: url(/static/media/tab_active.b4cb3aa7.png) no-repeat 50%;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        text-shadow: 0 3px 4px rgb(10 7 2 / 97%);
      }


      .ant-menu-title-content{
        min-width: unset;
        font-size: 18px;
        color: rgb(178, 133, 108);
        font-weight: bolder;
        padding: 0 20px;
        text-transform: unset;
        font-family: bod,pertili,lanting,sans-serif;
        display: flex;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    padding: 0  25px;
  }
  
  @media screen and (max-width:768px){
    padding: 0;
    // overflow:scroll;
    // width:100vw;
    overflow:hidden;
    .menuBox{
      &::before {
        bottom: 54px;
      }
      // overflow:hidden;
      .menuList{
        width:100%;
        width:120vw;
        justify-content: start;
        overflow:scroll;
        padding:0 10px;
        &::-webkit-scrollbar {
          width: 0px;
          height:0px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #2b2624;
          border-radius: 0px;
          height:0px;
        }
        .leftIcon{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          display: flex !important;
          width: 16px;
          height: 16px;
          align-items: center;
          background: url(${leftImg}) no-repeat center;
          background-size: 100% 100%;
        }
        .rightIcon{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
          display: flex !important;
          width: 16px;
          height: 16px;
          align-items: center;
          background: url(${rightImg}) no-repeat center;
          background-size: 100% 100%;
        }
        .ant-menu-item,.ant-menu-submenu{
          min-height:46px;
          padding:0 0px;
          order: initial !important;
          opacity: 1 !important;
          overflow-y: auto !important;
          pointer-events: auto !important;
          position: inherit !important;
        }
        // .ant-menu-overflow-item-rest{
        //   display:none;
        // }
        .ant-menu-title-content{
          padding:0 5px;
        }
        .faSubItem{
          order:1
        }
        .faSubItem,.ant-menu-item,.ant-menu-submenu{
          min-width:auto;
          
        }
      }
    }

  }
  
  color: #fff;




  
`


export const MTabs = styled(Tabs)`
  margin-top: 60px;
  height: 60px;
  overflow: unset;
  position: relative;
  padding: 0 30px;

  label {
    color: #B2856C;
    font-size: 18px;
    margin-right: 18px;
    font-weight: 700;
  }
  .ant-select-dropdown {
    background-color: #2C2624;
    // top:50px !important;
  }
  

  .ant-select-item {
    color: #B2856C;
    font-size: 16px;
   
    &:hover {
      background-color: #2C2624 !important;
    }
  }



  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: #2C2624;
    color: #B2856C;
  }


  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background-color: #2C2624;
  }

  .ant-select-selection-placeholder {
    line-height: 38px;
    color: #B2856C;
    font-size: 16px;
    font-weight: bold;
  }

  &::before {
    content: "";
    width: 800px;
    max-width: 88.5%;
    height: 55px;
    position: absolute;
    bottom: 48px;
    left: 0;
    right: 0;
    margin: auto;
    background: url(${tabsTop}) no-repeat bottom;
    background-size: 100% auto;
    z-index: 1;
    border: none;
  }

  &::after {
    content: "";
    width: 600px;
    max-width: 72%;
    height: 26px;
    position: absolute;
    bottom: -16px;
    left: 0;
    right: 0;
    margin: auto;
    background: url(${tabsBottom}) no-repeat 50%;
    background-size: 100% auto;
    z-index: 1;
  }

  @media screen and (max-width: 768px) {
    &::before {
      bottom: 54px;
    }
  }


  .MuiTab-root {
    color: #fff;
    padding: 0;
    padding: 0 10px;
    min-width: unset;
    font-size: 18px;
    color: rgb(178, 133, 108);
    font-weight: bolder;
    padding: 0 20px;
    text-transform: unset;
    font-family: bod, pertili, lanting, sans-serif;


    &.Mui-selected {
      min-width:112px;
      color: rgb(178, 133, 108);
      background: url(${tabsActive}) no-repeat 50%;
      background-size: 100% 100%;
      text-shadow: 0 3px 4px rgb(10 7 2 / 97%);
    }

  }

  .MuiTabs-indicator {
    display: none;
  }

  .MuiTabs-scroller {
    display: flex;
    justify-content: center;
    background: radial-gradient(43.47% 7718.51% at 50% 100%, rgb(44, 26, 26) 0px, rgba(41, 27, 27, 0.61) 86.48%, rgba(24, 18, 18, 0) 100%);
    position: relative;

    .MuiTabs-flexContainer {
      height: 60px;
      align-items: center;
      
      @media screen and (max-width: 768px) {
        width: calc(100% + 20px);
      }
    }
  }

  .MuiTabs-scrollButtons {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    display: flex !important;
    width: 16px;
    height: 16px;
    align-items: center;
    background: url(${leftImg}) no-repeat center;
    background-size: 100% 100%;
    
    > svg {
      display: none;
    }
    
    &:last-of-type {
      left: unset;
      right: 0;
      justify-content: flex-end;
      text-align: right;
      background: url(${rightImg}) no-repeat center;
      background-size: 100% 100%;
    }
    &.Mui-disabled {
      opacity: .5;
    }
    .MuiSvgIcon-root {
      font-size: 25px;
    }
  }
`

export const MTab = styled(Tab)`

`
