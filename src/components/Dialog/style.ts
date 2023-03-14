import styled from '@emotion/styled'
import { Modal } from 'antd'
import HeroDialogBg from 'src/assets/images/dialog/role_dialog/bg.png'
import roleBg from 'src/assets/images/dialog/role_dialog/role_bg.png'
import resultDialogBg from 'src/assets/images/dialog/result_dialog/feedback_bg.png'
import heroBg from 'src/assets/images/dialog/drawHero_dialog/heroBg.png'
import cardBg from 'src/assets/images/dialog/drawHero_dialog/cardBg.png'

export const RoleModal = styled(Modal)`
  .ant-modal-content {
    background: url(${HeroDialogBg}) no-repeat;
    background-size: 100% 100%;

    .hero-img {
      // width: 171px;
      height: 197px;
      text-align: center;
      background: url(${roleBg}) no-repeat;
      background-size: 100% 100%;
    }
  }
`
export const TransferModal = styled(Modal)`
.ant-modal-content {
  background: url(${HeroDialogBg}) no-repeat;
  background-size: 100% 100%;
  .row{
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .titleText{
    font-family: FZLanTingHei-B-GBK;
    font-weight: bold;
    color: #B2856C;
  }
  .inputClass{
    background: rgba(12, 9, 8, 0.49);
    border: 1px solid #281E18;
    border-radius: 2px;
    font-size: 18px;
    font-family: FZLanTingHei-R-GBK;
    font-weight: 400;
    color: #664F42;
    margin: 28px 0;
    ::-webkit-input-placeholder{
      color:red;
      font-size: 10px;
      font-family: FZLanTingHei-R-GBK;
      font-weight: 400;
      color: #664F42;
  }
    // line-height: 70px;
  }
}
`
//卡片翻转的时间
export const cardFlipTime=0.4
const startRotateY='180deg'
const startRotateYBack='0deg'

