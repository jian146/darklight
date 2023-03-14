import styled from '@emotion/styled'
import Wrapper from 'src/components/Wrapper'
import titledl from 'src/assets/images/market/title_dl.png'
import titledr from 'src/assets/images/market/title_dr.png'
import MenuItem from '@mui/material/MenuItem'

const Container = styled(Wrapper)`
.selectTrggerDom{
  position:absolute;
  z-index:80;
  cursor: pointer;
  width:100%;
  height:100%;
}
  .left {
    width: 440px;
    position: relative;
    
    .bg {
      position: relative;
      padding-top: 145.2%;

      > img:first-of-type {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        z-index: 0;
      }
    }
  }

  .right {
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

`

export const Option = styled(MenuItem)`
  border-bottom: 1px solid #211d1a;
  &.Mui-selected {
    background-color: #2C2624 !important;
  }
`

export default Container
