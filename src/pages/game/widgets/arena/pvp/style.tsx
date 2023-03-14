import styled from '@emotion/styled'
import roletitleBg from 'src/assets/images/game/card/role_title_bg.png'
import radioBg from 'src/assets/images/game/adventure/radioBg.png'
import hpBg from 'src/assets/images/game/adventure/hpBgImg.png'
export const PVPStyle = styled.div`
.attackedAudio{
    position:absolute;
    left:0;
    top:0;
    visibility: hidden;
}
.page{
    img {
        -webkit-user-drag: none;
    }
    margin-top:60px;
    position:relative;
    width:1200px;
    .topLeftIcon{
        left:-18px;
    }
    .topRightIcon{
        right:-18px;
    }
    .topLeftIcon,.topRightIcon{
        top:-19px;
        position:absolute;
    }
    .bottomLeftIcon{
        left:-18px;
    }
    .bottomRightIcon{
        right:-18px;
    }
    .bottomLeftIcon,.bottomRightIcon{
        bottom:-19px;
        position:absolute;
        transform: rotate(180deg);
    }
    .main{
        width:100%;
        height:600px;
        border: 1px solid #998774;
        background:  no-repeat center 100%;
        position:relative;
       
        .pveTitle{
            background: url(${roletitleBg}) no-repeat center;
            width:330px;
            height:40px;
            background-size: 100% 100%;        
            color: #BAA694;
            display:flex;
            align-items: center;
            justify-content: center;
            position:absolute;
            top:0;
            left:50%;
            transform:translate(-50%,0%);
            margin:-20px 0 0 0;        
            font-size: 20px;
        }       
        .roundBox{
            font-size: 30px;
            font-family: Britannic Bold;
            font-weight: bold;
            color: #FFFEFE;
            span{
                position:absolute;
                top:18px;
                line-height:1;
            }

        } 
        .heroContent{
            padding:20px 0 0 0;
            width:100%;
            height:100%;
            display:flex;
            flex-wrap:nowrap;
            position:relative;
            .center-common{
                position:absolute;
                height:100%;
                top:0;
                left:50%;
                transform:translate(-50%,0%);
                z-index:20;
                display:flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                .priorityAttack_left{
                    position:absolute;
                    top: calc( 50% - 0px );
                    transform:translate(0%,-50%);                   
                    left:-50px;
                }
                .priorityAttack_right{
                    position:absolute;
                    top: calc( 50% - 0px );
                    transform:translate(0%,-50%) rotate(180deg);
                    right:-50px;
                }
                .vsText{
                    padding-top:50px;
                    font-size: 30px;
                    font-weight: bold;
                    color: #B2856C;
                    line-height: 1;
                }
                .message{
                    text-align: center;    
                    position: relative;           
                    color: #BAA694;                
                    font-size: 18px;
                    font-weight: bold;
                    background-color:rgba(0,0,0,0.5);
                    padding:30px 25px;
                    // overflow:hidden;
                    min-width:205px;
                    .BossImg{
                        position:absolute;
                        right:0;
                        top:0;
                        transform: translate(100%,-100%)
                    }
                    .bossMoney{
                        height:50px;
                    }
                    .title{                    
                        color: #D02316;
                        padding-bottom:20px;
                    }
                    @keyframes centerMessage
                    {
                      0% { transform: translate(0,100%);}
                      100% { transform: translate(0,0%);}
                
                    }
                    .message-hide{
                        overflow:hidden;
                        position: relative;  
                        .messageContent{
                            animation-fill-mode: forwards !important;
                            animation:centerMessage 1s 1 ease-out ;
                        }
                    }
                   

                }
                .gold{
                    text-align: center;  
                    font-size: 18px;
                    font-weight: bold;
                    color: #BAA694;
                    padding-bottom:37px;
                    .equipNameItem{
                        margin-right:5px;
                        font-size:16px;
                    }
                }
            }
            .heroItem{
                width:50%;            
                .heroHeadImg{
                    border-radius:50%;
                    width: 59px;
                    height: 59px;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    overFlow:hidden;
                    background: url(${radioBg}) no-repeat center center;
                    position: relative;
                    img{
                        width: 59px;
                        height: 59px;
                    }               
                }
                .heroHeadImg-left{
                    margin:0 12px 0 0px;

                }
                .heroHeadImg-right{
                    margin: 0 0 0 12px;
                    
                   img{
                    // margin: 10px 0 0 -25px;
                    // height: 100px;
                    width: auto!important;
                    position: absolute;
                    z-index: 10;
                   }
                   .heroHeadImgborderbox{
                        position: relative;
                        overflow: hidden;
                        height: 59px;
                        width: 59px;
                        border-radius: 50%;
                        // margin-top: -15px;
                   }

                }
                .heroHpBg{                    
                    height:25px;
                    width:432px;
                    margin:12px 0 14px 0;
                    display:flex;
                    align-items: center;
                    position:relative;
                    z-index:10;
                    &::after {
                        content: "";
                        width:100%;
                        display: block;
                        background: url(${hpBg}) no-repeat center center ;
                        background-size: 100% 100%;
                        padding-bottom: 5.53%;
                        position: absolute;
                        left:0;
                        top:0;                        
                    }
                    .hpText{
                        font-size:14px;
                        font-weight: 400;
                        position: absolute;
                        color: #FFFFFF;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 50;
                    }
                    .heroHpValue{
                        height:100%;
                        width:100%
                        position:absolute;
                        left:0;
                        z-index:0;
                        height:15px;

                    }
                }
                @keyframes heroImgDie_left
                {
                    0% {opacity:100%;}
                    100% { opacity:0%;}     
                }
                @keyframes heroImgDie_right
                {
                    0% {opacity:100%;}
                    100% { opacity:0%;}     
                }
                @keyframes heroImgHurt_left
                {
                  0% { transform: translate(0,0);}
                  100% { transform: translate(20px,0);}
            
                }
                @keyframes heroImgHurt_right
                {
                  0% { transform: translate(0,0);}
                  100% { transform: translate(-20px,0);}
            
                }
    
                .hurtShowTextBox{
                    height:30px;
                    overflow: hidden;
                    position:absolute;
                    left:50%;
                    transform:translate(-50%,0%);
                    top:25px;
                    display:flex;
                    align-items: flex-end;
                    color: #D02316;
                    @keyframes hurtmove
                    {
                      0% { transform: translate(0,10px);}
                      100% { transform: translate(0,-30px);}            
                    }
                    .hurtShowText{
                        animation-fill-mode: forwards !important;
                        animation:hurtmove 2s 1 ease ;
                        font-size:18px;
                    }
                }
                
                .heroImg{
                    // animation-fill-mode: forwards !important;
                    // animation:heroImgHurt 1s 1 ease-out ;
                   
                    height: 388px;
                    margin-top: 40px;
                }
                .heroImg-left{
                    margin-right:50px;
                }
                .heroImg-right{
                    margin-left:100px;
                }

                .heroType_die{
                    animation-fill-mode: forwards !important;
                }
            }
        }
    }
    .attrBox{
        width:100%;
        display:flex;
        flex-wrap:nowrap;
        position:relative;
        border: 1px solid #998774;
        .attrBoxLine{
            height:100%;
            position:absolute;
            left:50%;
            transform:translate(-50%,0%);
        }
        .attrShow{
            width:50%;
            display: flex;
            flex-wrap: wrap;
            padding:37px 0 17px 0;
            .attrItem{
                width:50%;
                display:flex;
                padding:0 44px 20px 30px;
                align-items: center;
                justify-content: space-between;
                font-size: 16px;
                font-weight: bold;
                color: #BAA694;

                .attrLable{
                    display:flex;
                    align-items: center;
                    line-height: 1;
                }
            }
        }
    }
}
@media screen and (max-width: 768px) {
    // margin-left:-20px;
    width:100vh;
    height:100vw;
    position:fixed;
    overFlow-x:hidden;
    overFlow-y:scroll;
    z-index:999;
    top:0px;
    left:0px;
    // transform: rotate(90deg);
    transform: rotate(90deg) translateY(-100vw);
    transform-origin: top left;
    
    .page{
        width:100vh;
        // height:100vw;
       margin-top:0px;
        background-color: #0C0909;
        .bottomLeftIcon,.bottomRightIcon,.topLeftIcon,.topRightIcon{
            display:none;

        }
        .main{
            height:500px;
            .pveTitle{
                display:none;
            }
            .heroContent{
                padding:0px;
                .heroItem{
                    .heroHeadImg{
                        width: 56px;
                        height: 56px;
                        img{
                            width: 50px;
                            height: 50px;
                        }               
                    }
                    .heroHeadImg-left{
                        margin:0 12px 0 5px;
    
                    }
                    .heroHeadImg-right{
                       margin: 0 5px 0 12px;
                    //    img{
                    //     margin-top: -30px;
                    //     height: 125px;
                    //    }
                    }
                    .infoRow{
                        width:100%;
                        padding:10px 0 0 0 !important;
                    }
                    .hpInfoRow{
                        width:70%;
                        .heroHpBg{
                            width:100%
                        }
                    }
                    .heroHpBg{
                        height:16px;
                        .hpText{
                            margin-top:-0.2vw;
                            font-size:2vw;
                            line-height: 1;
                        }
                        .heroHpValue{
                            height:13px;
                        }
                    }
                    .sp_attr{
                        display:flex;
                        flex-wrap:wrap;
                    }
                    .hurtShowTextBox-left{
                        margin-left:-60px;
                    }
                    .hurtShowTextBox-right{
                        margin-left:50px;
                    }
                    .heroImg-left{
                        margin-left:-25vw;
                    }
                    .heroImg-right{
                        // margin-right:-25vw;
                        // margin-left:-500px;
                        margin-left:150px;
                    }
                    .heroImg{
                        // height:250px;
                        margin-top:40px;
                        height: 260px;
                    }
                }
                .center-common{
                    .priorityAttack_left{
                        width:25px;
                        left:-30px;
                    }
                    .priorityAttack_right{
                        width:25px;
                        right:-30px;
                        // bottom: calc( 50% - 0px );
                    }
                    .vsText{
                        padding-top:30px;
                    }
                    .message{
                        font-size:16px;
                        padding:20px 15px;
                        .BossImg{
                            position:absolute;
                            width:50px;
                            // height:100%;
                            right:0;
                            top:0;
                            transform: translate(100%,-100%)
                        }
                        .bossMoney{
                            height: 30px;
                            width: auto;
                        }
                    }
                }
            }
        }

    }
}

`