export const DrawHeroModal = styled(Modal)`
.ant-modal-content {
  background-color: rgba(0,0,0,0);
  .row{
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .btnLeftMargin{
    margin-right:48px;
  }
  @keyframes cardFlop
  {
    from { 
      transform: rotateY(${startRotateY});
      z-index:1
    }
    to { 
      transform: rotateY(360deg);
      z-index:100;
    }
    
  }
  @keyframes cardFlopBack
  {
    from { transform: rotateY(${startRotateYBack});}
    to { transform: rotateY(180deg);}
  }
  .bgBox{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.2;
   
    z-index:1;
    img{ 
      width:80%;
    }
  }

  .heroContent{
    display:flex;
    flex-wrap:wrap;
    min-height:600px;
    .faItem{
      position: relative;
      width:200px;
      height:300px;

    }
    .heroItem, .cardBack{
      // width:230px;
      // height: 342px;
      display:flex;
      flex-direction: column;
      position: relative;
      transform-style: preserve-3d;      
    }
    .luckImg img{
      width: calc(100% + 88px);
      height: calc(100% + 66px);
      margin-left: -44px;
      margin-top: -33px;
    }
    .heroItem{
      background: url(${heroBg}) no-repeat;
      background-size: 100% 100%;
      width:100%;
      height:100%;
      transform: rotateY(${startRotateY});
      animation-fill-mode: forwards !important;
      // backface-visibility: hidden;
      animation:cardFlop ${cardFlipTime}s 1;
      animation-delay:inherit;
    }
    .cardBack{
      animation-delay:inherit !important; 
      position: absolute;
      top:0;
      left:0;
      right:0;
      z-index:10;
      // background: url(${cardBg}) no-repeat;
      background-size: 100% 100%;
      width:100%;
      height:100%;
      animation:cardFlopBack ${cardFlipTime}s 1;
      padding:0;
    }
    .heroImg{
      margin-top:20px;
      margin-bottom:-5px;
    }
    .Occupations{
      position: absolute;
      top:15px;
      left:20px;
      font-weight: bold;
      color: #402D1A;
    }
    .mainAttrBox{
      position: absolute;
      top:20px;
      right:10px;
      padding:4px 10px;
      line-height:1;
      font-size:14px;
      font-weight: bold;
      background-color:rgba(110,86,62,0.42)
    }
    .hero-bottom{
      display:flex;
      align-items: center;
      justify-content: space-between;
    }
    .heriTotal{
      font-family: FZLanTingHei-B-GBK;
    }


  }
  
  @media screen and (max-width: 768px) {
    .ant-modal-body {
      padding:0px !important;           
      .btnGroupItem{
        width:37.2vw;
      }
    }
    .bgBox{
      height:172px;
      img{ 
        width:24.5vw;
      }
    }
    .mark{
      top:10px !important;
      right:5px !important;
      height:20px !important;
    }

    .heroContent{
      display:block !important;
      column-count:3;
      .faItem:nth-of-type(4), .faItem:nth-of-type(5), .faItem:nth-of-type(6), .faItem:nth-of-type(7) {
        height: auto;
           padding-top:1.6vw;
           .cardBack{
            padding-top:1.6vw;
           }
           .luckImg img{
            width: calc(100% + 14vw);
            height: calc(100% + 12vw);
            margin-left: -7vw;
            margin-top: -6vw;
          }
        }
        .qualityText{
          display: none;
        }
        .faItem{
          padding-top:8.3vw;
          width:29.3vw;
          height: auto;
        }
        .cardBack{
          padding:8.3vw 0 0 0;
          display: block;
        }
        .heroItem{
          break-inside:avoid;
          box-sizing: border-box;
          width:29.3vw;
          padding:2.7vw;
        }  
        .luckImg img{
          width: calc(100% + 14vw);
          height: calc(100% + 18vw);
          margin-left: -7vw;
          margin-top: -13vw;
        }
   
        .Occupations{
          font-size: 3.8vw;
          top:2.7vw;
          left:2.7vw;
        }
        .heroImg{
          width:22vw;
          margin-top:3.5vw;
          margin-bottom:-1vw;
        }
        .mainAttrBox{
          position: absolute;
          top:4.4vw;
          right:1vw;
          padding:2px 3px;
          line-height:1;
          font-size:8px;
          font-weight: bold;
        }
        .qualityImg{
          width:3.1vw;
          height:3.1vw;
          margin-right:0.5vw
        }
        .heroText{
          font-size:2vw
        }
        .heriTotal{
          display:flex;
          flex-wrap:nowrap;
        }
        
    }
  }



  
}
`
export const ResultModal = styled(Modal)`
  width: 80% !important;
  max-width: 520px !important;
  .ant-modal-content {
    background: url(${resultDialogBg}) no-repeat;
    background-size: 100% 100%;

    .content {
      color: #BAA694;
    }

    @media screen and (max-width: 768px) {
      .es-button {
        height: 40px;
        width: 160px;

        span {
          font-size: 18px;
        }
      }
    }

  }
`
export const ResultModalPve = styled(Modal)`
  width: 80% !important;
  max-width: 570px !important;
  .ant-modal-content {
    background: url(${resultDialogBg}) no-repeat;
    background-size: 100% 100%;
    color: #BAA694;
    .textMain{
      text-align:center;
      font-size:18px;
      display:flex;
      flex-direction: column;
      align-items:center;
      width:100%;
      
    }
    .iconImg{
      // transform: translateY(calc(-50% - 24px));
      margin-top:-75px;
    }
    .btnMargin{
      height:20px
    }
    .equipBox{
      width:100%;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .equipBoxItem{
        margin-right:16px;
        margin-bottom:15px;
        
        .equipBoxItemText{          
          color: #BAA694;
          font-size:16px;
          margin-top:10px;
          line-height:1;
        }
      }
    }
    
    
    @media screen and (max-width: 768px) {
      transform: rotate(90deg);
      .equipBox{
        margin-bottom:10px;
        max-height: 160px;
        overflow-y: auto;
        .equipBoxItem{
          .equipBoxItemText{
            font-size:12px;
          }
          .equipItem{
            width:50px !important;
            height:50px !important;
          }
        }
        
      }
      .iconImg{
        // transform: translateY(calc(-50% - 24px));
        margin-top:-50px;
      }
      .btnMargin{
        height:0px
      }
      .es-button {
        height: 40px;
        width: 160px;

        span {
          font-size: 18px;
        }
      }
    }

  }
`
export const InputModalStyle = styled(Modal)`
.ant-modal-content {
  background: url(${HeroDialogBg}) no-repeat;
  background-size: 100% 100%;
  .row{
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .titleText{
    font-family: FZLanTingHei-B-GBK;
    font-weight: bold;
    color: #B2856C;
  }
  .inputClass{
    background: rgba(12, 9, 8, 0.49);
    border: 1px solid #281E18;
    border-radius: 2px;
    color: #664F42;
    font-size: 18px;
    font-family: FZLanTingHei-R-GBK;
    font-weight: 400;
  
    margin: 28px 0;
    .ant-input{
      background: rgba(12, 9, 8, 0.49);
      border: 1px solid #281E18;
      border-radius: 2px;
      color: #664F42;
      font-size: 16px;
      font-family: FZLanTingHei-R-GBK;
      font-weight: 400;
      ::-webkit-input-placeholder{
        color:red;
        font-size: 10px;
        font-family: FZLanTingHei-R-GBK;
        font-weight: 400;
        color: #664F42;
    }
    }
    .ant-input-group-addon{
      background: rgba(12, 9, 8, 0.49);
      border: 1px solid #281E18;
      border-radius: 2px;
      color: #664F42;
      font-size: 16px;
      font-family: FZLanTingHei-R-GBK;
      font-weight: 400;
      cursor: pointer;
    }
    
    // line-height: 70px;
  }
}
`
