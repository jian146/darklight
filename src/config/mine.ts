import rewordImg from 'src/assets/images/game/mine/reward.png'
import rewordImg2 from 'src/assets/images/game/mine/reward2.png'
import parttime from 'src/assets/images/game/mine/part_time.png'
import leather from 'src/assets/images/game/mine/leather.png'
import medicinal from 'src/assets/images/game/mine/medicinal.png'
import forging from 'src/assets/images/game/mine/forging.png'
import enchanting from 'src/assets/images/game/mine/enchanting.png'
import slmgImg from 'src/assets/images/game/mine/slmg.png'
import wrgcImg from 'src/assets/images/game/mine/wrgc.png'
import tzzdImg from 'src/assets/images/game/mine/tzzd.png'
import cqlyImg from 'src/assets/images/game/mine/cqly.png'
import ckDel from 'src/assets/images/game/mine/ck.png'
import fsDel from 'src/assets/images/game/mine/fs.png'
import lrDel from 'src/assets/images/game/mine/lr.png'
import qsDel from 'src/assets/images/game/mine/qs.png'
import otherDel from 'src/assets/images/game/mine/other.png'
// 挖矿详情图片
import partime from 'src/assets/images/mine_detail/parttime.png'
import mpartime from 'src/assets/images/mine_detail/m_parttime.png'
import cqly from 'src/assets/images/mine_detail/cqly.png'
import mcqly from 'src/assets/images/mine_detail/m_cqly.png'
import enchantingd from 'src/assets/images/mine_detail/enchanting.png'
import menchanting from 'src/assets/images/mine_detail/m_enchanting.png'
import forgingd from 'src/assets/images/mine_detail/forging.png'
import mforging from 'src/assets/images/mine_detail/m_forging.png'
import leatherd from 'src/assets/images/mine_detail/leather.png'
import mleather from 'src/assets/images/mine_detail/m_leather.png'
import medicinald from 'src/assets/images/mine_detail/medicinal.png'
import mmedicinal from 'src/assets/images/mine_detail/m_medicinal.png'
import slmg from 'src/assets/images/mine_detail/slmg.png'
import mslmg from 'src/assets/images/mine_detail/m_slmg.png'
import tzzd from 'src/assets/images/mine_detail/tzzd.png'
import mtzzd from 'src/assets/images/mine_detail/m_tzzd.png'
import wrgc from 'src/assets/images/mine_detail/wrgc.png'
import mwrgc from 'src/assets/images/mine_detail/m_wrgc.png'
import { MineMapType, WorkName } from 'src/types/mine'

// 挖矿地图配置
export const mineMap: MineMapType[] = [
  {
    workHeroSize: 0,
    name: WorkName.parttime,
    mapId: 1,
    img: parttime,
    reward: [rewordImg],
    cnLimit: '2级及以上',
    enLimit: 'Lv.2 and Above',
    level: 2,
    delineation: otherDel,
    state: 'started'
  },
  {
    // 骑士 锻造
    workHeroSize: 0,
    occupation: 0,
    mapId: 2,
    name: WorkName.forging,
    img: forging,
    reward: [rewordImg, rewordImg],
    level: 2,
    strength: 61,
    stamina: 86,
    cnLimit: '骑士限定',
    enLimit: 'Knight Limited',
    delineation: qsDel,
    state: 'started'
  },
  // 法师 附魔
  {
    workHeroSize: 0,
    occupation: 1,
    mapId: 3,
    name: WorkName.enchanting,
    img: enchanting,
    reward: [rewordImg, rewordImg],
    level: 2,
    intelligence: 86,
    mind: 61,
    cnLimit: '法师限定',
    enLimit: 'Wizard Limited',
    delineation: fsDel,
    state: 'started'
  },
  // 猎人 制皮
  {
    workHeroSize: 0,
    occupation: 2,
    mapId: 4,
    name: WorkName.leather,
    img: leather,
    reward: [rewordImg, rewordImg],
    level: 2,
    strength: 86,
    agility: 61,
    cnLimit: '猎人限定',
    enLimit: 'Hunter Limited',
    delineation: lrDel,
    state: 'started'
  },
  // 刺客 采药
  {
    workHeroSize: 0,
    occupation: 3,
    mapId: 5,
    name: WorkName.medicinal,
    img: medicinal,
    reward: [rewordImg, rewordImg],
    level: 2,
    agility: 86,
    strength: 61,
    cnLimit: '刺客限定',
    enLimit: 'Assassin Limited',
    delineation: ckDel,
    state: 'started'
  },
  {
    workHeroSize: 0,
    name: WorkName.slmg,
    mapId: 6,
    img: slmgImg,
    reward: [rewordImg, rewordImg2],
    cnLimit: '5级及以上',
    enLimit: 'Lv.5 and Above',
    level: 5,
    delineation: otherDel,
    state: 'pre'
  },
  {
    workHeroSize: 0,
    name: WorkName.wrgc,
    img: wrgcImg,
    mapId: 7,
    reward: [rewordImg, rewordImg2, rewordImg2],
    cnLimit: '6级及以上',
    enLimit: 'Lv.6 and Above',
    level: 6,
    delineation: otherDel,
    state: 'pre'
  },
  {
    workHeroSize: 0,
    name: WorkName.tzzd,
    mapId: 8,
    img: tzzdImg,
    reward: [rewordImg, rewordImg2, rewordImg2, rewordImg2],
    cnLimit: '7级及以上',
    enLimit: 'Lv.7 and Above',
    level: 7,
    delineation: otherDel,
    state: 'pre'
  },
  {
    workHeroSize: 0,
    name: WorkName.cqly,
    img: cqlyImg,
    mapId: 9,
    reward: [rewordImg, rewordImg, rewordImg],
    cnLimit: '总属性值 > 400',
    enLimit: 'Total Ability > 400',
    total: 400,
    delineation: otherDel,
    state: 'started'
  }
]

// 挖矿详情地图配置
export const MineDetailImg: { img: string, mImg: string, name: WorkName }[] = [
  { img: partime, mImg: mpartime, name: WorkName.parttime },
  { img: cqly, mImg: mcqly, name: WorkName.cqly },
  { img: enchantingd, mImg: menchanting, name: WorkName.enchanting },
  { img: forgingd, mImg: mforging, name: WorkName.forging },
  { img: leatherd, mImg: mleather, name: WorkName.leather },
  { img: medicinald, mImg: mmedicinal, name: WorkName.medicinal },
  { img: slmg, mImg: mslmg, name: WorkName.slmg },
  { img: tzzd, mImg: mtzzd, name: WorkName.tzzd },
  { img: wrgc, mImg: mwrgc, name: WorkName.wrgc }
]
