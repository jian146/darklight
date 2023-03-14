import styled from '@emotion/styled'
// import equipBg from 'src/assets/images/game/backpack/square.png'
import equipBg from 'src/assets/images/game/backpack/equipBox.png'
export const EquipImgStyle = styled.div`
.box{
  position: relative;
  width: 140px;
  height: 140px;
  background: url(${equipBg}) no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:4px;
  cursor: pointer;
  .loseIcon{
    position: absolute;
    width: 73%;
    height: auto;
    top: 5px;
    right: 2px
    // transform:translate(-50%,0%);
  }
  img{
      // width:80%;
      height: 90%;
  }
}
@media screen and (max-width: 768px) {
  .box{
    .loseIcon{
      position: absolute;
      height: 12px;
      width:auto;
      top: 4px;
      right: 3px;
      // transform:translate(-50%,0%);
    }
  }
}
    
`

export const PriceImgStyle = styled.div`
.box{
  position: relative;
  width: 140px;
  height: 140px;
  background: url(${equipBg}) no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:4px;
  cursor: pointer;

  .count{
    text-shadow: 2px 2px #352414, -2px -2px #352414, 2px -2px #352414, -2px 2px #352414;
    color: rgb(212,208,205);
    font-weight: 400;
    letter-spacing: 1.1px;
    position:absolute;
    background-color:rgba(51,34,18,0.5);
    text-align: center;
    width:100%;
    bottom:0px;
    line-height:1;
    padding:3px 0;
    // text-stroke: 1px #352313;
    // -webkit-text-stroke:0.5px #352313;
    left:50%;
    font-size: 14px;
    font-weight: 800;
    color: #FFFFFF;
    font-family: PingFang SC;
    transform:translate(-50%,0%);
  }
  img{
      width:80%;
      height: 80%;
  }
}
@media screen and (max-width: 768px) {
  .box{
    .count{
      font-size:12px;
      translate(-50%,0%) scale(.8)
    }
  }
}
    
`
export const EquipImgContentStyle = styled.div`
  color: #B2855E;
`
