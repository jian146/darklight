import { I_Equip } from '../game/widgets/backpack'
import { axiosRequest } from './request'

/**
 * 获取开箱授权
 * @param tokenIds 装备token
 * @returns pve数据,
 */
export const getOpenboxSignApi =async (playerAddress:string, tokenId:string): Promise<string> => {
  const errorData=''
  try {
    const res = await axiosRequest({
      method: 'get',
      url: `/equip/getOpenboxSign?player=${playerAddress}&tokenId=${tokenId}`
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
 * 打开箱子
 * @param tokenIds 装备token
 * @returns pve数据,
 */
export const openBoxApi =async (playerAddress:string, tokenId:string, sign:string): Promise<I_Equip[]> => {
  const errorData: I_Equip[]=[]
  try {
    const res = await axiosRequest({
      method: 'post',
      url: '/equip/openBox',
      data: {

        tokenId,
        sign,
        player: playerAddress
      }
    })
    if (res.status === 200) {
      return [res.data]
    } else {
      return errorData
    }
  } catch (error) {
    console.error('获取我的装备失败')
    return errorData
  }

}
