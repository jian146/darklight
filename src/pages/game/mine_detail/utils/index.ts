/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HeroType, Occupations } from 'src/types/hero'
import { MineMapType, WorkName } from 'src/types/mine'
import { JobType } from 'src/web3/job'

/**
 * @description 过滤符合条件的挖矿角色
 * @param heros 角色列表
 * @param limit 过滤条件
 * @returns 角色列表
 */
export const jobFilter = (heros: HeroType[], limit: MineMapType): HeroType[] => {

  //TODO: 过滤疲劳值为 0
  const targetList = heros.filter(item => item.fatigue > 0)

  // 兼职 / 试炼迷宫
  if (
    limit.name === WorkName.parttime ||
    limit.name === WorkName.slmg ||
    limit.name === WorkName.wrgc ||
    limit.name === WorkName.tzzd
  ) {
    return targetList.filter(item => item.level >= limit.level!)
  }
  // 锻造
  if (limit.name === WorkName.forging) {
    return targetList.filter(item => {
      return item.level >= limit.level! &&
             item.strength >= limit.strength! &&
             item.stamina >= limit.stamina! &&
             item.occupation === Occupations.warrior
    })
  }
  // 附魔
  if (limit.name === WorkName.enchanting) {
    return targetList.filter(item => {
      return item.level >= limit.level! &&
             item.intelligence >= limit.intelligence! &&
             item.mind >= limit.mind! &&
             item.occupation === Occupations.mage
    })
  }

  // 制皮
  if (limit.name === WorkName.leather) {
    return targetList.filter(item => {
      return item.level >= limit.level! &&
             item.strength >= limit.strength! &&
             item.agility >= limit.agility! &&
             item.occupation === Occupations.hunter
    })
  }
  // 采药
  if (limit.name === WorkName.medicinal) {
    return targetList.filter(item => {
      return item.level >= limit.level! &&
             item.strength >= limit.strength! &&
             item.agility >= limit.agility! &&
             item.occupation === Occupations.assassin
    })
  }
  if (limit.name === WorkName.cqly) {
    return targetList.filter(item => item.total > limit.total!)
  }
  return []
}

/**
 * @description 获取工作类型
 * @param workname 工作名称
 * @returns 类型
 */
export const getWrokQueryParam = (workname: WorkName): JobType => {
  if (workname === WorkName.parttime) return 1
  if (workname === WorkName.cqly) return 3
  return 2
}
