import styled from '@emotion/styled'
import heroBg from 'src/assets/images/game/hero/Hero-bg.png'
export const PveLogStyle = styled.div`
color:#B2856C;
padding-top:80px;
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
            min-width:40px;
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
        padding:28px 22px;
        display:flex;
        flex-wrap:nowrap;
        aglin-items:center;
        justify-content: space-between;
        .logItemLeft{
            display:flex;
            flex-wrap:nowrap;
            aglin-items:center;
        }
        //英雄头像
        .heroImgBox{
            position: relative;
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
        //英雄信息
        .heroInfo{
            color:#B2856C;
            padding:0 22px 0 30px;
            border-right:1px solid #2E241E;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .heroOccupation{
                font-size:20px;
            }
            .heroLv{
                font-size:18px;
                font-weight:blod;
            }
            .heroTokenId{
                font-size:14px;
                color: #B2856C;
            }
            
        }
        .label{
            font-size: 18px;
            font-weight: bold;
            color: #45352D;
        }
        .value:{
            font-size: 16px;;
            font-weight: 400;
            color: #B2856C;
        }
        //副本信息
        .replica{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .replicaItem{
                padding:0 26px 0 24px;
            }


        }
        //副本挑战状态
        .state{
            padding:0 93px 0 42px;
            border-left:1px solid #2E241E;
            .win,.fail{
                font-size: 36px;
                font-weight: bold;                
            }
            .win{
                color: #D68C3F;
            }
            .fail{                
                color: #AEA69E;
            }
        }
    }
}
@media screen and (max-width: 768px) {
    //标头样式
    .receiveBox{
        flex-wrap:wrap;
        margin: 1px 10px;
        .receiveItem{
            width:50%;
            padding-right:0px;
            display:flex;
            flex-wrap:nowrap;
            align-items:center;
            .receiveItemValue{
                margin-left: 10px;
            }
        }
        .receiveItem-title{
            width:100%;
            margin-right:0px;
            display:block;
            text-align:center;
        }
        .receiveItem-keyBox{
            width:100%;
            .receiveItem-keyBox-right{
                flex-wrap:wrap;
                margin-left:10px;
                // flex-direction: column;
                // width:50%;
                .receiveItemKey{
                    margin-left:0px;
                    // margin-right:4px;
                }
            }
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
                    margin-top:10px;
                    margin-bottom:10px;
                    .replicaItem{
                        display:flex;
                        align-items: center;
                        width:100%;
                        flex-wrap:nowrap;
                        padding:0px;
                        .label{
                            margin-right:20px;
                            white-space:nowrap;
                        }
                    }
                }
            }
            .logItemright{
                padding:0px;
                display:flex;
                width:100%;
                align-items: center;
                justify-content:space-between;
                border-left:none;
            }
        }
    }
}
`
