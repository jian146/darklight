import styled from '@emotion/styled'
import boxtitlebg from 'src/assets/images/game/lottery/boxtitlebg.png'
import kuang from 'src/assets/images/game/lottery/kuang.png'

export const LotteryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .equipBoxItemText{          
    color: #BAA694;
    font-size:16px;
    margin-top:10px;
    line-height:1;
  }
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

  .lottery-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .lottery-item {
      width: 25%;
      padding: 0 20px;
      min-width: 262px;
      margin-bottom: 38px;

      .wrapper {
        flex-shrink: 0;
        background: url(${kuang}) no-repeat center;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        padding-top: 40px;
        @keyframes open
        {
          0% { transform: rotate(0deg);}
          10% { transform: rotate(-11deg);}
          20% { transform: rotate(13deg);}
          30% { transform: rotate(-12deg);}
          40% { transform: rotate(11deg);}
          50% { transform: rotate(-14deg);}
          60% { transform: rotate(9deg);}
          70% { transform: rotate(-7deg);}
          80% { transform: rotate(15deg);}
          90% { transform: rotate(-11deg);}
          100% { transform: rotate(0deg);}
        }
        .openPackage{
          animation-fill-mode: forwards !important;
          animation:open 1.5s 1 ease-out ;
        }
        .keyNumber{
          width: 94%;
          padding:0 20px;
          text-align:right;
          font-size: 24px;
          color:#D68C3F;
          font-weight: bold;
          .count{
           font-size: 20px;
          }
        }
        img {
          display: block;
          margin: 0% auto 0;
          width: 94%;
          max-width: 220px;
        }
  
        .title {
          width: 83%;
          height: 38px;
          background: url(${boxtitlebg}) no-repeat center;
          background-size: 100% 100%;
          line-height: 39px;
          text-align: center;
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          color: #B2855E;
          font-weight: bold;
        }
  
        .lottery-button {
          max-width: 80%;
          margin: 24px 0 36px 0;
        }
      }

    }
  }
  #ResultDialogBox{
    .title{
      font-size: 32px;
      font-weight: bold;
      background-image:-webkit-linear-gradient(top,#ebe4c1,#e0bd7b); 

      -webkit-background-clip:text; 
  
      -webkit-text-fill-color:transparent; 
    }
    .content{
      width:100%;
      margin-top:20px;
      margin-bottom:20px;
      .EquiqImgBox{
        display:flex;
        algin-items: center;
        width:100%;
        justify-content: space-evenly;
        .EquipName{
          font-size: 14px;
          font-weight: 400;
          color: #BAA694;
          line-height: 28px;
        }
      }
    }
   
  }
  @media screen and (max-width: 480px) {
    .record {
      justify-content: center;
    }
    .lottery-wrapper {

      .lottery-item {
        width: 50%;
        min-width: auto;
        padding: 0 8px;
  
        .wrapper {
          .title {
            width: 148px;
          }
        }
      }
    }
  }

`
