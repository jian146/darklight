
import axios, { AxiosResponse } from 'axios'
import { I_BattleLog } from 'src/pages/game/widgets/adventure/components/pveLog/pveLog'

import { BigNumber } from 'ethers'
import { message } from 'antd'
import { isServerConfig } from '../../config/switch'
import { I_Equip } from '../game/widgets/backpack'


const isDev= process.env.REACT_APP_MODEL_ISDEV
const pveUrl = isDev==='true' ? 'https://service.darklight.shop' : process.env.REACT_APP_PVE_API

export const renderServerInfo=isServerConfig?'Server maintenance 服务器维护，请稍后访问':'Server Error 服务器请求错误'
export interface I_ServerError{
  errMsg:string
}
export interface I_error{
  status: false,
  message:any
}

const messageError=(res:AxiosResponse<any, any>, isShowErrorMessage:boolean) => {

  if (res.data?.errMsg){
    isShowErrorMessage&&message.error(res.data.errMsg)
    return false
  } else {
    return true
  }
}
// const baseUrl='http://nps.game2012.cn:19815/'
export const axiosRequest = async ({isShowErrorMessage=true, ...axiosParm }, baseUrl = pveUrl ) => {

  axios.interceptors.response.use(
    response => {
      if (response.status===200&&!messageError(response, isShowErrorMessage)){
        const error:I_error={
          status: false,
          message: response
        }
        console.error(error)

        return error
      }
      return response
    },
    error => {
      if (error?.response) {
        switch (error.response.status) {
          case 500:


        }
      }
      return Promise.reject(error?.response?.data)
      // 返回接口返回的错误信息
    })

  return axios({
    ...axiosParm,
    url: baseUrl + axiosParm.url,
    timeout: axiosParm.axiosTimeout?axiosParm.axiosTimeout*1000:60*1000,
    // data: qs.stringify({
    //   accessToken: token,
    //   pageSize: 50
    // }),
    withCredentials: false
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  })
}

/**
 * 获取pve数据
 * @param battleId 战斗id
 * @returns pve数据,
 */
export const getBattleInfoApi = async (battleId: number) => {
  const res = await axiosRequest({
    method: 'get',
    url: `/battleInfo?battleId=${battleId}`
  })
  if (res.status === 200) {
    return res.data
  }

}

/**
 * 获取pve 战斗记录
 * @param playerAddress 战斗id
 * @returns pve数据,
 */
export const getBattleLogListApi = async (playerAddress: string): Promise<I_BattleLog[]> => {
  const res = await axiosRequest({
    method: 'get',
    url: `/battleList?player=${playerAddress}`
  })
  if (res.status === 200) {
    return res.data
  } else {
    return []
  }
}

/**
 * 获取pve 获取全部收益
 * @param playerAddress 玩家id
 * @returns pve数据,
 */
export const getClaimObjectsApi = async (playerAddress: string): Promise<{ allDlt: number, allGold: number, coldTime:number, equips:I_Equip[] }> => {
  const res = await axiosRequest({
    method: 'get',
    url: `/getClaimObjects?player=${playerAddress}`
  })
  if (res.status === 200) {
    return res.data
  } else {
    return {
      allDlt: 0,
      allGold: 0,
      coldTime: 0,
      equips: []
    }
  }
}


export interface I_claimAllApi {
  allDlts: BigNumber,
  allGolds: BigNumber,
  battleIds: number[],
  sig: string,
  equips:BigNumber[]
}
/**
 * 获取服务器状态
 * @returns 是否正常
 */
