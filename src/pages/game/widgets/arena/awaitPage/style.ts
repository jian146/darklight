import styled from '@emotion/styled'
import boxBg from 'src/assets/images/game/arena/boxBg.png'
import vsBg from 'src/assets/images/game/arena/vsBg.png'
export const PvpAwaitPageWrapper = styled.div`
width:100%;
// height: 100vh;
// padding-bottom: 150px;

#flash{
  display:none;
  position: absolute;
  left: 47%;
  width: 240px;
  height: 240px;
  /* transform: scale(1.5); */
  border-radius: 50%;
  background: -webkit-linear-gradient(left,rgba(255,255,255,0.5)0%,rgba(255,255,255,0)5%,rgba(255,255,255,0.0)100%);
  -moz-transform: skewX(-30deg);
  -ms-transform: skewX(-30deg);
  /* clip: rect(0px 162px 332px 0px); */

}
#wrapper:hover #flash{
  left: 300px;
  transition: all 0.5s ease-in-out;
}


//---
z-index:999;
.ant-spin-container{
  z-index:999;
}
.pageContent{
  width:1200px;
  margin:0 auto;  
  .pve-container{
    // padding-top:200px;
    
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

  .content{
      display:flex;
    align-items: center;
    justify-content:space-between;
    padding:0 60px;
    .vsBg{
        display:flex;
        width:332px ;
        height: 331px;
        align-items:center;
        justify-content:center;
        background: url(${vsBg}) no-repeat;
        
        background-size: 100% 100%;
        position:relative;
        .entryTime{
          font-size:70px;
          font-weight:bold;
          color:#d1c2ba;
          font-family: FZLanTingHei-R-GBK;
          line-height:1;
          text-shadow: 0 0 10px rgba(132,24,15,0.44),0 0 20px rgba(132,24,15,0.44),0 0 30px rgba(132,24,15,0.44),0 0 40px rgba(132,24,15,0.44);
        }
        .breakBg{
          // transform: scale(1.05);
          position:absolute;
          animation-fill-mode: forwards !important;
          animation:animation_breakBg 1s infinite ease  ;
          z-index:3;
        }
        .lightbg{
          position:absolute;
          transform: scale(1.05);
          // animation-fill-mode: forwards !important;
          // animation:animation_lightbg 1s infinite  ease ;
          z-index:4;
        }
        .waiquan{
          position:absolute;
          width:264px;
          height:228px;
          animation-fill-mode: forwards !important;
          animation:animation_waiquan 1s infinite ease ;
          z-index:2;
        }
        @keyframes animation_breakBg
        {
          0% { 
            opacity: 1;
          }
          100% {      
            opacity: 0;   
          }  
                
        }
        @keyframes animation_lightbg
        {
          0% { 
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% {      
            opacity: 0;   
          }  
                
        }
        @keyframes animation_waiquan
        {
          0% { 
            transform: scale(1);
            opacity: 0.5;
          }
          100% { 
            transform: scale(2);          
            opacity: 0;   
          }  
                
        }
        .vsImg{
          width:110px;
          height:80px;
        }
      }

    .loadingText{
        font-size: 22px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #FFEEEE;
        line-height: 24px;
        padding-top:38px;
        text-align: center;
        .point{
          margin:0 2px;
          display:inline-block;
          width:5px;
          height:5px;
          background-color: #FFEEEE;
          // animation:point2 1s infinite ease ;      
        }
        .loadingPoint{
          display: inline-block;
          margin-right:1px;
          // animation:point1 1s infinite linear ;
          // animation: point1 0.5s ease-in infinite; 
          // animation-delay: calc(0.1s * calc(var(--i) - 1)); 

        }
        @keyframes point1
        {
          0% { 
            transform: translateY(0%);
          }
          50%{
              transform: translateY(70%);
            }
          // 40%{
          //   transform: translateY(40%);
          // }
          // 80%{
          //   transform: translateY(60%);
          // }
          100% { 
            transform: translateY(0%);
          }  
                
        }
        @keyframes point2
        {
          0% { 
            transform: translateY(0%);
          }
          50%{
            transform: translateY(200%);
          }
          100% { 
            transform: translateY(0%);
          }  
                
        }

      }
    .heroBox{
        width:340px;
        min-width:340px;
        height: 434px;
        position: relative;
        display:flex;
        justify-content:center;
        background: url(${boxBg}) no-repeat;
        background-size: 100% 100%;
      .circularBg{
          position:absolute;
          width: 303px;
          top:50%;
          left:50%;
          transform: translate(-50%,-50%) ;
          z-index:1;
        }
        .heroImg{
          height:342px;
          position: absolute;
          top:50%;
          left:50%;
          transform: translate(-50%,-50%) ;
          z-index:2;
        }
      .attrBox{
          background-color:rgba(10,0,0,0.51);        
          border-radius: 4px;
          width: 328px;
          height: 90px;
          position: absolute;
          bottom:7px;
          color:#B2856C;
          padding: 20px 15px;
          line-height:1;
          display:flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          z-index:3;
          .value{
            color:#E6D3C3;          
          }
          .rowTop{
            display:flex;
            width:100%;
            justify-content:space-between;        
            font-family: Adobe Heiti Std;
            align-items: center;
            font-weight:bold;
          }
        }
      
    }
    
  }


    .loadingBox{
      display:flex;
      align-items: center;
      justify-content:center;
      padding-top:15px;
      padding-bottom:15px;
    }

  
}
@media screen and (max-width: 768px) {
  //标头样式
  width:100%;
  .ant-spin-spinning{
    top: calc(50vw + 40px) !important;
  }
  .pageContent{
    .record{
      margin: 0px 35px 5px 0;
    }
    .pve-container{
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 800;
      background-color: #0C0909;
      .clossBack{
        position: absolute;
        z-index: 800;
        left: 50%;
        top: 20px;
        transform: rotate(90deg);
        .back-title{
          display:none !important;
        }
      }
    }
    .awaitPage{
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
      background-color:rgb(12,10,9);
    }
    .content{
      padding:0px;
      margin-top: -60px;
      height: 100%;
      width: 100%;
      .vsBg{
        transform: scale(0.6);
        margin-top:-100px;
      }
      .loadingText{
        margin-top:-80px;
        padding-top:0px;
        transform: scale(0.6);
      }
      .heroBox{
        transform: scale(0.6);
      }
      .centerBox{
        margin: 0 -150px;
      }
    }
  }
}
`
