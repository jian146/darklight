import styled from '@emotion/styled'
import playBg from 'src/assets/images/index/play_bg.jpg'
import occupationBg from 'src/assets/images/index/occupation_bg.jpg'
import introBg from 'src/assets/images/index/intro_bg.png'
import introTitleBg from 'src/assets/images/index/intro_title_bg.png'
import pathBg from 'src/assets/images/index/path_bg.jpg'
import mIntroBg from 'src/assets/images/mhome/bg_intro.jpg'
import mPlayBg from 'src/assets/images/mhome/bg_play.jpg'
import mMapBg from 'src/assets/images/mhome/bg_map.jpg'
import mTitleBg from 'src/assets/images/mhome/bg_title.png'
import mBgConcept from 'src/assets/images/mhome/bg_concept.jpg'

export const HomeWrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  font-weight: bold;
  position: relative;
  color: #E6D3C3;

  .banner {
    width: 100%;
    background-size: 100%;
    position: relative;

    .banner-top {
      position: absolute;
      top: -18px;
      left: 0;
      width: 100%;
    }
    
    .banner-bg {
      width: 100%;
    }



    @media screen and (max-width: 480px) {
      .startBtn{
        bottom: 0vw;
        width: 160px;
        height: 40px;
        line-height: 40px;
      }
      .es-button {
        width: 130px;
        height: 30px;
        span {
          font-size: 12px;
        }
      }
    }
  }

  .p-title {
    width: 445px;;
    max-height: 151px;
    margin: 0 auto;
    position: relative;
    margin-top: 100px;

    span {
      font-size: 40px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    img {
      width: 100%;
    }
  }

  .play-intro {
    width: 100%;
    background: url(${playBg}) no-repeat top;
    background-size: 100% 100%;
    overflow: hidden;


    .pi-wrapper {
      margin: 150px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;


      .item {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        border-top: 1px solid transparent;
        
        &:not(:last-child) {
          margin-right: 40px;
        }


        .desc {
          text-align: center;
          margin-top: 40px;

          .title {
            font-size: 26px;
          }

          .sub-title {
            font-size: 18px;
          }
        }
      }

    }
  }

  .occupation-intro {
    width: 100%;
    background: url(${occupationBg}) no-repeat top;
    background-size: 100% 100%;
    overflow: hidden;

    .hero-item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;

      &:first-of-type {
        margin-top: 92px;
      }

      &:nth-of-type(2n - 1) {
        flex-direction: row-reverse;
      }

      .h-text {
        width: 528px;
        background-size: 100% 100%;
        position: relative;
        .title {
          height: 106px;
          width: 100%;
          text-align: center;
          line-height: 106px;
          font-size: 36px;
          background: url(${introTitleBg}) no-repeat center;
          background-size: 100% 100%;
        }
        
        .content {
          font-size: 24px;
          padding: 10px 48px 10px 36px;
          background: url(${introBg}) no-repeat top;
        }
      }

      .divider {
        width: 70px;
      }
    }
  }

  .path {
    width: 100%;
    background: url(${pathBg}) no-repeat top;
    background-size: 100% 100%;
    overflow: hidden;

    .path-container {
      margin-top: 100px;
      .item {
        display: flex;
        justify-content: center;
        height: 368px;
        overflow: hidden;

        &:nth-of-type(2n) {
          flex-direction: row-reverse;
        }

        .exp {
          width: 457px;
          height: 230px;
        }

        .divider {
          margin: 0 86px 0 96px;
        }

        .tip {
          width: 457px;
          font-size: 36px;
          &.active {
            color: #D68C3F;
          }
        }
      }
    }
  }

  .org-draw {
    position: relative;
    overflow: hidden;

    .p-title {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 100px;
      
    }

    img {
      width: 100%;
    }
  }

  &.m {
    .p-title {
      width: 224px;
      height: 50px;
      margin: 0 auto;
      line-height: 50px;
      text-align: center;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      span {
        font-size: 18px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .play-intro {
      background: url(${mPlayBg}) no-repeat top;
      background-size: 100% 100%;
      padding-top: 75px;

      .pi-wrapper {
        justify-content: flex-start;
        margin-top: 0;
        margin-bottom: 40px;

        .item {
          width: 50%;
          margin-right: 0;
          justify-content: flex-start;
          margin-top: 75px;

          .img {
            width: 130px;
            img {
              width: 100%;
            }
          }

          .desc {
            min-height: 65px;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            .title {
              font-size: 16px;
            }
            .sub-title {
              font-size: 12px;
            }
          }
        }
      }
    }

    .occupation-intro {
      padding-top: 74px;
      background: url(${mIntroBg}) no-repeat top;
      background-size: 100% 100%;

      .hero-item {
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        padding: 0 18px;

        .divider {
          width: 10px;
          flex-shrink: 0;
        }
        
        &:nth-of-type(odd) {
          flex-direction: row-reverse;
        }

        .h-text {
          background: unset;
          width: auto;
          .title {
            height: 35px;
            width: 154px;
            line-height: 35px;
            font-size: 18px;
            background: url(${mTitleBg}) no-repeat center;
            background-size: 100% 100%;
            margin: 0 auto;
          }
          .content {
            font-size: 14px;
            padding: 0;
            background: unset;
            max-width: 340px;
            line-height: 18px;
          }
        }

        &:nth-of-type(2) {
          margin-top: 75px;
          img {
            width: 152px;
          }
        }
        &:nth-of-type(3) {
          img {
            width: 175px;
          }
        }
        &:nth-of-type(4) {
          img {
            width: 175px;
          }
        }
        &:nth-of-type(5) {
          img {
            width: 175px;
          }
        }
      }
    }

    .path {
      padding-top: 75px;
      background: url(${mMapBg}) no-repeat top;
      background-size: 100% 100%;

      .path-container {
        margin-top: 50px;
        
        .item {
          position: relative;
          flex-direction: column-reverse;
          justify-content: flex-end;
          height: auto;
          padding-left: 100px;
          overflow: hidden;

          .exp {
            /* width: 229px; */
            width: 80%;
            height: auto;
            margin-top: 19px;
          }

          .tip {
            font-size: 14px;
            width: 80%;
            word-break: break-all;
            &.active {
              color: #D68C3F;
            }
          }
          
          .divider {
            position: absolute;
            left: 30px;
            top: 0;
            width: 24px;
            margin: 0;
          }
        }

      }
    }

    .org-draw {
      background: url(${mBgConcept}) no-repeat top;
      background-size: 100% 100%;
      padding: 0 32px;

      .p-title {
        position: relative;
        left: unset;
        top: unset;
        transform: unset;
        margin-top: 50px;
        margin-bottom: 75px;
        
      }

      img:not(:last-of-type) {
        margin-bottom: 14px;
      }
    }
  }

`