export const getServerStatus = async (): Promise<boolean> => {


  try {
    const res = await axiosRequest({
      method: 'get',
      url: '/',
      axiosTimeout: 20
    })
    if (res.status === 200&&res.data?.status==='ok') {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }

}

/**
 * 获取pve 领取收益
 * @param playerAddress 战斗id
 * @returns pve数据,
 */
export const claimAllApi = async (playerAddress: string): Promise<I_claimAllApi> => {
  const res = await axiosRequest({
    method: 'get',
    url: `/claimAll?player=${playerAddress}`
  })
  if (res.status === 200) {
    const bigNumberArr=(res.data.equips as string[]).map((item)=>{
      return BigNumber.from(item)
    })
    return {...res.data,
      allDlts: BigNumber.from(res.data.allDlts),
      allGolds: BigNumber.from(res.data.allGolds),
      equips: bigNumberArr
    }
  } else {
    return {
      allDlts: BigNumber.from('0'),
      allGolds: BigNumber.from('0'),
      battleIds: [],
      sig: '',
      equips: []
    }
  }
}


export interface I_Bignumber{
  hex:string
  type:string
}
export interface I_getHarvestInfoApi{
  harvestAmount:I_Bignumber
  harvestBlock:number
  signature:string
  stakeAmount:I_Bignumber
  isSuccee:boolean
  player:string
  lastBlock:number

}
const initBignumber={
  hex: '',
  type: 'BigNumber'
}
/**
 * 收菜
 * @returns
 */
export const getHarvestInfoApi = async (player:string): Promise<I_getHarvestInfoApi> => {

  const errorData={
    isSuccee: false,
    harvestAmount: initBignumber,
    harvestBlock: 0,
    signature: '',
    stakeAmount: initBignumber,
    player: '',
    lastBlock: 0
  }
  try {
    const res = await axiosRequest({
      method: 'get',
      url: '/farm/getHarvestInfo?player='+player
    })
    if (res.status === 200) {
      return {
        isSuccee: true,
        ...res.data

      }
    } else {
      return errorData
    }
  } catch (error) {
    message.info(renderServerInfo)
    return errorData

  }

}


interface I_getUnstakeInfoApi {
  stakeIndexs:number[],
  harvestBlock:number
  harvestAmount:I_Bignumber
  signature:string
  stakeAmount:I_Bignumber
  lastBlock: number,
  player: string,
  isSuccee:boolean
}
/**
 * 解除
 * @returns 解除质押,
 */
export const getUnstakeInfoApi = async (player:string): Promise<I_getUnstakeInfoApi> => {
  const errorBack:I_getUnstakeInfoApi= {
    isSuccee: false,
    harvestAmount: initBignumber,
    harvestBlock: 0,
    signature: '',
    stakeAmount: initBignumber,
    stakeIndexs: [],
    lastBlock: 0,
    player: ''
  }
  try {
    const res = await axiosRequest({
      method: 'get',
      url: '/farm/getUnstakeInfo?player='+player
    })
    if (res.status === 200) {
      return {
        isSuccee: true,
        ...res.data
      }
    } else {
      return errorBack
    }
  } catch (error) {
    message.info(renderServerInfo)
    return errorBack

  }

}
export interface I_getApyInfo{
  APY:string
  dayAmount:string
  monthAmount:string
  stakeAmount: string
}


/**
 * 获取首页数据
 * @returns 首页数据,
 */
export const getgetApyInfoApi = async (): Promise<I_getApyInfo> => {
  try {
    const res = await axiosRequest({
      method: 'get',
      url: '/farm/getApyInfo'
    })
    if (res.status === 200) {
      return res.data
    } else {
      return {
        APY: '0',
        dayAmount: '0',
        monthAmount: '0',
        stakeAmount: '0'
      }
    }
  } catch (error) {
    message.info(renderServerInfo)
    return {
      APY: '0',
      dayAmount: '0',
      monthAmount: '0',
      stakeAmount: '0'
    }
  }

}
export interface I_getStakeInfo{
  stakeAmount:string,
  harvestAmount:string
  coldTime:number
}
/**
 * 获取个人流动性挖矿数据
 * @returns 个人数据,
 */
export const getStakeInfoApi = async(player:string): Promise<I_getStakeInfo> => {
  const errorData={
    stakeAmount: '0',
    harvestAmount: '0',
    coldTime: 0
  }
  try {
    const res = await axiosRequest({
      method: 'get',
      url: '/farm/getStakeInfo?player='+player
    })
    if (res.status === 200) {
      return res.data
    } else {
      return errorData
    }
  } catch (error) {
    message.info(renderServerInfo)
    return errorData

  }

}
