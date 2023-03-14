import { ethers, BigNumber } from 'ethers'

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 * 英雄属性
 */
export const enum HeroAttrList {
  strength = 'strength',
  agility = 'agility',
  stamina = 'stamina',
  will = 'will',
  intelligence = 'intelligence',
  mind = 'mind'
}


/**
 * @description 英雄类型
 */
export interface HeroType extends Mutable<{ [key in keyof typeof HeroAttrList]: number }> {
  occupation: number,
  tokenId: string,
  level: number,
  fatigue: number,
  total: number,
  newbie: boolean,
  totalProperty?: number
}
export interface abi_HeroType extends Mutable<{ [key in keyof typeof HeroAttrList]: number }> {
  occupation: number,
  tokenId: BigNumber,
  level: number,
  fatigue: number,
  total: number,
  newbie: boolean,
  totalProperty?: number
}
export type pve_heroType=HeroType&{pveCount:number}
/**
 * @description 售卖类型
 */
export type SaleType = {
  price: string
  onSell: boolean
  sellNo: ethers.BigNumber
  soldTime: ethers.BigNumber
}
/**
 * 市场类型
 */
export type marketType = {
  buyer?: string
  seller?:string

}

export type HeroWithPriceTypeWithMarket= HeroType & SaleType &marketType

/**
 * @description 带价格的英雄类型
 */
export type HeroWithPriceType = HeroType & SaleType

/**
 * @param 职业
 * @param warrior 骑士
 * @param mage 法师
 * @param hunter 猎人
 * @param assassin 刺客
 */
export enum Occupations {
  warrior,
  mage,
  hunter,
  assassin
}

/**
 * @description 英雄升级等级信息
 * @param gold 金币
 * @param dlt dlt
 * @param successRate 成功率
 * @param income 收益倍率
 */
export type UpgradeType = {
  gold: number,
  dlt: number,
  successRate: string,
  income: number
}

/**
 * 升级类型
 */
export type LevelType = 'lv2' | 'lv3' | 'lv4' | 'lv5' | 'lv6' | 'lv7' | 'lv8'
  | 'lv9' | 'lv10' | 'lv11' | 'lv12'
