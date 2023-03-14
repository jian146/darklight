import styled from '@emotion/styled'
// import heroBg from 'src/assets/images/market/hero.png'
// import h5heroBg from 'src/assets/images/market/m-hero.png'
import cardBg from 'src/assets/images/game/hero/list_card_bg.png'

export const EquipmentCardStyle=styled.div`
width: 260px;
// height: 420px;
background: url(${cardBg}) no-repeat top;
background-size: 100% 100%;
padding-bottom:15px;

.imgBox{
  height:272px;
  .bgImg{
    position: absolute;
    z-index:1;
    top:20px;
    width: 90%;
  }
  .equip-img {
    z-index:10;
    height: 80%;
  }
}
.btnRow{
  margin-top:10px;
  display:flex;
  align-items: center;
  justify-content: center;
}
.desBox{
  padding-left:0.6rem;
  padding-right:0.6rem;
}
.equipname{
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #E6D3C3;
}
.price{
  font-size: 12px;
  font-family: FZLTCHJW;
  font-weight:bold;
  color: #E6D3C3;
  margin-left:5px;
}
.starRow{
  width:100%;
  margin:6px 0px 2px 0px;
  display:flex;
  align-items:center;
  justify-content: space-between;
  .starItem{
    width:14px;
    height:14px;
  }
}
.hurtRow{
  margin-bottom:4px;
  display:flex;
  align-items: flex-start;
  min-height:22px;
  flex-wrap: wrap;
  .at-item{
    margin-right:10px;
    color:#B2856C;
    display:flex;
    align-items: center;
    flex-wrap: nowrap;
    .hurt1Color{
      color:#F4192A;
    }
    .hurt2Color{
      color:#E6D3C3;
    }
    img{
        width:18px;
        height:18px;
        margin-right:4px;
    }
    .label{
      margin-right:2px;
      white-space: nowrap;
      display:none;
    }

    .num{
        color:#F4192A;        
    }
  }

}



.attr {
  width: 92%;
  // height: 134px;
  margin: 0 auto;
  background-color: #0C0707;
}

@media screen and (max-width: 768px) {
  width: 100%;
  // height: 540px;
  background: url(${cardBg}) no-repeat top;

  background-size: 100% 100%;
  // .bgImg{
  //   display:none;
  // }
  .attr {
  }
  .imgBox {
    height: 380px;
  }
  .equipname{
    font-size: 16px;
  }
  .price{
    font-size: 14px;

  }
  .starRow{
    width:100%;
    margin:4px 0px 8px 0px;

    .starItem{
      width:17px;
      height:17px;
    }
  }
  .hurtRow{
    margin-bottom:4px;
    display:flex;
    align-items: center;
    .at-item{
      margin-right:10px;
      img{
          width:18px;
          height:18px;
          margin-right:4px;
      } 
    }    
  }
}
`
