import styled from '@emotion/styled'


import backpackBg from 'src/assets/images/game/alchemy/left_bg.png'
import personBg from 'src/assets/images/game/alchemy/right_bg.png'
import roletitleBg from 'src/assets/images/game/card/role_title_bg.png'
import barTitleBg from 'src/assets/images/game/hero/bar_title.png'


export const AlchemyWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  .title {
    width: 300px;
    /* height: 44px; */
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: url(${roletitleBg}) no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: bold;
    color: #BAA694;
  }
  .hero {
    width: 585px;
    background: url(${personBg}) no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 22px 49px;
    height:710px;
    min-height:620px;
 

    .chose-hero {
      width: 100%;
      height: 115px;
      display: flex;
      justify-content: center;
      align-items: center;

      .btn {
        cursor:pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 257px;
        height: 48px;
        margin-top: -10px;
        background: url(${barTitleBg}) no-repeat center;
        background-size: 100% 100%;

        img.decor {
          width: 22px;
          height: 22px;
          margin-right: 4px;
        }
  
        > span {
          font-size: 18px;
          font-weight: normal;
          color: #B2856C;
        }
      }
    }

    .lv {
      padding: 28px 0 19px;
      color: #b2856c;
      font-size: 16px;
      position: relative;
      text-align: center;
    }

    .equipment {
      display: flex;
      justify-content: center;
      margin-top: 0px;
      .back-circular {
        width:410px;
        height:410px;
        margin-top:70px;
      }
      .center {
        width: 352px;
        height: 352px;
        position: relative;
        > img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: auto;
        }
      }


    }

  }

  .backpack {
    max-width: 585px;
    width: 585px;
    min-width:585px;
    min-height:715px;
    background: url(${backpackBg}) no-repeat center;
    background-size: 100% 100%;
    margin-left: 20px;
    position: relative;
    box-sizing: border-box;
    padding: 0 26px;
    margin-top:5px;
    @keyframes textRun
    {
      0% { transform: translate(0,-1080%);}
      100% { transform: translate(0,0%);}

    }
    .starText{
      overflow:hidden;
    }
    .textItem{
      animation-fill-mode: forwards !important;
      animation:textRun 3s 1 ease-out ;
    }
    .tabs{
      overflow: hidden;
    }
    .bp-title {
      height: 40px;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #BAA694;
      margin-top: -6px;
    }

    .panel {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 16px;

      .p-item {
        width: 56px;
        height: 56px;
        margin-bottom: 12px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0 4px;

    .hero {
      width: 100%;
      margin-bottom:40px;
      padding: 0 4.7% 7.6%;
      align-items: flex-start;
      height: 520px;
      min-height: 520px;
      .equipment{
        .back-circular {
          width:300px;
          height:300px;
        }
      }
      .eq-item {
        width: 40px !important;
        height: 40px !important;
      }

      .chose-hero {
        padding-top: 40px;
        
      }

      .center {
        margin: 10px;
        width: 100%;
      }
    }

    .backpack {
      width: 100%;
      // overflow: hidden;
      margin-left: 0;
      margin-left: 40px;
      margin-right: 40px;
      max-width: calc(100vw - 40px);
      min-width:calc(100vw - 40px);
      .priceRow{
        width: 100%;
        padding-left: 0;
        padding-right: 0;
      }
      .tabs {
        height: calc(100% - 40px);
     
        
      }

     
      
      .panel {
        height: calc(100% - 88px);
        overflow-y: auto;
        justify-content: flex-start;
        flex-wrap: wrap;

        .p-item {
          width: 20%;
          height: auto;
          img {
            width: 100%;
            padding: 5px;
            margin: 0 auto;
          }
        }

      }
    }
  }
`

export const HeroAttributes = styled.div`
.line{
  min-width:480px;
  height:1px;
  background: #707070;
  margin-bottom:15px;
}

.titleRow{
  padding-top:80px;
  padding-bottom:22px;
  display:flex;
  .titleItem{
    width:50%;
    display:flex;
    justify-content: space-between;
    padding:0 25px 0 15px;
    font-weight:bold;
    overflow:hidden;
  }
  .textTitleColor{
    color: #D68C3F;
  }
  .numberTitleColor{
    color: #C63A25;
  }
}

.attrBox{
  position: relative;

  .tramsferImg{
    position: absolute;
    width:14px;
    z-index:10; 
    // left:calc(50% - 4px);
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    transform:rotate(270deg);
  }

  .attItemRow{
    display:flex;
    // margin-bottom:40px;
    .attrItem{
      overflow: hidden;
      width:50%;
      max-width:50%;
      min-width:50%;
      display:flex;
      justify-content: space-between;
      margin:0 25px 0 15px;
      color:#BAA694;
      background: #0F0B0B;
      padding:10px 30px 20px 20px;
      position: relative;
      &:nth-of-type(1){
        margin:0 10px 0 0px;
      }
      &:nth-of-type(2){
        margin:0 0px 0 10px;
      }
      .lockImg{
        position:absolute;
        width:16px;
        right:10px;
      }
    }
    
    .leftItem{
      margin-right: 25px;

    }
  }

  .mianAttNumColor{
    color: #ECAE18;
  }
  .mianAttTextColor{
  color:#D02316;
  }
  .baseColor{
    color:#BAA694;
  }
}

.infoText{
  color:#7E6B5A;
  padding:30px 25px 30px 15px ;
}
.radioColor{
  color:#B2856C;
  justify-content: space-between;
}
@media screen and (max-width: 768px) {
  .attrBox{
    .tramsferImg{
      // transform:translate(-100%,-50%) rotate(270deg);
      left:calc(50%);
    
    }
     .attItemRow{
      .attrItem{
        width:50%;
        max-width:50%;
        
        justify-content: space-between;
        // padding:10px  10px  20px  10px ;
        &:nth-of-type(1){
          margin:0 10px 0 0px;
          padding-right:25px;
          padding-left:10px;
        }
        &:nth-of-type(2){
          padding-left:10px;
          margin:0 0px 0 10px;
        }
       
      } 
      .leftItem{
        margin-right: 10px;
      }
    }
  }

}

`


