import styled from '@emotion/styled'
import { Modal } from 'antd'
import HeroDialogBg from 'src/assets/images/dialog/role_dialog/bg.png'
import MenuItem from '@mui/material/MenuItem'
import titledr from 'src/assets/images/market/title_dr.png'
import titledl from 'src/assets/images/market/title_dl.png'

export const ChoseHeroModalStyle = styled(Modal)`
  .ant-modal-content {
    background: url(${HeroDialogBg}) no-repeat;
    background-size: 100% 100%;

    .formBox {
      padding-top:15px;
      .MuiFormControl-root{
        margin-bottom:30px;
      }
      .title {
        &::before {
          content: '';
          position: absolute;
          left: -156px;
          top: 50%;
          transform: translateY(-50%);
          width: 104px;
          height: 25px;
          background: url(${titledl}) no-repeat center;
          background-size: 100% 100%;
        }
        
        &::after {
          content: '';
          position: absolute;
          right: -156px;
          top: 50%;
          transform: translateY(-50%);
          width: 104px;
          height: 25px;
          background: url(${titledr}) no-repeat center;
          background-size: 100% 100%;
        }
      }
  
      .MuiOutlinedInput-notchedOutline {
        border: 1px solid #664F42 !important;
      }
  
      .MuiInputLabel-root {
        color: #664F42 !important;
      }
  
      .MuiSelect-icon {
        fill: #664F42;
      }
  
      .MuiSelect-select {
        color: #664F42;
  
        > div {
          padding-top: 0;
          padding-bottom: 0;
        }
  
        span {
          color: #E6D3C3;
        }
      }
  
      .MuiOutlinedInput-input {
        color: #E6D3C3;
        font-size: 14px;
      }
    }

  }
`
export const Option = styled(MenuItem)`
  border-bottom: 1px solid #211d1a;
  &.Mui-selected {
    background-color: #2C2624 !important;
  }
`

export const PVEModalStyle = styled(Modal)`
  .ant-modal-content {
    background-color: #0C0909;
    width:100vw;
    height:100vh;

    // background: url(${HeroDialogBg}) no-repeat;
    // background-size: 100% 100%;

  }
  @media screen and (max-width: 768px) {
    max-width:100vw;
    margin:0px !important;
    padding:0px !important;
    .ant-modal-content{
      padding:0px;
      .ant-modal-body{
        padding:0px;
        widht:100%;
        height:100%;
      }
    }
  }
}
`
