import styled from '@emotion/styled'
import advBg from 'src/assets/images/game/arena/map/boxBg.png'
import bg from 'src/assets/images/game/arena/map/bg.png'
import h5bg from 'src/assets/images/game/arena/map/h5bg.png'
export const ArenaWrapper = styled.div`
  display: flex;
  flex-direction: column;
 
  .record {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    margin: 40px 35px 25px 0;

    span {
      margin-left: 8px;
      font-size: 18px;
      text-decoration: underline;
      color: #B2856C;
    }
  }

  .advmap {
    height:585px;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10px;
    background: url(${bg}) no-repeat center;
    background-size: 100% 100%;
    @media screen and (max-width: 1116px) {
      padding: 0 100px;
    }
  
    @media screen and (max-width: 930px) {
      justify-content: center;
    }
    .pool{
      width:378px;
      height: 501px;
      position:relative;
      text-align: center;
      padding:50px 0 10px 0;
      margin-right:78px;
      margin-left: 20px;
      .title{
        font-size: 18px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #E8852D;
        line-height:1;
      }
      .price{
        font-size: 36px;
        font-family: DIN;
        font-weight: bold;
        color: #E8852D;
      }
      .bottomContent{
        position:absolute;
        bottom:10px;
        min-height:40px;
        width:100%;
        background-color:rgba(0,0,0,0.29);
        .rangTable{
          width: 100%;
          tr{
            padding:0 14px;
          }
          .lastRow{
           
            td{
              border-top:1px solid #332E28;
              &:first-of-type {
                border:none;
              }
            
            }
          }
          th{
            font-size: 14px;
            font-family: SimHei;
            font-weight: 400;
            color: #BAA694;
            opacity: 0.5;
            padding:18px 0 18px 0px;
          }
          td{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #B5A190;
            padding:7.5px 10px;
            
          }
          .priceRow{
            display:flex;
            align-items:center;
            // justify-content: space-between;
            justify-content: center;
            .walletImg{
              width:16px;
              height:16px;
              margin-right:2px;
            }
          }
         
        }
      }
      .more{
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #B2856C;
        line-height: 50px;
        opacity: 0.53;
        span{
          cursor: pointer;
        }
      }
    }
    .boxContent{
      position:relative;
      display:flex;
      align-items: center;
      justify-content: center;
      margin-right:36px;

    }
    .advImg {
      width:293px;
      position:absolute;
      z-index:1;
      
      // margin-top: 30px;
    }
    .box {
      width: 312px;
      height: 501px;
      background: url(${advBg}) no-repeat center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      position:relative;
      z-index:2;
  
      .index {
        color: #260D0F;
        font-size: 18px;
        font-weight: bold;
        margin-top: 28px;
        font-style: normal;
      }
  
      .title {
        font-size: 18px;
        font-weight: bold;
        color: #BAA694;
        margin-top: 24px;
        margin-bottom:20px
      }
  
     
  
      .desc {
        width:100%;
        text-align: center;
        bottom:0px;
        padding-bottom: 42px;
        position:absolute;
        // background-color:rgba(0,0,0,0.73);
        .desc-level {
          font-size: 16px;
          font-weight: bold;
          color: #D68C3F;
          margin-bottom: 4px;
        }
  
        .desc-cont {
          width:100%;
          padding:0 20px;
          text-align: center;
          font-size: 14px;
          font-weight: 400;
          color: #BAA694;
        }
      }
  
      .es-button {
        margin-top: 18px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .record {
      justify-content: center;
    }

    .advmap {
      padding: 0 10px;
      background:none;
      height: auto;
      .boxContent{
        margin-right:0px;
      }
      .pool{
        background: url(${h5bg}) no-repeat center;
        background-size: 100% 100%;
        width:100%;
        height: 501px;
        padding:40px 0 10px 0;
        margin-right:10px;
        margin-left: 10px;
        .title{
          font-size: 18px;
          font-family: Adobe Heiti Std;
          font-weight: normal;
          color: #E8852D;
          line-height:1;
        }
        .price{
          font-size: 36px;
          font-family: DIN;
          font-weight: bold;
          color: #E8852D;
        }
        .bottomContent{
          bottom:10px;
          min-height:40px;
          width:100%;

          .rangTable{
            width: 100%;
            tr{
              padding:0 14px;
            }
            th{
              font-size: 14px;
              padding:10px 0 10px 0px;
            }
            td{
              font-size: 14px;
              padding:2px 3px;
            }
            .priceRow{
              .walletImg{
                margin-right:5px;
              }
            }
           
          }
        }
        .more{

        }
      }
    }
  }
`
