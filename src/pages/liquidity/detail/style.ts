import styled from '@emotion/styled'
import boxItem_bg from 'src/assets/images/liquidity/boxItem_bg.png'

export const LiquidityDetailWrapper = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  margin:0 auto;
  // align-items:center;
  width:980px;
  .backDom{
    margin-left:-100px;
  }
  .main{
    display:flex;
    flex-wrap:wrap;
    width:100%;
    justify-content: space-around;
    padding-top:60px;
  }
  .lpInfo{
    font-size:18px;
    margin-bottom:-20px;
  }
  .boxBg{
    background: url(${boxItem_bg}) no-repeat center;
    background-size: cover;
    margin-bottom:80px;
  }
  @media screen and (max-width: 768px) {
    width:100vw;
    .backDom{
      margin-left:0px;
    }
    .main{
      padding-top:20px;
    }
  }
`
