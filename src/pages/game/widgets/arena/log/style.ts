import styled from '@emotion/styled'
import heroBg from 'src/assets/images/game/hero/Hero-bg.png'
import leftRed from 'src/assets/images/game/arena/leftRed.png'
import rightRed from 'src/assets/images/game/arena/rightRed.png'
import leftBlue from 'src/assets/images/game/arena/leftBlue.png'
import rightBlue from 'src/assets/images/game/arena/rightBlue.png'
export const PvpLogStyle = styled.div`
color:#B2856C;
width:1200px;
margin:0 auto;
.colorText{
  color:#FFAA31;
}
.receiveEquip{
  width:500px;  
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.record {
  display: flex;
  flex: 1;
  justify-content:space-between;
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
.receiveBox{
    background: linear-gradient(90deg, #110B0B, #281A17);
    border: 1px solid #998774;
    border-radius: 8px;
    padding:25px 20px  25px 30px;
  
    .receiveItem-title{
        min-width:150px !important;
    }
    .receiveItem{
        padding-right:66px;        
        font-weight: bold;
        font-size:20px;
        min-width:120px;
        p{
            min-width:80px;
            max-width:500px;
            white-space:nowrap;
            width: min-content;
            overflow: hidden;
            /* display: inline-block; */
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .receiveItemValue{      
            font-size:16px;  
            color: #D2454E;
        }
        .receiveItemKey{
            // min-width:80px;
            white-space:nowrap;
            margin-right:10px;
        }
       
    }
    .receiveItemButton{
        display: flex;
        align-items: center;
        width: 100%;
        // height: 100%;
        justify-content: end;
        

    }


}
//日志列表
.logList{
    padding-top:26px;
    .logItem{
        margin-bottom:18px;
        background: #171212;
        // padding:28px 22px;
        display:flex;
        flex-wrap:nowrap;
        aglin-items:center;
        justify-content: space-between;

        .logItemLeft{
            display:flex;
            flex-wrap:nowrap;
            align-items:center;

        }
        .logItemRight{
          position: relative;
          display:flex;
          flex-direction:column;
     
          .time{
            position: relative;
            right:0px;
            background: #2A1F1F;
            font-size: 14px;
            font-family: PingFang SC;
            white-space:nowrap;
            font-weight: 400;
            color: #AA7F67;
            line-height:1;
            padding:8px 16px 8px 37px;
            &::before{
              content:'';
              position:absolute;
              z-index:2;
              left:0;
              top:0;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 0 30px 30px 0px;
              border-color: transparent transparent #171212 transparent;
            }
          }
          .btnBox{
            height:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            padding-right:15px;
          }
        }
        .heroBox{
          display:flex;
          flex-wrap:nowrap;
          aglin-items:center;
          padding:28px 0px;
          width:354px;
          min-width:354px;
          height:161px;
          min-height:161px;
          position:relative;
          .vsImg{
            position:absolute;
            top:50%;
            right:0px;
            transform:translate(50%, -50%);
            width:57px;
            height:37px;
            z-index:2;
          }
        }
        .leftHero{
          padding-left:25px;
        }
        .rightHero{
          padding-left:75px;
        }

        .leftRed{
          background: url(${leftRed}) 50%  center;
          background-size: cover;
        }
        .rightRed{
          background: url(${rightRed}) 50%  center;
          background-size: cover;
        }
        .leftBlue{
          background: url(${leftBlue}) 50%  center;
          background-size: cover;
        }
        .rightBlue{
          background: url(${rightBlue}) 50%  center;
          background-size: cover;
        }
        //英雄头像
        .heroImgBox{
            position: relative;
            width: 97px;
            height: 97px;
            min-width: 97px;
            min-height: 97px;
            background: url(${heroBg}) no-repeat center;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .winImg{
                position: absolute;
                right:0px;
                top:10px;
                width:82px;
                height:22px;
                
            }
            img:first-of-type {
                height: 90%;
            }
        }
        //英雄信息
        .heroInfo{
            color:#B2856C;
            padding:0 22px 0 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .heroOccupation{
                font-size:20px;
                font-weight:bold;
                .firthImg{
                  width:37px;
                  height:32px;
                  margin-left:8px;
                }
            }
            .heroLv{
                font-size:18px;
                font-weight:blod;
            }
            .heroTokenId{
                font-size:12px;
                color: #B2856C;
            }
            
        }
        .border{
          width: 1px;
          height: 129px;
          background: #2E241E;
        }
        .label{
            font-size: 18px;
            font-weight: bold;
            white-space:nowrap;
            color: #45352D;
        }
        .value{
            font-size: 16px;;
            font-weight: 400;
            color: #B2856C;
            white-space:nowrap;
        }
        //副本信息
        .replica{
            height: 100%;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            padding:27px 0 22px 0px;
            .replicaItemRow{
              display: flex;
             justify-content: space-between;
              .replicaItem{
                padding:0 10px 0 15px;
                .dltText{
                  font-size: 16px;
                  font-family: DIN;
                  font-weight: bold;
                  color: #B2856C;
                }
                .equipText{
                  font-size: 16px;
                  font-family: Adobe Heiti Std;
                  font-weight: normal;
                  color: #B2856C;
                }
              }
            }
            


        }
   
    }
}
@media screen and (max-width: 768px) {
    //标头样式
    width:100%;
    .receiveBox{
        flex-wrap:wrap;
        margin: 1px 10px;
        padding: 15px 10px 15px 10px;

        .receiveItem{
            width:50%;
            padding-right:0px;
            display:flex;
            flex-wrap:nowrap;
            align-items:center;
            font-size:17px;
            .receiveItemValue{
                margin-left: 10px;
                width: auto;
                min-width: auto;
            }
        }
        .spoilsItem{
          width:100%;
        }
        .receiveItem-title{
            // width:100%;
            // margin-right:0px;
            // display:block;
            // text-align:center;
        }

        .receiveItemButton{
            margin-top:10px;
            width:100%;
            align-items: center;
            justify-content: center;
        }
    }
    //列表样式
    .logList{
        .logItem{
            flex-wrap: wrap;
            .heroInfo{
                border-right:none;
            }
            .logItemLeft{
                flex-wrap: wrap;
                .replica{
                    width:100%;
                    height:auto;
                    padding: 10px 10px 8px 10px;
                    // margin-top:10px;
                    // margin-bottom:10px;
                    .replicaItem{
                        display:flex;
                        align-items: center;
                        width:100%;
                        flex-wrap:nowrap;
                        padding:0px;
                        .label{
                            margin-right:20px;
                            font-size:16px;
                        }
                    }
                }
            }
            .logItemRight{
                width:100%;
                align-items: end;
                border-top: 1px solid #2E241E;
                .time{
                  width: fit-content;
                  right:0px;
                }
                .btnBox{
                  padding:10px 0 20px 0px;
                  width: 100%;
                }
               
            }
            .heroBox{
              .vsImg{
                top:auto;
                left:50%;
                right:auto;
                bottom:-28px;
                transform:translate(-50% , calc( 50% - 28px ));
 
              }
            }
            .rightHero{
              padding-left:25px;
            }
            .border{
              display:none;
            }
        }
    }
}
`
