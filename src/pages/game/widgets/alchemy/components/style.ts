import styled from '@emotion/styled'
import close from 'src/assets/images/common/close.png'
import scrollTopImg from 'src/assets/images/game/scroll-top.png'
import scrollBottomImg from 'src/assets/images/game/scroll-bottom.png'
export const AlchemyHeroStyle = styled.div`
width:100%;
.AlchemyHero{
    min-height:600;

    .heroImg{
        width:100%;
        z-index:10;
        margin-top:-20px;
    }
    .heroTokenId{
        color: #B2856C;
    }
    .attributeRow{        
        color: #B2856C;
        align-items: end;
    }
    .absolute-center{
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        
    }
}
@media screen and (max-width: 768px) {
    .AlchemyHero{
        min-height:500;
        .heroImg{
            margin-top: 0px;
            width: auto;
            height: 320px;
        }
    }
    
  }
`
export const ChoseHeroStyle = styled.div`
    z-index:800;
    position:absolute;
    left: 50%;
    transform: translateX(-50%);
    background: #141110;
    border: 1px solid #b2856c;
    box-sizing: border-box;
    width: 400px;
    height: 428px;
    box-shadow: 0 16px 32px rgb(0 0 0 / 30%), 0 4px 8px rgb(0 0 0 / 25%);
    border-radius: 4px;
    padding: 35px 20px;
    font-size: 14px;
    color: #b2856c;
    overflow: hidden;
    padding-bottom:20px;

    .closeBtn{
        position: absolute;
        z-index:800;
        top: -0px;
        right: -0px;
        width: 32px;
        height: 32px;
        background: url(${close});
        background-size: 100% 100%;
        cursor: pointer;
    }
    .choseTitle{
        display:flex;
        border-bottom: 1px solid rgba(186,166,148,.21);
        padding-right:16px;
        .tabs{
            color: #BAA694;
            // justify-content: center;
            padding: 0 0 12px;
            line-height: 20px;
            
            .tabItem{
                margin:0 5px;
                cursor: pointer;
                opacity:1;
            }
            .activeItem{
                color:#C63A25;
                opacity:1;
            }
        }
    }
    .choseList{
        height:calc( 100% - 20px);
        overflow-x: hidden;
        overflow-y: scroll;
        margin-bottom:20px;
        &::-webkit-scrollbar {
            width: 20px;
          }
          &::-webkit-scrollbar-button:start:decrement {
            display: block;
            background: url(${scrollTopImg}) no-repeat;
          }
          &::-webkit-scrollbar-button:end:increment {
            display: block;
            background: url(${scrollBottomImg}) no-repeat;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #2b2624;
            border-radius: 4px;
            height:140px;
          }


        .listItem{
            color:#B28465;
            padding:18px 0 18px 0;
            border-bottom: 1px solid #2E2221;
            .numberColor{
                color:#ECAE18;
            }
            .listItem-row{
                padding-right:10px;
                display:flex;
                width:100%;
                align-items: center;
                // justify-content:space-between;
            }
        }
    }

    @media screen and (max-width: 480px) {
        width:50px;
        width:calc(100vw - 20px);
    }

`
