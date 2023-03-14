import { Global, css } from '@emotion/react'
import scrollTopImg from 'src/assets/images/game/scroll-top.png'
import scrollBottomImg from 'src/assets/images/game/scroll-bottom.png'

const styles = css`
  * {
    outline: none;
  }
  html {
    font-size: 16px;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-size: 100% auto;
    background-position: bottom;
    min-height: 100vh;
  }
  body {
    margin: 0;
    font-family: bod, pertili, lanting, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #0C0909 !important;
    color: #fff;
  }

  ::-webkit-scrollbar {
    background-color: #191317;
    width: 20px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #2C2624;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
      -webkit-appearance: none !important;
      margin: 0; 
  }
  input[type="number"]{ -moz-appearance: textfield; }


  .a-dropdown .ant-select-item {
    font-size: 18px;
  }

  * {
    box-sizing: border-box;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  p {
    margin-bottom: 0;
  }
  img {
    max-width: unset;
  }

  .ant-spin-blur::after {
    opacity: 0;
  }
   
  .custom-scrollbar {
    &::-webkit-scrollbar {
      width: 20px;
    }
    &::-webkit-scrollbar-button:start:decrement {
      display: block;
      background: url(${scrollTopImg}) no-repeat;
    }
    &::-webkit-scrollbar-button:end:increment {
      display: block;
      background: url(${scrollBottomImg}) no-repeat;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #2b2624;
      border-radius: 4px;
    }
  }
  /* 覆盖的PopoverStyle样式 */
  /* .ant-popover-arrow-content{
    background-color:#171212 !important;
  }
  .ant-popover-title{
    border-bottom: 1px solid rgba(186,166,148,.21) !important;
  }
  .ant-popover-inner{
    background-color:#171212 !important;
  } */
  /* 覆盖全局ant menu的样式 */

  .ant-menu-sub{
    background-color: #2C2624 !important;
  }
  .ant-menu-sub .ant-menu-item,.ant-dropdown,.ant-dropdown-menu{
    background-color: #2b2624 !important;
    color: rgb(178, 133, 108) !important;
    
  }
.ant-dropdown-menu-item,.ant-dropdown-menu-title-content :hover{
  background-color: #2b2624 !important;
  color: rgb(178, 133, 108) !important;
}
    /* .PopoverStyle{
      background-color:rgb(151,128,104)
      
      .ant-popover{
        background-color:rgb(151,128,104)
        .ant-popover-content{
          .ant-popover-arrow{
            background-color: rgb(151,128,104)
          }
          .ant-popover-inner{
            background-color: rgb(151,128,104)
          }
        }
      }
  } */
`

const GlobalStyle = () => <Global styles={styles} />

export default GlobalStyle
