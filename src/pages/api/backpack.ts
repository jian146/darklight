
import { I_Equip, I_HeroEquip } from '../game/widgets/backpack'
import { axiosRequest, I_error, I_ServerError } from './request'


/**
 * 获取上装备下装备授权
 * @param player 玩家地址
 * @param heroId 英雄token
 * @param equipId 装备token
 * @returns pve数据,
 */
export const getPutTakeEquipSignApi =async (player:string, heroId:string, equipIds:string[]): Promise<string> => {
  const errorData=''
  try {
    const res = await axiosRequest({
      method: 'post',
      url: '/equip/getPutTakeEquipSign',
      data: {
        player,
        heroId,
        equipIds: equipIds
      }
    })
    if (res.status === 200) {
      return res.data.origin
    } else {
      return errorData
    }
  } catch (error) {
    console.error('获取装备授权失败')
    return errorData
  }

}
/**
 * 穿装备
 * @param tokenIds 装备token
 * @returns 装备数据,
 */
export const putOnEquipApi =async (player:string, heroId:string, equipId:string, position:number, sign:string): Promise<I_HeroEquip|null> => {
  const errorData=null
  try {
    const res = await axiosRequest({
      method: 'post',
      url: '/equip/putOnEquip',
      data: {
        player,
        heroId,
        equipId,
        position,
        sign: sign
      }
    })

    if (res.status === 200) {
      return res.data
    } else {
      return errorData
    }
  } catch (error) {
    console.error('获取我的装备失败')
    return errorData
  }

}
/**
 * 脱装备
 * @param tokenIds 装备token
 * @returns 脱装备,
 */
export const takeOffEquipApi =async (player:string, heroId:string, equipIds:string[], positions:number[], sign:string): Promise<I_HeroEquip|null> => {
  const errorData=null
  try {
    const res = await axiosRequest({
      method: 'post',
      url: '/equip/takeOffEquip',
      data: {
        player,
        heroId,
        equipIds,
        positions,
        sign: sign
      }
    })

    if (res.status === 200) {
      return res.data
    } else {
      return errorData
    }
  } catch (error) {
    console.error('获取我的装备失败')
    return errorData
  }

}


/**
 * 查看装备信息
 * @param heroId
 * @returns
 */
export const queryHeroEquipApi=async ( heroId:string,): Promise<I_HeroEquip|null> => {
  const errorData=null
  try {
    const res = await axiosRequest({
      method: 'get',
      url: '/equip/queryHeroEquip',
      params: {
        heroId
      }
    })
    if (res.status === 200) {
      return res.data
    } else {
      return errorData
    }
  } catch (error) {
    console.error('获取我的装备失败')
    return errorData
  }

}

/**
 * 查看当前锻造可用信息
 * @param play  玩家id
 * @returns
 */
export const getForgeInfoApi=async ( player:string,): Promise<{forgeType:number}|null> => {
  const errorData=null
  try {
    const res = await axiosRequest({
      method: 'get',
      url: '/equip/getForgeInfo',
      params: {
        player
      }
    })
    if (res.status === 200) {
      return res.data
    } else {
      return errorData
    }
  } catch (error) {
    console.error('获取我的装备失败')
    return errorData
  }

}
export type I_recastApi=I_Equip&{success:boolean, forgeType:number}
/**
 * 锻造装备
 * @param equipId
 * @returns
 */
export const recastApi=async ( castId:string, equipId:string, materialId1:string, materialId2:string): Promise<I_recastApi|null|I_ServerError> => {
  const errorData=null
  try {
    const res = await axiosRequest({
      method: 'post',
      url: '/equip/recast',
      data: {
        equipId,
        castId,
        materialId1,
        materialId2
        // castType,
        // player,
        // sign
      }
    })
    if (res.status === 200) {
      return res.data
    } else {
      if (( res as unknown as I_error).message.data){
        return ( res as unknown as I_error).message.data
      }
      return errorData
    }
  } catch (error) {
    console.error('获取我的装备失败')
    return errorData
  }

}
