import styled from '@emotion/styled'

export const LotteryLogStyle= styled.div`
.main{
    margin-top:40px;
    .logItem{
        width:100%;
        display:flex;
        align-items: center;
        padding:0px 24px;
        background: #171212;
        color:#B2856C;
        margin-bottom:20px;
        .package{
            // margin-right:20px;
            height:100px;
        }
        .box{
            display:flex;
            flex-wrap:warp;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-around;
            padding:10px 22px;
            margin:10px 0;
            height:100px;
            min-width:125px;
        }
        .line{
            border-right:1px solid #2E241E;
        }
        .packageName{
            font-size:20px;
            font-weight: bold;
        }
        .tokenId{
            font-size:14px;
        }
        .reward{
            font-size: 18px;
            font-weight: bold;
            color: #45352D; 
        }
        .equip{
            font-size: 16px;
            font-weight: bold; 
        }
        .time{
            font-size: 14px;
        }

    }
}
@media screen and (max-width: 768px) {
    .main{
        margin-top:40px;
        padding:0 20px;
        .logItem{
            flex-wrap:wrap;
            
            .package{
                height:100px;
            }
            .box{
                padding:5px 6px;
                margin:5px 0;
                height:100px;
                min-width:100px;
            }
            .rewardBox,.openBox{
                width:100%;
                flex-wrap: nowrap;
                flex-direction: row;
                height: auto;
                align-items: center;
                justify-content: flex-start;
                align-items: baseline;
                padding:0px;
                margin-top:0px;
            }
            .line{
                border-right:none;
            }
            .reward,.equip{
                margin-right:5px;
            }
    
        }
    }
}
`
