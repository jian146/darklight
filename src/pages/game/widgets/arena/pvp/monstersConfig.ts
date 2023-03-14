// 地图id
// 暮色森林 1 monstersMap[0]
// 死亡矿井 2 monstersMap[1]
// 黑暗墓陵 3 monstersMap[2]
//暗黑领主LV1-3(骑，法，猎，刺）
//Dark Lord LV1-3(Knight, Wizard, Hunter, Assassin)
export interface I_imgMap{
  name:string,
  url:string,
  enName:string,
  isBoss?:boolean,
  bossIcon?:string,
}
export type I_monsterConfigData={
  headImg:string
  img:string
}&I_imgMap
export const imgMap:I_imgMap[]=[
  {'name': '花纹蜘蛛（骑）', 'url': 'HuaWenZhiZhu(qi)', 'enName': 'Magma Spider（Knight）'},
  {'name': '食人花（刺）', 'url': 'ShiRenHua(ci)', 'enName': 'Piranha Plant（Assassin）'},
  {'name': '变异毒菇（法）', 'url': 'BianYiFaGu(fa)', 'enName': 'Mutant Mushroom(Wizard)'},
  {'name': '暮光幼龙（猎）', 'url': 'MuGuangYouLong(lie)', 'enName': 'Moonlight Dragon（Hunter）'},
  {'name': '冰原雪人（骑）', 'url': 'BinYuanXueRen(qi)', 'enName': 'Icefield Yeti（Knight)'},
  {'name': '哥布林小鬼（刺）', 'url': 'GeBuLinXiaoGui(ci)', 'enName': 'Goblin（Assassin）'},
  {'name': '独眼兽（法）', 'url': 'DuYanShou(fa)', 'enName': 'Cyclopes (Wizard)'},
  {'name': '半兽勇士（猎）', 'url': 'BanShouYongShi(lie)', 'enName': 'Orc（Hunter）'},
  {'name': '暗黑领主（骑）', 'url': 'AnHeiLingZhu', 'enName': 'Dark Lord(Knight)', isBoss: true, bossIcon: 'boss'},
  {'name': '暗黑领主（刺）', 'url': 'AnHeiLingZhu', 'enName': 'Dark Lord(Assassin)', isBoss: true, bossIcon: 'boss'},
  {'name': '暗黑领主（法）', 'url': 'AnHeiLingZhu', 'enName': 'Dark Lord(Wizard)', isBoss: true, bossIcon: 'boss'},
  {'name': '暗黑领主（猎）', 'url': 'AnHeiLingZhu', 'enName': 'Dark Lord(Hunter)', isBoss: true, bossIcon: 'boss'},

  {'name': '暗黑统领（骑）', 'url': 'AnHeiTongLing', 'enName': 'Dark Lord(Knight)', isBoss: true, bossIcon: 'bossMoney'},
  {'name': '暗黑统领（刺）', 'url': 'AnHeiTongLing', 'enName': 'Dark Lord(Assassin)', isBoss: true, bossIcon: 'bossMoney'},
  {'name': '暗黑统领（法）', 'url': 'AnHeiTongLing', 'enName': 'Dark Lord(Wizard)', isBoss: true, bossIcon: 'bossMoney'},
  {'name': '暗黑统领（猎）', 'url': 'AnHeiTongLing', 'enName': 'Dark Lord(Hunter)', isBoss: true, bossIcon: 'bossMoney'},
  {'name': '丛林屠夫（骑）', 'url': 'CongLinTuFu(qi)', 'enName': 'Jungle Butcher（Knight）'},
  {'name': '巡逻护卫（刺）', 'url': 'XunLuoHuWei(ci)', 'enName': 'Patrol Goblin（Assassin）'},
  {'name': '部落巫师（法）', 'url': 'BuLuoWuShi(fa)', 'enName': 'Tribal Wizard（Wizard)'},
  {'name': '游荡僵尸（猎）', 'url': 'YouDangJiangShi(lie)', 'enName': 'Zombie（Hunter）'},
  {'name': '牛头人战士（骑）', 'url': 'NiuTouRenZhanShi(qi)', 'enName': 'Minotaur（Knight）'},
  {'name': '丛林幼龙（刺）', 'url': 'CongLinYouLong(ci)', 'enName': 'Jungle Dragon（Assassin）'},
  {'name': '巨蜥教徒（法）', 'url': 'JuXiJiaoTu(fa)', 'enName': 'Lizard Mage（Wizard）'},
  {'name': '恶魔学徒（猎）', 'url': 'EMoXueTu(lie)', 'enName': 'Demon Apprentice（Hunter）'},
  {'name': '巨石魔像（骑）', 'url': 'JuShiMoXiang(qi)', 'enName': 'Rock Monster（Knight）'},
  {'name': '水晶魔像（刺）', 'url': 'ShuiJinMoXiang(ci)', 'enName': 'Crystal Monster（Assassin）'},
  {'name': '红龙（法）', 'url': 'HongLong(fa)', 'enName': 'Red Dragon（Wizard）'},
  {'name': '黑龙（猎）', 'url': 'HeiLong(lie)', 'enName': 'Black Dragon（Hunter）'},
  {'name': '邪恶蜘蛛（骑）', 'url': 'XieEZhiZhu(qi)', 'enName': 'Evil Spider（Knight）'},
  {'name': '金甲蚁（刺）', 'url': 'JinJiaYi(ci)', 'enName': 'Golden Ant（Assassin）'},
  {'name': '金甲虫（法）', 'url': 'JinJiaChong(fa)', 'enName': 'Golden Beetle（Wizard）'},
  {'name': '致命毒蚁（猎）', 'url': 'ZhiMingDuYi(lie)', 'enName': 'Fatal Ant（Hunter)'},
  {'name': '冰霜护卫（骑）', 'url': 'BinShuangHuWei(qi)', 'enName': 'Frost Guardian（Knight）'},
  {'name': '混沌魔像（刺）', 'url': 'HunDunMoXiang(ci)', 'enName': 'Chaos Demon（Assassin）'},
  {'name': '魔蜥（法）', 'url': 'MoXi(fa)', 'enName': 'Devil Lizard（Wizard）'},
  {'name': '机械魔龙（猎）', 'url': 'JiXieMoLong(lie)', 'enName': 'Magic Dragon（Hunter）'},
  {'name': '监狱护卫（骑）', 'url': 'JiangYuHuWei(qi)', 'enName': 'Prison Guard（Knight）'},
  {'name': '虚空之翼（刺）', 'url': 'XuKongZhiYi(ci)', 'enName': 'Lethal Insect（Assassin）'},
  {'name': '无头僵尸（法）', 'url': 'WuTouJiangShi(fa)', 'enName': 'Headless Zombies（Wizard）'},
  {'name': '迷踪之牙（猎）', 'url': 'ZhuiZongZhiYa(lie)', 'enName': 'Werewolf（Hunter）'},
  {'name': '半兽猪卫（骑）', 'url': 'BanShouZhuWei(qi)', 'enName': 'Boar Guard（Knight）'},
  {'name': '邪恶毒蛇（刺）', 'url': 'XieEDuShe(ci)', 'enName': 'Evil Centipede（Assassin）'},
  {'name': '神庙卫士（法）', 'url': 'ShenMiaoWeiShi(fa)', 'enName': 'Beast Magician（Wizard）'},
  {'name': '苦痛侍卫（猎）', 'url': 'TongKuShiWei(lie)', 'enName': 'Mutant Horsemen（Hunter）'},
  {'name': '巨猿血祖（骑）', 'url': 'JuYuanXueZu(qi)', 'enName': 'El Gigante（Knight）'},
  {'name': '绝域魔偶（刺）', 'url': 'JueYuMoOu(ci)', 'enName': 'Two-headed Goblin（Assassin）'},
  {'name': '魔血巨人（法）', 'url': 'MoXueJuRen(fa)', 'enName': 'Red Devil（Wizard）'},
  {'name': '亡灵卫士（猎）', 'url': 'WangLinWeiShi(lie)', 'enName': 'Devil King（Hunter）' }
]
const imgComPath=`${process.env.PUBLIC_URL}/images/monsters/`
export const getMonsterData=(name:string, type=''):null|string|I_monsterConfigData=>{
  const data=imgMap.find((item)=>{
    return item.name === name||item.enName===name
  })
  if (data){
    const headImg=imgComPath+'/head/'+data.url+'_1.png'
    const img=imgComPath+data.url+'.png'
    const backData={
      ...data,
      headImg: headImg,
      img: img
    }

    if (type==='head'){
      return headImg
    } else if (type==='name'){
      //英文名称
      return data.enName
    } else if (type==='img'){
      return img
    } else {
      return backData
    }

  } else {
    return null
  }

}
