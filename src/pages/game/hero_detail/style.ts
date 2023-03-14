import styled from '@emotion/styled'
import attrBg from 'src/assets/images/game/hero/bg_attribute.png'
import titleBg from 'src/assets/images/game/hero/bg_title.png'
import heroBg from 'src/assets/images/game/hero/bg_hero.png'
import barTitleBg from 'src/assets/images/game/hero/bar_title.png'

export const HeroDetailWrapper = styled.div`
  box-sizing: border-box;
  padding: 0 60px;
  margin-top: 70px;
  width: 100%;
  min-height: 100%;
  max-width: 1200px;
  margin: auto;
  margin-bottom: 100px;
  .hero-info {
    margin: 100px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row-reverse;

    .attribute {
      position: relative;
      width: 486px;
      background: url(${attrBg}) no-repeat center;
      background-size: 100% 100%;
      box-sizing: border-box;
      padding: 60px 30px;

      > .title {
        width: 333px;
        height: 41px;
        font-size: 18px;
        color: #BAA694;
        text-align: center;
        line-height: 41px;
        background: url(${titleBg}) no-repeat center;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      .top-desc {
        .left {
          display: flex;
          align-items: center;
          p {
            font-size: 22px;
            color: #B2856C;
            font-weight: bold;

            &.level {
              font-size: 18px;
            }
          }
        }
        .btn {
          display: flex;
          justify-content: space-between;
          .es-button {
            width: 32%;
            height: 40px;
            margin-bottom: 24px;
          }
        }
      }

      .bottom-attr {

        .ant-progress-inner {
          background-color: #160E0E;
          border: 1px solid #6B594D;
          border-radius: 4px;
        }
        .ant-progress-bg {
          height: 14px !important;
          border-radius: 4px;
          background: linear-gradient(90deg, #610C0E, #7D181B, #610C0E)
        }

        .title-box {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          border-bottom: 1px solid #707070;
          padding-bottom: 6px;
          span.title {
            color: #D68C3F;
          }
          span.total {
            color: #C63A25;
          }
        }


        .attr-list {
          display: flex;
          flex-direction: column;
          margin-top: 20px;

          .attr-item {
            margin-bottom: 12px;
            .info {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 2px;

              .i-title {
                display: flex;
                align-items: center;
                color: #BAA694;
                font-size: 18px;

                > img {
                  width: 24px;
                  height: 24px;
                  object-fit: cover;
                  margin-right: 4px;
                }
              }
              .i-val {
                color: #BAA694;
                font-size: 16px;
                font-weight: bold;

                &.primary {
                  color: #ecae18;
                }
              }
            }


          }
        }
      }

      .prod {
        margin-top: 10px;
        p {
          &:first-of-type {
            color: #D68C3F;
            font-size: 18px;
          }

          &:last-child {
            color: #BAA694;
            font-size: 14px;
          }
        }
      }
    }

    .hero {
      width: 585px;
      height: 710px;
      background: url(${heroBg}) no-repeat center;
      position: relative;

      > .title {
        width: 333px;
        height: 41px;
        font-size: 18px;
        color: #BAA694;
        text-align: center;
        line-height: 41px;
        background: url(${titleBg}) no-repeat center;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      .hero-name {
        width: 257px;
        height: 48px;
        font-size: 18px;
        color: #B2856C;
        margin: 50px auto 0 auto;
        background: url(${barTitleBg}) no-repeat center;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 24px;
          height: 24px;
          object-fit: contain;
          margin-right: 14px;
        }
      }

      .h-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
        position: relative;
        .token {
          font-size: 14px;
          font-weight: bold;
          color: #B2856C;
        }
        .bg {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        img {
          z-index: 1;
        }
      }
    }
  }

    @media screen and (max-width: 480px) {
    padding: 0 16px;
    .hero-info {
      width: 100%;
      flex-direction: column-reverse !important;
      margin-top: 50px;
      .hero {
        width: 100%;
        height: auto;
        background-size: 100% 100%;
        .title {
          width: 57%;
          background-size: 100% 100%;
        }


        .h-box {
          overflow: hidden;
          img[class!="mark"] {
            width: 200px;
          }
          .bg {
            width: 100%;
            padding: 0 28px;
          }
        }
      }
      .attribute {
        width: 100%;
        background-size: 100% 100%;
        .title {
          width: 68.5%;
          background-size: 100% 100%;
          top: -7px;
        }
        .top-desc {
          display: flex;
          justify-content: space-between;
          .left {
            align-items: flex-start;
            p {
              font-size: 20px;
            }
          }
          .btn {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .es-button {
              width: 142px;
              height: 42px;
              margin-bottom: 12px;
  
              span {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
`
