import styled from '@emotion/styled'
import roletitleBg from 'src/assets/images/game/card/role_title_bg.png'
import roleBodyBg from 'src/assets/images/game/card/role_body_bg.png'
import luckBg from 'src/assets/images/game/card/luckBg.png'
export const RoleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px 0;
  overflow: hidden;
  position: relative;

  .ani {
    transition: all .25s ease-in;
    margin-right: 0;
    &.active {
      margin-right: 370px;

      @media screen and (max-width: 768px) {
        margin-right: 270px;
      }
    } 
  }

  .door-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      .luckbox{
        background: url(${luckBg}) no-repeat center;
        width:100%;
        height:30px;
        top:16px;
        padding:0 22px;
        .luckValue{
          width:100%
          -webkit-text-stroke: 2px #352317 ;
          text-stroke: 2px #352317;
          font-size: 12px;
          font-weight: 400;
          color: #FFFFFF;
          left:50%;
          transform:translateX(-50%);
          z-index:50;
        }
      }
      .info-wrapper {
        width: 360px;
        height: 360px;
      }

      &.active {

        @media screen and (max-width: 768px) {
          top: 40%;
          .info-wrapper {
            transform: scale(0.7);
          }
        }
      }

      .title {
        width: 360px;
        height: 44px;
        line-height: 44px;
        background: url(${roletitleBg}) no-repeat 50%;
        background-size: 100% 100%;
        color: #baa694;
        font-size: 18px;
        font-weight: bold;
        margin: auto;
        position: relative;
        z-index: 1;
      }

      .cont {
        margin: -15px auto -22px;
        width: 280px;
        height: 280px;
        background: url(${roleBodyBg}) no-repeat 50%;
        background-size: 100% 100%;
        line-height: 28px;
        color: #d68c3f;
        font-weight: 800;
        font-size: 20px;
        overflow: hidden;
        
        > .img {
          display: block;
          margin: 52px auto 2px;
          height: 152px;
          width: 152px;
          height: 152px;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            /* transform: scale(1.2); */
          }

          .zoom {
            &-enter {
              opacity: 0;
              transform: scale3d(0.3, 0.3, 0.3);
            }

            &-enter-active {
              opacity: 1;
              transform: scale(1);
              transition: opacity 500ms, transform 500ms;
            }

            &-exit {
              opacity: 1;
              transform: scale(1);
            }

            &-exit-active {
              opacity: 0;
              transform: scale3d(0.3, 0.3, 0.3);
              transition: opacity 500ms, transform 500ms;
            }
          }
        }

        .price {
          width: 188px;
          height: 42px;
          background-size: contain;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #d68c3f;
          font-size: 18px;
          margin: auto;
          font-weight: 800;
          font-family: Alegreya-ExtraBold;
        }
      }
    }


  .btn {
    background-size: contain;
    width: 189px;
    height: 75px;
    cursor: pointer;
  }
`
