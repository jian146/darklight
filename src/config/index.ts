import assassin from 'src/assets/images/common/assassin.png'
import hunter from 'src/assets/images/common/hunter.png'
import warrior from 'src/assets/images/common/knight.png'
import mage from 'src/assets/images/common/master.png'

import pve_assassin from 'src/assets/images/index/assassin.png'
import pve_hunter from 'src/assets/images/index/hunter.png'
import pve_warrior from 'src/assets/images/index/warrior.png'
import pve_mage from 'src/assets/images/index/mage.png'
import { LevelType, UpgradeType } from 'src/types/hero'
import qualityCQ from 'src/assets/images/game/card/cq.png'
import qualitySS from 'src/assets/images/game/card/ss.png'
import qualityJY from 'src/assets/images/game/card/jy.png'
import qualityPT from 'src/assets/images/game/card/pt.png'
import qualityYX from 'src/assets/images/game/card/yx.png'


/**
 * 英雄职业图片列表
 */
// export const HeroImgList = [warrior, mage, hunter, assassin]
export const HeroImgList = [warrior, mage, hunter, assassin]
// export const HeroImgList =[pve_warrior, pve_mage, pve_hunter, pve_assassin]
/**
 * 英雄职业图片列表
 */
export const bigHeroImgList =[pve_warrior, pve_mage, pve_hunter, pve_assassin]

export const getHeroImg=(index:number)=>{
  new Date().getTime()

}
/**
 * @description gitbook 地址
 */
export enum GitbookAddress {
  'en-US' = 'https://darklight.gitbook.io/darklight/',
  'zh-CN' = 'https://darklight.gitbook.io/darklight/an-hei-zhi-guang-bai-ke'
}

/**
 *
 */
export const getHeroHeadImg=(occupation:number)=>{
  return require(`src/assets/images/common/heroHead/${occupation}.png`)
}
/**
 * 升级信息
 */
export const HeroUpgradeConfig : {
  [key in LevelType] : UpgradeType
} = {
  lv2: {
    gold: 20000,
    dlt: 0,
    successRate: '90%',
    income: 2
  },
  lv3: {
    gold: 50000,
    dlt: 0,
    successRate: '90%',
    income: 4
  },
  lv4: {
    gold: 150000,
    dlt: 0,
    successRate: '90%',
    income: 8
  },
  lv5: {
    gold: 450000,
    dlt: 5000,
    successRate: '90%',
    income: 16
  },
  lv6: {
    gold: 1000000,
    dlt: 50000,
    successRate: '75%',
    income: 25
  },
  lv7: {
    gold: 2000000,
    dlt: 100000,
    successRate: '75%',
    income: 50
  },
  lv8: {
    gold: 5000000,
    dlt: 500000,
    successRate: '75%',
    income: 75
  },
  lv9: {
    gold: 10000000,
    dlt: 1000000,
    successRate: '70%',
    income: 100
  },
  lv10: {
    gold: 20000000,
    dlt: 1000000,
    successRate: '70%',
    income: 200
  },
  lv11: {
    gold: 50000000,
    dlt: 2000000,
    successRate: '50%',
    income: 300
  },
  lv12: {
    gold: 100000000,
    dlt: 5000000,
    successRate: '50%',
    income: 500
  }
}

/**
 * 获取品质的图片
 */

export const getQualityPic = (total: number) => {
  if (total < 251) {
    return ['normal', qualityPT]
  }

  if (total >= 251 && total <= 320) {
    return ['excellent', qualityYX]
  }

  if (total >= 321 && total <= 370) {
    return ['superb', qualityJY]
  }

  if (total >= 371 && total <= 400) {
    return ['epic', qualitySS]
  }

  if (total >= 401) {
    return ['legendary', qualityCQ]
  }
}
