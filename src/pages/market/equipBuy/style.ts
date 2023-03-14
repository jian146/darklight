import styled from '@emotion/styled'
import Wrapper from 'src/components/Wrapper'
import titledl from 'src/assets/images/market/title_dl.png'
import titledr from 'src/assets/images/market/title_dr.png'


const Container = styled(Wrapper)`

  .left {
    width: 440px;
    position: relative;
    
    .bg {
      position: relative;
      padding-top: 145.2%;

      > img:first-of-type {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        z-index: 0;
      }
    }
    .forgeCdTime{
      color: #664F42;
      font-size:14px;
      position: absolute;
      bottom:20px;
      z-index:80;
      left:20px;
    }
    .titleRow{
      font-size: 22px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #B2856C;
      display:flex;
      justify-content:space-between;
      width: 100%;
    }
    .tokenId{
      font-size: 14px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      display: flex;
      align-items: center;
      color: #664F42;
    }
    .equip-img{
      position: absolute;
      top: 50%;
      width:70%;
      left:50%;
      transform:translate(-50%,-50%);
    }
  }

  .right {
    .saleTime{
      font-size: 18px;
      color: #B2856C;
      font-weight:bold;
    }
    .price {
      &::before {
        content: '';
        position: absolute;
        left: -114px;
        top: 50%;
        transform: translateY(-50%);
        width: 104px;
        height: 25px;
        background: url(${titledl}) no-repeat center;
        background-size: 100% 100%;
      }
      
      &::after {
        content: '';
        position: absolute;
        right: -114px;
        top: 50%;
        transform: translateY(-50%);
        width: 104px;
        height: 25px;
        background: url(${titledr}) no-repeat center;
        background-size: 100% 100%;
      }
    }
    .attrBox{
      background: #130F0E;
      padding:28px 60px 25px 60px;
    }
    .infoRow{        
      display: flex;
      flex-wrap:wrap;
      align-items: center;
      margin-bottom:0px;
      font-weight:500;
      width:100%;

      .infoRowItem{
        &:nth-of-type(1){
          min-width:72px;             
        } 
        &:nth-of-type(even){
          //偶数行 
          padding-left:40px;
        }
        width:50%;
        line-height:1;
        margin-bottom:25px;
        .label{
          margin-bottom:10px;
        }
        .classItem{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #BAA694;
          margin-right:5px;
        }
      }        
    }
    .attrRow{
      padding:0px 0 15px 0;
      .addColor{
        color: #ecae18 !important;
      }
      .at-item{
        width:50%;
        min-width:50%;
        display: flex;
        align-items: center;
        margin-bottom:20px;
        font-weight:500;
        &:nth-of-type(even){
          //偶数行 
          padding-left:40px;
        }
        .text{
          font-size: 18px;
          font-family: DIN;
          font-weight: 500;
          color: #B2856C;
          display:flex;
          margin-left:5px;
          // justify-content:space-between;
          width:100%;   
          span{
            &:nth-of-type(1){
              min-width:72px;             
            } 
          }
     
        
          .num{
            margin-left:15px;
            color: #BAA694;
          }
        }
      }
      .attr-top,.attr-bottom{
        border-top:1px solid rgba(112,88,75,0.3);
        padding-top:16px;
        display:flex;
        flex-wrap: wrap;
      }
    }
    .label{
      color: #B2856C;
      font-size:18px;
      font-family: PingFang SC;
      font-weight: 500;
    }

  }
  @media screen and (max-width: 768px) {  
    .right{
      width:100vw;
      .attrBox{
        width:100vw;
        background: #130F0E;
        padding:28px 15px   25px 15px;
        margin:0 auto;
      }
    }
  }
`

export default Container
