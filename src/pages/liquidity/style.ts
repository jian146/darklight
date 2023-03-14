import styled from '@emotion/styled'


import dataBg from 'src/assets/images/liquidity/item_bg_2.png'

import titleBg from 'src/assets/images/liquidity/titleBg.png'

export const LiquidityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    width: 471px;
    height: 106px;
    font-size: 32px;
    font-weight: bold;
    margin-top: 37px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    
    background-size: 100% 100%;
  }

  .cnt {
    width: 496px;
    height: 511px;

    background-size: 100% 100%;
    margin-top: 65px;

    .cnt-tit {
      // height: 145px;
      display: flex;
      justify-content: center;
      align-items: center;
      // padding-top: 14px;
      margin:14px 50px 33px 50px;
      background: url(${titleBg}) no-repeat center;
      background-size: cover;
      .img {
        width: 56px;
        height: 56px;
        position: relative;

        .usdt {
          position: absolute;
          bottom: 0;
          right: -18px;
          width: 36px;
          height: 36px;
        }
      }

      .cnt-text {
        font-size: 24px;
        font-weight: bold;
        color: #FFFFFF;
        margin-left: 57px;
      }
    }

    .data-re {
      padding: 30px 25px 25px 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color:rgb(27,16,19);
      background: url(${dataBg}) no-repeat center;
      background-size: cover;
      .item {
        height: 40px;
        width: 100%;
        // background: url(${dataBg}) no-repeat center;
        border-radius:4px;
        background-color:#080305;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 18px;

        span:first-of-type {
          color: #888888;
          font-weight: bold;
        }

        &:not(:last-of-type) {
          margin-bottom: 10px;
        }
      }

      .arrow {
        width: 14px;
        height: 14px;
        margin: 5px 0 11px 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    transform: scale(.7);
    width: 100%;
  }
`
