import styled from '@emotion/styled'

export const ChartWrapper = styled.div`
  margin-bottom: 40px;
  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .flex-item {
    flex: 1;
    min-width: 0;
  }

  .number-box {
    width: 148px;
    color: #d68c3f;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 60px;
    }
  }

  .board-head__list {
    margin: 50px 0 0;
    position: relative;

    .head__topimg img {
      width: 100%;
      height: auto;
    }

    .board-center {
      background: radial-gradient(60.54% 60.54% at 50% 35.69%,#2c0808 0,#130303 100%);

      .item {
        min-height: 80px;
        display: flex;
        align-items: center;


        .mob-item {
          width: 100%;
          display: flex;
          flex-wrap: wrap;

          .item-column {
            width: 16%;
            position: relative;
            margin-right: 30px;
            flex-shrink: 0;
            
            &::after {
              position: absolute;
              content: "";
              background: #372b2b;
              top: 0;
              bottom: 0;
              width: 1px;
              right: 0;
            }
          }
          .item-li {
            flex-shrink: 0;
            .name  {
              font-size: 20px;
              color: #baa694;
              font-weight: 800;
              font-family: Alegreya-ExtraBold;
            }

            .tlt {
              font-size: 14px;
              color: #baa694;
              opacity: .5;
              font-weight: 700;
              font-family: Alegreya-Bold;
            }

            .tokenid {
              font-size: 14px;
              color: #baa694;
            }

            .value {
              color: #f45250;
              font-size: 14px;
              font-family: DINPro-Medium;
            }

            &:nth-of-type(3) {
              width: 26%;
            }
            &:nth-of-type(4) {
              width: 20%;
            }
          }
        }
      }
    }

    .board-bot {
      width: 100%;
      height: auto;
      position: absolute;
      bottom: -21px;
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .border-list {
    padding: 24px 0 0;

    .item {
      margin-bottom: 2px;
      background: #171212;
      border-radius: 0;
      min-height: 80px;
      display: flex;
      align-items: center;

      .mob-item {
        width: 100%;

        .item-column {
          width: 16%;
          position: relative;
          margin-right: 30px;
  
          &::after {
            position: absolute;
            content: "";
            background: #372b2b;
            top: 0;
            bottom: 0;
            width: 1px;
            right: 0;
          }
        }

        .item-li {
          &:nth-of-type(3) {
            width: 26%;
          }
          &:nth-of-type(4) {
            width: 20%;
          }
        }
      }

      .name {
        font-size: 18px;
        color: #b2856c;
        font-weight: 700;
        font-family: Alegreya-ExtraBold;
      }

      .tlt {
        font-size: 14px;
        color: #b2856c;
        opacity: .3;
        font-weight: 700;
        font-family: Alegreya-Bold;
      }

      .tokenid {
        font-size: 12px;
        color: #b2856c;
      }

      .value {
        color: #f45250;
        font-size: 12px;
      }
    }
  }
`
