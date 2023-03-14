import styled from '@emotion/styled'
import Wrapper from 'src/components/Wrapper'
import titledl from 'src/assets/images/market/title_dl.png'
import titledr from 'src/assets/images/market/title_dr.png'


const Container = styled(Wrapper)`

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
    .price {
      &::before {
        content: '';
        position: absolute;
        left: -114px;
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
        right: -114px;
        top: 50%;
        transform: translateY(-50%);
        width: 104px;
        height: 25px;
        background: url(${titledr}) no-repeat center;
        background-size: 100% 100%;
      }
    }

    .bottom-attr {
      margin: -24px;
      padding: 24px;
      background-color:#130F0E;
      .ant-progress-inner {
        background-color: #160E0E;
        border: 1px solid #6B594D;
        border-radius: 4px;
      }
      .ant-progress-bg {
        height: 14px !important;
        border-radius: 4px;
        background: linear-gradient(90deg, #610C0E, #7D181B, #610C0E)
      }
      .title-box {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        border-bottom: 1px solid #707070;
        padding-bottom: 6px;
        span.title {
          color: #D68C3F;
        }
        span.total {
          color: #C63A25;
        }
      }
      .attr-list {
        display: flex;
        flex-direction: column;
        margin-top: 20px;

        .attr-item {
          margin-bottom: 12px;
          .info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2px;

            .i-title {
              display: flex;
              align-items: center;
              color: #BAA694;
              font-size: 18px;

              > img {
                width: 24px;
                height: 24px;
                object-fit: cover;
                margin-right: 4px;
              }
            }
            .i-val {
              color: #BAA694;
              font-size: 16px;
              font-weight: bold;

              &.primary {
                color: #ecae18;
              }
            }
          }


        }
      }
    }
  }
`

export default Container
