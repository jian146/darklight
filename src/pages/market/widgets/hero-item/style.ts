import styled from '@emotion/styled'
import heroBg from 'src/assets/images/market/hero.png'
import mheroBg from 'src/assets/images/market/m-hero.png'
import heroBg2 from 'src/assets/images/market/hero-bg-2.png'

export const OneItemWrapper = styled.div`
  width: 260px;
  height: 397px;
  background: url(${heroBg}) no-repeat top;
  background-size: 100% 100%;

  .hero-img {
    height: 272px
  }

  .attr {
    width: 92%;
    height: 112px;
    margin: 0 auto;
    background-color: #0C0707;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 520px;
    background: url(${mheroBg}) no-repeat top;
    background-size: 100% 100%;

    .hero-img {
      height: 380px;
    }
  }
`

export const TwoItemWrapper = styled.div`
  width: 260px;
  height: 299px;
  background: url(${heroBg2}) no-repeat center;

  .hero-img {
    height: 102px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 324px;
    background-size: 100% 100%;

    .hero-img {
      height: 138px;
    }
  }
`
