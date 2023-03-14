import styled from '@emotion/styled'
import bg from 'src/assets/images/game/backpack/forge/bg.png'
import h5bg from 'src/assets/images/game/backpack/forge/h5bg.png'
import boxBg from 'src/assets/images/game/backpack/forge/boxBg.png'
import roletitleBg from 'src/assets/images/game/card/role_title_bg.png'
// import boxItemBg from 'src/assets/images/game/backpack/forge/boxItemBg.png'
import boxItemBg from 'src/assets/images/game/backpack/equipBox.png'
export const ForgeStyle = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  margin:20px auto 0;
  // align-items:center;
  // width:980px;
  .backDom{
    margin-left:-100px;
  }
  .topRow{
    padding-right:80px;
    display:flex;
    align-items: center;
    justify-content:end;
    .record {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      img{
        cursor: pointer;  
      }
      span {
        cursor: pointer;  
        margin-left: 8px;
        font-size: 18px;
        text-decoration: underline;
        color: #B2856C;
      }
    }
  }
  .main{
    display:flex;
    flex-wrap:wrap;
    width:1126px;
    height:823px;
    justify-content:space-between;
    background: url(${bg}) no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding:100px 85px;
    flex-wrap:nowrap;
    .title{
      width: 360px;
      /* height: 44px; */
      height: 1;
      text-align: center;
      line-height: 40px;
      background: url(${roletitleBg}) no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      top: 15px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 18px;
      font-weight: bold;
      color: #BAA694;
    }
    .leftContent{
      padding-top:50px;
      margin:0 0 0 35px;
      .forgeBox{
        background: url(${boxBg}) no-repeat center;
        background-size: 100% 100%;
        width:362px;
        height:352px;
        position: relative;
        .boxItem{
          cursor: pointer;
          position: absolute;
          display:flex;
          align-items: center;
          justify-content: center;
          background: url(${boxItemBg}) no-repeat center;
          background-size: 100% 100%;
          width:72px;
          height:72px;
          .img{
            // width:60%;
            height:60%;
          }
          .equipImg{
            // width:75%;
            height:90%;
          }
          .boxItemDec{
            display:flex;
            align-items: center;
            justify-content: center;
            padding:8px 10px;
            width: max-content;
            height: 20px;
            background: #0F0B0B;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #BAA694;
            margin-top:10px;
            position: absolute;
            left: 50%;
            bottom:0px;
            transform: translateX(-50%) translateY(100%);
          }
        }
        .mainItem{
          top: 0%;
          left: 50%;
          width:97px;
          height:97px;
          transform: translateX(-50%);
        }
        .leftItem{
          bottom: 15%;
          left: 3%;
        }
        .rightItem{
          bottom: 15%;
          right: 4%;
        }
      }

      
    }
    .textBox{
      width:400px;
      height:200px;
      margin-top:20px;
      overflow-y: auto;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #7E6B5A;
      line-height: 24px;
      
    }
    .bottomTextBox{
      display:none;
    }
    .rightContent{
      min-width:450px;
      width:500px;

      font-family: PingFang SC;
      padding:20px 35px 0 0;

      .titleRow{
        padding:23px 0px 23px 0;
        border-bottom: 2px solid #707070;
        display:flex;
        flex-wrap:nowrap;
        align-items:center;
        .equipName{
          font-size: 24px;
          font-weight: bold;
          color: #BAA694;
        }
        .equipUpLevel{
          font-size:18px;
          color:#F19149;
          margin:0 24px 0 4px;
        }
      }
      .attrRow{
        margin:26px 0 44px 0;
        background: #0F0B0B;
        border-radius: 12px;
        padding:0px 35px 25px 40px;
        color: #BAA694;
        height:360px;
        overflow:auto;
        .attrItem{
          padding:22px 0;
          border-bottom: 2px solid rgba(112,112,112,0.15);
          display:flex;
          align-items:center;
          justify-content:space-between;
          .attrLeft{
            .attrName{
              font-size:18px;
              margin-right:20px;
              min-width:72px;
              display: inline-block;
            }
            .attrNumber{
              font-size:16px;
              font-weight: bold;             
              font-family: DIN;
            }
          }
          .attrRight{
            display:flex;
            align-items: center;
            .transIcon{
              width:14px;
              height:14px;
              transform: rotate(-90deg);
            }
            .newAttrNumber{
              color:#ECAE18;
              font-size:16px;
              font-weight: bold;              
              font-family: DIN;
              margin:0 26px;
            }
            .topIcon{
              width:10px;
              height:15px;
            }
          }
        }
      }
      .btnRow{
        display:flex;
        align-items: center;
        justify-content:space-between;
        flex-wrap:nowrap;
        .btnRowItem{
          display:flex;
          flex-direction: column;
          justify-content:center;
          button{
            font-size:20px;
          }
          .btnPrice{
            margin-top:13px;
            text-align: center;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #B2856C;
          }

        }
      }

    }
  }
  
  @media screen and (max-width: 768px) {
    width:100vw;
    .backDom{
      margin-left:0px;
    }
    .main{
      background: url(${h5bg}) no-repeat center;
      padding: 0px 0px;
      margin-top:30px;
      flex-direction: column;
      align-items: center;
      background-size: 100% 100%;
      justify-content:flex-start;
      width: 100vw;
      .title{
        width:65%;
        top:-10px;
      }
      .textBox{
        width:100%;
        height:50px;
        padding:0 10px;
        font-size:10px;
        display:none;
      }
      .topTextBox{
        display:none;
      }
      .bottomTextBox{
        display:block;
        height:200px;
      }
      .leftContent{
        width:90%;
        margin:0px 0 0 0px;
        display:flex;
        flex-direction: column;
        align-items: center;       
        .forgeBox{
            width:181px;
            height:176px;
            .boxItem{
              // width:52px;
              // height:52px;
              width:37px;
              height:37px;
            }
           .mainItem{
            top: 0%;
            left: 50%;
            width:49px;
            height:49px;
            transform: translateX(-50%);
          }
        }

      }
      .rightContent{
        margin-top:12px;
        // transform: scale(0.7);
        width:60%;
        min-width:300px;
        padding:0px;
        .titleRow{
          padding: 10px 0px 10px 0;
          display:flex;
          justify-content:space-between;
          .starItem{
            width:12px;
            height:12px;
          }
          .equipName{
            font-size: 15px;
            font-weight: bold;
            color: #BAA694;
          }
          .equipUpLevel{
            font-size:12px;
            color:#F19149;
            margin:0 24px 0 4px;
          }
        }
        .attrRow{
          padding: 0px 15px 5px 20px;
          margin: 10px 0 23px 0;
          border-radius:6px;
          height:180px;
          max-height:250px;
          .attrItem{
            padding:10px 0;
           
            .attrLeft{
              display:flex;
              align-items: center;
              .attrName{
                font-size:14px;
                margin-right:10px;
              }
              .attrNumber{
                font-size:14px;
                font-weight: bold;             
                font-family: DIN;
              }
            }
            .attrRight{
              .transIcon{
                width:14px;
                height:14px;
                transform: rotate(-90deg);
              }
              .newAttrNumber{
                color:#ECAE18;
                font-size:16px;
                font-weight: bold;              
                font-family: DIN;
                margin:0 26px;
              }
              .topIcon{
                width:10px;
                height:15px;
              }
            }
          }
        }
        .btnRow{
          .btnRowItem{
            .es-button{
              width:90px;
              height:30px;
              line-height:30px;
              button{
                font-size:14px;
              }
            }
            .btnPrice{
              margin-top:7px;
              font-size:12px;
            }
          }
        }
      }
    }
  }
`
