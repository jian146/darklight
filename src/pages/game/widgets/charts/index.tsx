import headtop from 'src/assets/images/game/charts/head-img.png'
import number from 'src/assets/images/game/charts/number1.png'
import headbot from 'src/assets/images/game/charts/head-bot.png'
import { ChartWrapper } from './style'


const Charts: React.FC = () => {
  const list = [1, 2, 3]
  return (
    <ChartWrapper>
      <div className="board-head__list">
        <div className="head__topimg">
          <img src={headtop} alt="" />
        </div>
        <div className="board-center">
          {
            list.map(item => (
              <div key={item} className="item">
                <div className="number-box">
                  <img src={number} alt="" />
                </div>
                <div className="mob-item">
                  <div className="item-column">
                    <div className="item-li">
                      <p className="name">法师</p>
                    </div>
                    <div className="item-li">
                      <p className="name">LV.9</p>
                    </div>
                  </div>
                  <div className="flex-item item-li">
                    <p className="tlt">Token ID</p>
                    <p className="tokenid">472958***840764</p>
                  </div>
                  <div className="item-li">
                    <p className="tlt">總屬性值</p>
                    <p className="value">408</p>
                  </div>
                  <div className="item-li">
                    <p className="tlt">戰鬥力</p>
                    <p className="value">734.4</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="board-bot">
          <img src={headbot} alt="" />
        </div>
      </div>
      <div className="border-list">
        <div className="item">
          <div className="number-box">
            <span>4</span>
          </div>
          <div className="mob-item flex-wrap">
            <div className="item-column">
              <div className="item-li">
                <p className="name">法师</p>
              </div>
              <div className="item-li">
                <p className="name">LV.9</p>
              </div>
            </div>
            <div className="flex-item item-li">
              <p className="tlt">Token ID</p>
              <p className="tokenid">472958***840764</p>
            </div>
            <div className="item-li">
              <p className="tlt">總屬性值</p>
              <p className="value">408</p>
            </div>
            <div className="item-li">
              <p className="tlt">戰鬥力</p>
              <p className="value">734.4</p>
            </div>
          </div>
        </div>
      </div>
    </ChartWrapper>
  )
}

export default Charts
