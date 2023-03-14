import styled from '@emotion/styled'
import switchBg from 'src/assets/images/game/hero/view_switch_bg.png'
import cardBg from 'src/assets/images/game/hero/list_card_bg.png'
import heroBg from 'src/assets/images/game/hero/Hero-bg.png'

export const ListWrapper = styled.div`
  color: #B2856C;

  .switch-view {
    margin: 18px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;

    .choseTitle{
      display:flex;
      border-bottom: 1px solid rgba(186,166,148,.21);
      padding-right:16px;
      .leftRow{
          color: #BAA694;
          // justify-content: center;
          padding: 0 0 12px;
          align-items:center;
          // line-height: 20px;
          
          .tabItem{
              margin:0 5px;
              cursor: pointer;
              opacity:1;
              display: flex;
              align-items: center;
          }
          .activeItem{
              color:#C63A25;
              opacity:1;
          }
          .selectColor{
            .ant-select-selector {
              background-color: #0C0909;
              border: 1px solid #664F42 !important;
              box-shadow: none !important;
              height: 30px;
              border-radius: 0;
        
              .ant-select-selection-item {
                line-height: 30px;
                color: #B2856C;
                // font-size: 18px;
                font-weight: 700;
              }
            }
        
            .ant-select-arrow {
              color: #B2856C;
            }
          }
          #selectsort {
            
            .ant-select-dropdown {
              background-color: #2C2624;
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
          }
      
      }
      
    }
    @media screen and (max-width: 768px) {
      .choseTitle{
        .leftRow{   
          flex-direction:column;           
          align-items: baseline;
            #selectsort{

              padding-top:10px;
              padding-left:5px;
            }                   
        }
      }
    
    } 
    .rightItem{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      svg {
        cursor: pointer;
        fill: #B2856C;
        &:last-child {
          font-size: 22px;
          margin-left: 30px;
        }
        
        &.active {
          background: url(${switchBg}) no-repeat center;
          background-size: cover;
        }
      }
    }

  }

  .list {
    display: flex;
    flex-direction: column;

    .list-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex: 1;
      background-color: #171212;
      box-sizing: border-box;
      padding: 24px 20px;
      margin-bottom: 10px;

      .divider {
        width: 1px;
        height: 107px;
        background: #664F42;
        margin: 0 30px;
      }

      .left {
        display: flex;
        align-items: center;
        .img {
          width: 105px;
          height: 105px;
          background: url(${heroBg}) no-repeat center;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          img:first-of-type {
            height: 80%;
          }
        }
        .desc {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
          margin-left: 30px;

          .title {
            font-size: 18px;
          }

          > p {
            font-size: 14px;
            display: flex;
            align-items: center;
          }
        }
      }

      .center {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;

        .attr-item {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          font-size: 14px;
          min-width: 50px;

          .value.primary {
            color: #ecae18;
          }

          &:not(:first-of-type) {
            .key {
              color: #664F42;
            }
          }
        }
      }

      .right {
        display: flex;

        .adventure {
          text-align: center;
          margin-right: 20px;
          color: #664F42;

          .value {
            color: #D02316;
          }
        }

        .btns .btn {
          display: block;
          &:first-of-type {
            margin-bottom: 10px;
          }
        }
      }
    }

  }
  .list-card {
    display: flex;
    color: #B2856C;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &:after{
      content: "";
      width: 30%;
    }

    .list-card-item {
      width: 368px;
      height: 523px;
      background: url(${cardBg}) no-repeat center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 0 20px;
      overflow: hidden;
      margin-bottom: 20px;
      
      .top-desc {
        display: flex;
        justify-content: space-between;
        margin-top: 35px;
        .left {
          span {
            &:first-of-type {
              font-size: 22px;
              font-weight: bold;
              p:last-of-type {
                font-size: 20px;
              }
            }
  
            &:last-child {
              font-size: 13px;
              display: flex;
              align-items: center;
            }
          }
        }
        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .es-button {
            margin-bottom: 10px;
          }
        }

      }
      .img {
        width: 310px;
        height: 310px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        position: relative;

        img.bg,
        img.card-hero-bg {
          width: 198px;
          height: auto;
          z-index: 1;
        }

        .bg {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 90%;
          transform: translate(-50%, -50%);
        }
      }
      .card-hero-bg {
        cursor: pointer;
      }
    }
  }


  .m-list {
    display: flex;
    flex-direction: column;
    padding: 0 16px;

    .m-list-item {
      padding: 24px;
      background: #171212;
      margin-bottom: 10px;

      .top {
        width: 100%;
        padding: 0 8px 16px;
        border-bottom: 1px solid #372b2b;
        display: flex;

        .img {
          width: 60px;
          height: 60px;
          background: url(${heroBg}) no-repeat center;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          img:first-of-type{
            height: 80%;
            width: auto;
          }
        }

        .desc {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
          margin-left: 30px;

          .title {
            font-size: 14px;
          }

          > p {
            font-size: 14px;
            display: flex;
            align-items: center;
          }
        }
      }

      .middle {
        display: flex;
        justify-content: space-between;
        padding: 16px 0 16px 0;
        border-bottom: 1px solid #372b2b;
        
        .m-item {
          font-size: 16px;
          font-weight: bold;

          .key,.value {
            white-space: nowrap;
            text-align: center;
          }
        }
      }

      .bottom {

        .attr {
          display: flex;
          padding: 8px 0 0;
          flex-wrap: wrap;

          .attr-item {
            display: flex;
            min-width: 34%;
            align-items: center;
            flex-direction: column;
            &:nth-of-type(3n-2) {
              min-width: 30%;
            }
            .value {
              font-weight: bold;

              &.primary {
                color: #ecae18;
              }
            }

            .key i.sub {
              color: #D02316;
              font-style: normal;
            }
          }
        }
        .btns {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
        }
      }
    }

  }

  @media screen and (max-width: 768px) {
    .list-card {
      padding: 0 10px;

      .list-card-item {
        padding: 0 14px;
        width: 100%;

        .top-desc {
          .left {
            span p {
              font-size: 18px;
              &:first-of-type {
                font-size: 20px;
              }
            }
          }
          .right {
            .es-button {
              width: 140px;
              height: 44px;
            }
          }
        }

      }
    }
  }
`
