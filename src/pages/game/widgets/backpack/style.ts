import styled from '@emotion/styled'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import personBg from 'src/assets/images/game/backpack/person_bg.png'
import backpackBg from 'src/assets/images/game/backpack/packet_bg.png'
import roletitleBg from 'src/assets/images/game/card/role_title_bg.png'
import barTitleBg from 'src/assets/images/game/hero/bar_title.png'
import square1 from 'src/assets/images/game/backpack/square1.png'
import square2 from 'src/assets/images/game/backpack/square2.png'
import square3 from 'src/assets/images/game/backpack/square3.png'
import square4 from 'src/assets/images/game/backpack/square4.png'
import square5 from 'src/assets/images/game/backpack/square5.png'
import square6 from 'src/assets/images/game/backpack/square6.png'
import square7 from 'src/assets/images/game/backpack/square7.png'
import square8 from 'src/assets/images/game/backpack/square8.png'
import square9 from 'src/assets/images/game/backpack/square9.png'
import attrBg from 'src/assets/images/game/backpack/attr_bg.png'
// import square from 'src/assets/images/game/backpack/square.png'
import square from 'src/assets/images/game/backpack/equipBox.png'

export const BackPackWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  //-----特效闪光效果start
  .raritySupperCom{
    position:absolute;
    top:0px;
    left:0px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 801;
  }
  //2星样式
  .raritySupper2{
    // background: url(${require('src/assets/images/game/backpack/equipBg/bg_png')}) no-repeat ;
    // background-size:68px auto;
    // background-position: -6px -6px;
    // animation: bgAnimation2 1s steps(16)  infinite;
  } 
  @keyframes bgAnimation2{
    //0  6  +68
    //1  74 +68
    //2  142 +70
    //3  212 +68
    //4   280+68
    //5   348+68
    //6   418+70
    //7 486 +68
    //8 554+68
    //9 622 +68
    //10  690
    //11  
    //16 1033
    0% { background-position: -6px -6px; }
    // 6.25% { background-position: -6px -74px; }
    // 12.5% { background-position: -6px -142px; }
    // 18.75% { background-position: -6px -212px; }
    // 25% { background-position: -6px -280px; }
    // 31.25% { background-position: -6px -348px; }
    // 37.5% { background-position: -6px -418px; }
    // 43.75% { background-position: -6px -486px; }
    // 50% { background-position: -6px -554px; }
    // 56.25% { background-position: -6px -622px; }
    // 62.5% { background-position: -6px -690px; }
    // 68.75% { background-position: -6px -758px; }
    // 75% { background-position: -6px -826px; }
    // 81.25% { background-position: -6px -894px; }
    // 87.5% { background-position: -6px -964px; }
    // 93.75% { background-position: -6px -1032px; }
    100% { background-position: -6px -1100px; } 
  }

  //4星样式
  .raritySupper4{
    background: url(${require('src/assets/images/game/backpack/equipBg/bg_start_4.png')}) no-repeat ;
    background-size:64px auto;
    background-position: -4px -4px;
    animation: bgAnimation4 1s steps(8)  infinite;
  }
  @keyframes bgAnimation4{
    0% { background-position: -4px -4px; }
    100% { background-position: -4px -520px; } 
  }
  //5星
  .raritySupper5{
    background: url(${require('src/assets/images/game/backpack/equipBg/bg_start_5.png')}) no-repeat ;
    background-size:64px auto;
    background-position: -4px -4px;
    animation: bgAnimation5 1s steps(8)  infinite;
  }
  @keyframes bgAnimation5{
    0% { background-position: -4px -4px; }
    100% { background-position: -4px -520px; } 
  }
  //--------特效闪光效果end
  .forgeLv{
    position: absolute;
    font-size:12px;
    color: #ecae18;
    top:1px;
    right:3px;
    z-index:800;
  }
  .forgeCdTime{
    position: absolute;
    font-size:12px;
    color: #D1AC86;
    bottom:0px;
    left:0px;
    z-index:800;
    width:100%;
    display:flex;
    align-items:center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.75);
    .icon{
      font-size:12px;
    }
  }
  .hero {
    width: 686px;
    background: url(${personBg}) no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 22px 49px;

    .title {
      width: 48.5%;
      /* height: 44px; */
      height: 4.2%;
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

    .chose-hero {
      width: 100%;
      height: 115px;
      display: flex;
      justify-content: center;
      align-items: center;

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 257px;
        height: 48px;
        margin-top: 20px;
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
      justify-content: space-between;
      margin-top: 42px;
      .hero-eq-item{
        width: 56px;
        height: 56px;
        margin-bottom: 20px;
      }
      .heroEquipItems{
        position:relative;
        margin-bottom:20px;
      }
      
      .eq-item {
        width: 56px;
        height: 56px;
        border-radius: 4px;
        background-size: 100% !important;
        &:not(:last-of-type) {
          margin-bottom: 20px;
        }
      }

      .left {
        display: flex;
        flex-direction: column;

        .eq-item {
          &:nth-of-type(1) {
            background: url(${square1}) no-repeat center;
          }
          &:nth-of-type(2) {
            background: url(${square2}) no-repeat center;
          }
          &:nth-of-type(3) {
            background: url(${square3}) no-repeat center;
          }
          &:nth-of-type(4) {
            background: url(${square4}) no-repeat center;
          }
          &:nth-of-type(5) {
            background: url(${square5}) no-repeat center;
          }
        }
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

      .right {
        display: flex;
        flex-direction: column;

        .eq-item {
          &:nth-of-type(1) {
            background: url(${square6}) no-repeat center;
          }
          &:nth-of-type(2) {
            background: url(${square7}) no-repeat center;
          }
          &:nth-of-type(3) {
            background: url(${square8}) no-repeat center;
          }
          &:nth-of-type(4) {
            background: url(${square4}) no-repeat center;
          }
          &:nth-of-type(5) {
            background: url(${square9}) no-repeat center;
          }
        }
      }
    }

    .attr-desc {
      width: 100%;
      height: 349px;
      background: url(${attrBg}) no-repeat center;
      background-size: 100% 100%;
      margin-top: 47px;
      padding: 40px;

      .at-item {
        width: 50%;
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        img {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
        .text {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          font-weight: bold;
          color: #482D2D;
        }
        .heroEquipAddStr{
          margin-left:10px;
          color: #9f0a0a;
          min-width: 35px;
          display: inline-block;
          text-align: right;
        }
        &:nth-of-type(even) {
          padding-left: 20px;
        }

        &:nth-of-type(odd) {
          padding-right: 20px;
        }
      }

      .attr-top {
        display: flex;
        flex-wrap: wrap;
      }

      .attr-bottom {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
      }
    }
  }

  .backpack {
    max-width: 486px;
    height: 541px;
    background: url(${backpackBg}) no-repeat center;
    background-size: 100% 100%;
    margin-left: 20px;
    position: relative;
    box-sizing: border-box;
    padding: 0 26px;

    .bp-title {
      height: 40px;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #BAA694;
    }

    .panel {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 16px;
      height:400px;
      overflow-y:scroll;
      padding:0 5px;
      &::-webkit-scrollbar {
        width: 2px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #2b2624;
        border-radius: 4px;
      }

      .p-item {
        width: 56px;
        height: 56px;        
        background: url(${square}) no-repeat center;
        background-size: 100% 100%;
        margin-bottom: 12px;
        display:flex;
        align-items: center;
        justify-content: center;
        position:relative;

        img{
          // width:75%;
          height:90%;
          cursor: pointer;
        }
      }
      .rarity1{
        background: url(${require('src/assets/images/game/backpack/equipBg/bg_1x.png')}) no-repeat center;
      }
      .rarity2{
        background: url(${require('src/assets/images/game/backpack/equipBg/bg_2x.png')}) no-repeat center;
      }
      .rarity3{
        background: url(${require('src/assets/images/game/backpack/equipBg/bg_3x.png')}) no-repeat center;
      }
      .rarity4{
        background: url(${require('src/assets/images/game/backpack/equipBg/bg_4x.png')}) no-repeat center;
      }
      .rarity5{
        background: url(${require('src/assets/images/game/backpack/equipBg/bg_5x.png')}) no-repeat center;
      }
      
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0 4px;
    //--闪光特效动画start
    //4星样式
    .raritySupper4{
      background: url(${require('src/assets/images/game/backpack/equipBg/bg_start_4.png')}) no-repeat ;
      background-size:46px auto;
      background-position: -3px -3px;
      animation: bgAnimation4 1s steps(8)  infinite;
    }
    @keyframes bgAnimation4{
      0% { background-position: -3px -3px; }
      100% { background-position:-3px -374px; } 
    }
    //5星
    .raritySupper5{
      background: url(${require('src/assets/images/game/backpack/equipBg/bg_start_5.png')}) no-repeat ;
      background-size:46px auto;
      background-position: -3px -3px;
      animation: bgAnimation4 1s steps(8)  infinite;
    }
    @keyframes bgAnimation5{
      0% { background-position: -3px -3px; }
      100% { background-position:-3px -374px; } 
    }
    ///--闪光特效动画end
    #modalShowEquip{
      .ant-modal-wrap{
        overflow: hidden !important;
      }
    }
    .hero {
      width: 100%;
      padding: 0 4.7% 7.6%;
      align-items: flex-start;
      .attr-desc{
        margin-top:-60px;
        // padding-top:30px;
        .at-item{
          margin-bottom:20px;
          .text{
            font-size:14px;
            line-height:1;
            flex-direction: column;
            justify-content: start; 
            align-items: start;
            .num{
              margin-top:4px;
            }
          }
          .heroEquipAddStr{
            min-width:30px;
            margin-left:5px;
          }
        }
       
      }
      .equipment{
        margin-top:0px;
        .center {
          .relative {
            .heroImg{
              height:auto;
              margin-top:20px !important;
            }
          }
        }
      }
      .HeroImgCss img{
        // height: 330px;
        // width:auto !important;
      }

      .eq-item,.box {
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
      height:500px;
      overflow: hidden;
      margin-left: 0;
      .tabs {
        height: calc(100% - 10px);
      }
      .panel {
        height: calc(100% - 120px);
        // padding-bottom:20px;
        overflow-y: auto;
        // justify-content: flex-start;
        flex-wrap: wrap;

        .p-item {
          width: 40px;
          height:40px;
          background-size: 100%;
        }

      }
    }
  }
`
export const BackPackForgeWrapper = styled.div`
.clossBack{
  margin-bottom:-52px;
  z-index:80;
  position: relative;
  width: fit-content;
}
`
export const MTabs = styled(Tabs)`
  .MuiTab-root {
    color: #b2856c;
    padding: 0;
    padding: 0 10px;
    min-width: unset;
    font-size: 14px;
    text-transform: unset;
    font-family: bod, lanting, sans-serif;


    &.Mui-selected {
      color: #f45250;
    }

  }

  .MuiTabs-indicator {
    display: none;
  }

  .MuiButtonBase-root {


    &.Mui-disabled {
      opacity: .5;
    }

    .MuiSvgIcon-root {
      font-size: 25px;
    }
  }

`

export const MTab = styled(Tab)`

`
