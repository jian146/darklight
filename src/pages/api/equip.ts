import { I_Equip } from '../game/widgets/backpack'
import { axiosRequest } from './request'

/**
 * 获取我的装备列表
 * @param playerAddress 玩家地址
 * @param kind 类别 0全部   1, 钥匙   2， 装备
 * @returns pve数据,
 */
export const getMyEquipsApi = async (playerAddress:string, kind=0): Promise<I_Equip[]> => {
  const errorData: I_Equip[]=[]
  try {
    const res = await axiosRequest({
      method: 'get',
      url: `/equip/myEquipInfos?player=${playerAddress}`
    })
    if (res.status === 200) {
      const backList:I_Equip[]=res.data.filter((item:I_Equip)=>{
        //   if(kind===0){
        //       return true;
        //   }else if(:kind===1&&item.id===0){

        //   }
        return kind===0?true:(kind===1&&item.id===0)||(kind===2&&item.id!==0)


      })

      return backList
    } else {
      return errorData
    }
  } catch (error) {
    console.error('获取我的装备失败')
    return errorData
  }

}


/**
 * 根据tokenId数组获取装备信息
 * @param tokenIds 装备token
 * @returns pve数据,
 */
export const getInfosApi = async (tokenIds:string[]): Promise<I_Equip[] > => {
  const errorData: I_Equip[]=[]
  try {
    const res = await axiosRequest({
      method: 'post',
      url: '/equip/getInfos',
      //   data: tokenIds
      data: {
        tokenIds: tokenIds
      }
    })
    if (res.status === 200) {
      const backList:I_Equip[]=res.data

      return backList
    } else {
      return errorData
    }
  } catch (error) {
    console.error('获取我的装备失败')
    return errorData
  }

}

/**
 * 获取开箱记录
 * @param tokenIds 装备token
 * @returns pve数据,
 */
export const myOpenBoxHistoryApi =async (playerAddress:string, kind=0): Promise<(I_Equip&{date:number})[]> => {
  const errorData: (I_Equip&{date:number})[]=[]
  try {
    const res = await axiosRequest({
      method: 'get',
      url: `/equip/myOpenBoxHistory?player=${playerAddress}`
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
