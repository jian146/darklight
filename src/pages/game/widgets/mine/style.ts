import styled from '@emotion/styled'
import heroListBg from 'src/assets/images/game/mine/hero_list_bg.png'
import heroBg from 'src/assets/images/game/mine/hero_bg.png'
import mineBg from 'src/assets/images/game/mine/mine_bg.png'

export const MineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;

  .my-hero {
    width: 312px;
    height: 591px;
    background: url(${heroListBg}) no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin-top: 6px;
    margin-right: 20px;
    padding-bottom: 10px;

    .title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: #D68C3F;
    }

    .hero-list {
      width: 100%;
      height: calc(100% - 50px);
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding-top: 14px;

      .item {
        width: 277px;
        height: 96px;
        margin-right: 3px;
        background: url(${heroBg}) no-repeat center;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        margin-bottom: 7px;
        
        .img {
          width: 44px;
          height: 84px;
          overflow: hidden;
          margin-left: 20px;
        }

        .desc {
          margin-left: 12px;

          .t-title {
            margin-bottom: 12px;

            span {
              font-size: 18px;
              color: #BAA694;

              &.lv {
                font-size: 14px;
                margin-left: 15px;
              }
            }
          }

          .tokenid {
            display: flex;
            align-items: center;
            span {
              font-size: 12px;
              color: #664F42;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }

  .mine-map {
    display: flex;
    flex-wrap: wrap;
    flex: 1;

    .mine-item {
      width: 288px;
      height: 434px;
      background: url(${mineBg}) no-repeat center;
      background-size: 100% 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;
      margin: 0 0 40px;

      .m-title {
        font-size: 14px;
        color: #B2855E;
        line-height: 25px;
        font-weight: bold;
      }

      .img {
        width: 228px;
        height: 129px;
        margin-top: 14px;
        img {
          width: 100%;
        }
      }

      .reward-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 32px;
        margin-top: 5px;
        
        img {
          margin-right: 12px;
          width: 16px;
          height: 16px;
        }
      }

      .limit {
        width: 229px;
        height: 129px;
        margin-top: 12px;

        .limit-tit {
          height: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          span {
            font-size: 14px;
            color: #482D2D;
            font-weight: bolder;
          }

          img {
            width: 18px;
            height: 18px;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
          }
        }

        .no-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16px;
          padding: 0 20px;
          
          .row-limit {
            font-size: 12px;
            text-align: center;

            .limit-text {
              color: #61463a;
            }

            .limit-number {
              color: #482d2d;
              font-weight: bolder;
            }

          }
        }
      }
      .es-button {
        margin-top: 4px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    .my-hero {
      /* margin-right: 0; */
      display: none;
    }

    .mine-map {
      padding: 0 10px;
      margin-top: 30px;
      justify-content: center;

      .mine-item {
        width: 100%;

        .img {
          width: 100%;
          padding: 0 38px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

    }

    .hero-num {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: #b2856c;
      font-family: bod, langting, sans-serif;
      img {
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }
      .num {
        margin-left: 4px;
      }
    }
  }
`
