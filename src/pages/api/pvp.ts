
import { T_PVPResult } from '../game/widgets/arena/log/log'
import { I_HeroEquip } from '../game/widgets/backpack'
import { axiosRequest } from './request'
// , 'https://m.game2012.cn'
export type T_pvpHero=I_HeroEquip & {player: string}
export type PVPBattleRecord = {
  prepareInfo: {
    mapId: number
    lv: number
    time: number
    hero1: T_pvpHero,
    hero2: T_pvpHero
  }
  rounds: {
    round: number,
    hero1: T_PVPRoundInfo,
    hero2: T_PVPRoundInfo
  }[]
  settles: {
    hero1: PVPSettleInfo
    hero2: PVPSettleInfo
  }

}
 type T_PVPRoundInfo = {isAttack:boolean,
  Dstrike: number
  Mstrike: number
  HP: number,
  allGold: number,
  allDlt: number,
  winEquips: string[]}

type PVPSettleInfo = {
  win: boolean
  allGold: number
  allDlt: number
  winEquips: []
  equipAlreayDrop: boolean
}
/**
 * 获取pvp 战斗记录
 * @param playerAddress 战斗id
 * @returns pve数据,
 */
export const getPvpLogApi = async (playerAddress: string): Promise<T_PVPResult[]> => {
  const res = await axiosRequest({
    method: 'get',
    url: `/pvp/pvpList?player=${playerAddress}`
  })
  if (res.status === 200) {
    return res.data
  } else {
    return []
  }
}
/**
 * 获取pvp取消签名
 * @param playerAddress 战斗id
 * @returns pve数据,
 */
export const cancelApi = async (player: string, joinId:string, sign:string): Promise<string> => {
  const res = await axiosRequest({
    method: 'post',
    url: '/pvp/cancel',
    data: {
      player,
      joinId,
      sign
    }
  })
  if (res.status === 200) {
    return res.data.sign
  } else {
    return ''
  }
}


/**
 * 获取pvp 战斗记录
 * @param playerAddress 战斗id
 * @returns pve数据,
 */
export const getPvpbatterApi = async (joinId:string): Promise<PVPBattleRecord|null> => {
  const res = await axiosRequest({
    method: 'get',
    url: '/pvp/pvpInfo',
    params: {
      joinId
    }
  })
  if (res.status === 200) {
    return res.data
  } else {
    return null
  }
}


export interface I_getPvpClaimObjectsApi{

  allDlt: number

  allGold:number

  heroNum:number

  lossEquips:[]

  lossTimes:number

  winEquips:[]

  winTimes:number

}
/**
 * 获取pvp可领取的奖励
 * @param playerAddress 战斗id
 * @returns pve数据,
 */
export const getPvpClaimObjectsApi = async (player: string): Promise<I_getPvpClaimObjectsApi> => {
  const res = await axiosRequest({
    method: 'get',
    url: '/pvp/getClaimObjects',
    params: {
      player
    }
  })
  if (res.status === 200) {
    return res.data
  } else {
    return {
      allDlt: 0,
      allGold: 0,
      heroNum: 0,
      lossEquips: [],
      lossTimes: 0,
      winEquips: [],
      winTimes: 0
    }
  }
}


/**
 * 获取pvp 获取全部收益
 * @param playerAddress 玩家id
 * @returns pve数据,
 */
export const getPvpClaimAllApi = async (player: string): Promise<{joinIds:string[], allDlts: number, allGolds: number, sig:string }> => {
  const res = await axiosRequest({
    method: 'get',
    url: `/pvp/claimAll?player=${player}`
  })
  if (res.status === 200) {
    return res.data
  } else {
    return {
      allDlts: 0,
      allGolds: 0,
      sig: '',
      joinIds: []
    }
  }
}
