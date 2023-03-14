import styled from '@emotion/styled'
import bg from 'src/assets/images/footer/footer_bg.png'
import mbg from 'src/assets/images/footer/m__footer_bg.jpg'

export const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 6.3%;
  font-size: 14px;
  background: url(${bg}) no-repeat center 0;
  background-size: cover;
  color: #baa694;
  margin-top: 80px;

  @media screen and (max-width: 768px) {
    background: url(${mbg}) no-repeat center 0;

    .copy-right {
      font-size: 12px !important;
    }
  }
  
  .footer-top {
    display: flex;
    justify-content: space-between;
    padding-top: 64px;

    .wrapper {
      display: flex;
      flex-direction: column;
      flex: 3;

      .top {
        display: flex;
        justify-content: space-between;

        .item-btn {
          margin-right: 40px;
          min-width: 110px;
          font-size: 14px;
          height: 28px;
          line-height: 28px;
          color: #fff;
          background: linear-gradient(90.7deg,#f6465d .15%,#f15f40 101.76%);
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          font-weight: bolder;

          &:last-child {
            margin: 16px 0 0;
            margin-right: 40px;
            background: #b2856c;
          }
        }
      }

      .footer-b {
        margin-top: 50px;
        font-family:  serif;
        > div {
          display: flex;
        }
        .Num-font {
          display: flex;
          align-items: center;
          font-style: normal;
        }
      }
    }

    .container {
      padding: 0 0 0;
      display: flex;
      flex-wrap: wrap;
      flex: 1;

      .footer-right {
        display: flex;
        justify-content: flex-end;
        padding: 8px 0 0;
        flex: 1;
        min-width: 0;
        flex-shrink: 0;

        .item {
          margin-right: 12%;
          box-sizing: border-box;
          flex-shrink: 0;


          .item-link {
            display: flex;
            align-items: center;
            margin-top: 16px;
            color: #baa694;
            cursor: pointer;
            background-color: transparent;
            text-decoration: none;

            > svg {
              margin-right: 8px;
              fill: #baa694;
            }
          }
        }
      }
    }
  }

  .footer-mobile {
    padding-top: 40px;
    .top {

      .item {
        display: flex;
        align-items: center;
        .item-btn {
          min-width: 80px;
          font-size: 14px;
          height: 28px;
          line-height: 28px;
          color: #fff;
          background: linear-gradient(90.7deg,#f6465d .15%,#f15f40 101.76%);
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          font-weight: bolder;
  
          &:last-child {
            background: #b2856c;
            margin-left: 32px;
          }
        }
      }
    }

    .container {
      display: flex;
      margin-top: 40px;

      .item {
        margin-right: 12%;
        box-sizing: border-box;
        flex-shrink: 0;

        .item-link {
          display: flex;
          align-items: center;
          margin-top: 16px;
          color: #baa694;
          cursor: pointer;
          background-color: transparent;
          text-decoration: none;

          > svg {
            margin-right: 8px;
            fill: #baa694;
          }
        }

        &:last-of-type {
          margin-right: 0;
        }
      }
    }

    .footer-b {
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
      font-family: serif;

      .Num-font {
        display: flex;
        align-items: center;
        font-style: normal;
      }

      span {
        display: flex;
        font-size: 9px;
      }

      i {
        word-break: break-all;
      }
    }
  }



  .copy-right {
    margin-top: 50px;
    font-size: 14px;
    font-weight: 400;
    color: #BAA694;
    text-align: center;
    padding: 20px 0 30px;
    border-top: 1px solid rgba(255,247,239,.1);
  }
  `
