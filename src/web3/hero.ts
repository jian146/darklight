import { BigNumber, ContractReceipt, ethers } from 'ethers'
import { notification } from 'antd'
import { HeroType } from 'src/types/hero'
import { Web3Provider } from '@ethersproject/providers'
import { getDlt, getHero, getPve } from '.'
import { i_makeHeroApi_back, getHerosApi } from 'src/pages/api/card'


/**
 * @description 抽卡
 * @param provider web3React Library
 * @param newbie 是否是新手卡
 * @returns 英雄 或者 null
 */
export const buyHero = async (provider: Web3Provider, newbie = false): Promise<{hero:HeroType & { [key: string]: any, tokenId: ethers.BigNumber } | null, luckyIndex:number}|null> => {
  const hero = getHero(provider)
  //这里会去调用合约
  const tx = await hero.buyHero(newbie, { gasLimit: 800000 })
  const receipt: ContractReceipt = await tx.wait()

  /*
   *  TODO，这里需要测试一下
   * event 里面的args中有个tokenId就是英雄id
   */
  let tokenId
  let luckyIndex=-1
  if (receipt.events) {

    for (const event of receipt.events) {
      if (event.event === 'BuyHero') {
        //从1开始,0是不存在
        if (event.args?.luckyIndex){
          const index=event.args?.luckyIndex.toNumber()
          luckyIndex=index-1
        }
        tokenId = event.args?.tokenIds[0]
      }
    }
  }
  //然后可以用tokenId查英雄
  if (tokenId) {

    const res = await hero.getHero(tokenId)
    return {
      hero: res,
      luckyIndex: luckyIndex
    }

  } else {
    notification.error({
      message: '获取英雄失败',
      duration: 1
    })
    return null
  }

}
/**
 * @description 多连抽抽卡
 * @param provider web3React Library
 * @param count 数量
 * @param newbie 是否是新手卡
 * @returns 英雄 或者 null
 */
export const buyHerobyCount = async (provider: Web3Provider, count = 10, newbie = false): Promise<{list:HeroType[] & { [key: string]: any, tokenId: ethers.BigNumber }, luckyIndex:number}| null > => {
  const hero = getHero(provider)
  //这里会去调用合约
  const tx = await hero.buyHeros(newbie, count, { gasLimit: 8109950 })
  const receipt: ContractReceipt = await tx.wait()
  /*
   *  TODO，这里需要测试一下
   * event 里面的args中有个tokenId就是英雄id
   */
  let tokenId
  let luckyIndex=-1
  if (receipt.events) {
    for (const event of receipt.events) {
      //以前是事件BuyHero
      if (event?.event === 'BuyHero') {
        // lucklyIndex=0

        //从1开始,0是不存在
        const index=event.args?.luckyIndex.toNumber()
        if (index>=0){
          luckyIndex=index-1
        }
        tokenId = event.args?.tokenIds


      }
    }
  }

  //然后可以用tokenId查英雄,此处是获取多个英雄
  if (tokenId) {
    try {
      const res = await hero.getHeros(tokenId)
      return {
        list: res,
        luckyIndex: luckyIndex
      }

    } catch (error) {
      notification.error({
        message: '获取英雄失败',
        duration: 1
      })
      console.error('从链上获取英雄数据失败：', error)
      return null
    }


  } else {
    notification.error({
      message: '获取英雄失败',
      duration: 1
    })
    return null
  }

}
/**
 * 同步链上英雄数据再显示
 * @param tokenIdArr
 * @param provider
 * @returns
 */
export const syncData=async ( tokenIdArr:BigNumber[], provider:Web3Provider)=>{
  const hero = getHero(provider)
  const awaitFun=async(delaytime = 1000) => {
    return new Promise(resolve => setTimeout(resolve, delaytime))
  }
  const searchRes = await hero.getHeros(tokenIdArr)


  let isOK=true
  for (let i=0; i<searchRes.length; i++){
    if (searchRes[i].strength===0||searchRes[i].agility===0){
      isOK=false
      break
    }
  }
  if (!isOK){


    await awaitFun()
    await syncData( tokenIdArr, provider)

  }

  return tokenIdArr

}
/**
 * @description 多连抽抽卡
 * @param provider web3React Library
 * @param count 数量
 * @param tokenType 支付类别 1，默认dlt, 2 为dlc
 * @returns 英雄 或者 null
 */
export const buyHerobyCountAbi = async (provider: Web3Provider, count = 10, tokenType:boolean, ): Promise<i_makeHeroApi_back[]| null > => {
  const hero = getHero(provider)
  //这里会去调用合约
  const tx = await hero.newBuyHeros(false, count, tokenType?1:2, { gasLimit: count===1?810995:8109950 })
  const receipt: ContractReceipt = await tx.wait()
  /*
   *  TODO，这里需要测试一下
   * event 里面的args中有个tokenId就是英雄id
   */
  let tokenIdArr:BigNumber[]=[]
  // let luckyIndex=-1
  if (receipt.events) {
    for (const event of receipt.events) {
      //以前是事件BuyHero
      if (event?.event === 'BuyHero2') {
        // lucklyIndex=0
        //从1开始,0是不存在
        // const index=event.args?.luckyIndex.toNumber()
        // if (index>=0){
        //   luckyIndex=index-1
        // }
        tokenIdArr = event.args?.tokenIds


      }
    }
  }

  //然后可以用tokenId查英雄,此处是获取多个英雄
  if (tokenIdArr&&tokenIdArr.length>0) {
    try {

      // item.tokenId= BigNumber.from((tokenId as any).hex).toHexString()
      await syncData( tokenIdArr, provider)
      const res=await getHerosApi(tokenIdArr.map((item)=>{ return item.toHexString() }))
      //等待同步
      return res


      // return {
      //   list: [],
      //   luckyIndex: luckyIndex
      // }
      // return res

      // return {
      //   list: res.map((item:any) => {
      //     return {
      //       ...item,
      //       tokenId: (item.tokenId as BigNumber).toHexString()
      //     }
      //   }),
      //   luckyIndex: luckyIndex
      // }

    } catch (error) {
      notification.error({
        message: '获取英雄失败',
        duration: 1
      })
      console.error('从链上获取英雄数据失败：', error)
      return null
    }


  } else {
    notification.error({
      message: '获取英雄失败',
      duration: 1
    })
    return null
  }

}

/**
 * @description 获取英雄列表
 * @param provider web3React Library
 * @returns Promise 英雄列表
 */
export const myHerosNew = async (provider: Web3Provider): Promise<HeroType[]> => {
  const hero = getHero(provider)
  const res = await hero.getMyHeros()
  const list= res.map((hero:HeroType)=>{
    const {
      strength,
      agility,
      stamina,
      will,
      intelligence,
      mind,
      tokenId,
      fatigue
    } = hero
    return {
      ...hero,
      tokenId: (tokenId as any).toHexString(),
      fatigue: (fatigue as any).toNumber(),
      total: strength + agility + stamina + will + intelligence + mind
    }
  })
  return list
}
/**
 * @description 获取英雄列表
 * @param provider web3React Library
 * @returns Promise 英雄列表
 */
export const myHeros = async (provider: Web3Provider): Promise<HeroType[]> => {
  const hero = getHero(provider)
  const list: HeroType[] = []
  //获取英雄总数
  const balance: ethers.BigNumber = await hero.balanceOf(
    await provider.getSigner().getAddress()
  )
  const total = balance.toNumber()
  for (let index = 0; index < total; index++) {
    const tokenId: BigNumber = await hero.tokenOfOwnerByIndex(
      await provider.getSigner().getAddress(),
      index
    )
    const res = await getHeroByTokenId(provider, tokenId.toHexString())
    list.push(res)
  }
  return list
}


/**
 * @description 根据tokenId 获取英雄详细信息
 * @param provider web3React Library
 * @param tokenId tokenId
 * @param isPve  是否需要pve信息
 * @returns Promise<HeroType>
 */
export const getHeroByTokenId = async (provider: Web3Provider, tokenId: string, isPve=false): Promise<HeroType&{pveCount:number}> => {
  const hero = getHero(provider)
  const {
    occupation,
    strength,
    agility,
    stamina,
    will,
    intelligence,
    mind,
    level,
    newbie,
    fatigue
  } = await hero.getHero(tokenId)
  let pveCount=-1
  if (isPve){
    const pveProvider = getPve(provider)
    const pveRes= await pveProvider.getAvailableGameTimes([tokenId])
    pveCount=pveRes[0].toNumber()
  }
  return {
    pveCount,
    occupation,
    strength,
    agility,
    stamina,
    will,
    intelligence,
    mind,
    level,
    newbie,
    fatigue: (fatigue as BigNumber).toNumber(),
    tokenId,
    total: strength + agility + stamina + will + intelligence + mind
  }
}

/**
 * @description 根据 tokenId 列表获取英雄列表
 * @param provider web3React Library
 * @param tokenIds tokenId 列表
 * @returns
 */
export const getHerosByTokenIds = async (provider: Web3Provider, tokenIds: ethers.BigNumber[]) => {
  const hero = getHero(provider)
  return await hero.getHeros(tokenIds)
}

/**
 * @description 英雄升级
 * @param provider web3React Library
 * @param tokenId tokenId
 * @param isUseSafe 保险
 * @returns Promise<ContractReceipt>
 */
export const heroUpgradeLv = async (provider: Web3Provider, tokenId: string, isUseSafe:boolean): Promise<ContractReceipt> => {
  try {
    const hero = getHero(provider)
    const tx = await hero.upgradeLv(tokenId, isUseSafe, {gasLimit: 1000000})
    return await tx.wait()
  } catch (error) {
    console.error('英雄升级失败', 'tokenId:'+tokenId, 'isUseSafe:是否用了保险'+isUseSafe, error)
    return Promise.reject(error)
  }
}

/**
 * @description 英雄降级
 * @param provider web3React Library
 * @param tokenId tokenId
 * @returns Promise<ContractReceipt>
 */
export const heroDowngradeLv = async (provider: Web3Provider, tokenId: string): Promise<ContractReceipt> => {
  const hero = getHero(provider)
  const tx = await hero.downgradeLv(tokenId)
  return await tx.wait()
}

/**
 * @description 英雄转移
 * @param provider web3React Library
 * @param tokenId tokenId
 * @param inputAddress 用户输入的地址
 * @returns Promise<ContractReceipt>
 */
export const heroTransfer = async (provider: Web3Provider, tokenId: string, inputAddress: string): Promise<ContractReceipt> => {

  const hero = getHero(provider)
  const myAddress =await provider.getSigner().getAddress()
  const tx = await hero.transferFrom(myAddress, inputAddress, tokenId)
  return await tx.wait()
}

/**
 * @description 合卡
 * @param provider web3React Library
 * @param ids 英雄tokenId的数组
 * @param newbie 是否是新手卡
 * @param feeType 付款方式 1 Gold   2 Dlt
 */
export const combineCard = async (
  provider: Web3Provider,
  ids: string[],
  newbie = false,
  feeType=1
): Promise<ContractReceipt> => {
  try {
    const hero = getHero(provider)
    //因为有随机计算，不指定gas，钱包估算不准确
    const tx = await hero.combine(ids, newbie, feeType, { gasLimit: 1000000 })

    return tx.wait()
  } catch (error) {
    console.error('手动抛出', error)
    return Promise.reject(error)
  }

}
/**
 * @description 获取幸运值
 * @param provider web3React Library
 * @returns Promise<ContractReceipt>
 */
export const luckyRate=async (provider: Web3Provider) => {
  const hero = getHero(provider)
  const myAddress =await provider.getSigner().getAddress()
  const tx = await hero.luckyRate(myAddress)
  return tx.toNumber()
}


/**
 * @description 英雄洗属性
 * @param provider web3React Library
 * @param tokenId tokenId 英雄tokenid
 * @param feeType 付款方式 1Gold 2Dlt
 * @returns Promise<ContractReceipt>
 */
export const recast = async (provider: Web3Provider, tokenId: string, feeType:number): Promise<ContractReceipt> => {
  const hero = getHero(provider)
  try {
    const tx = await hero.recast(tokenId, feeType, {gasLimit: 1000000})
    return await tx.wait()
  } catch (error) {
    console.error('手动抛出', error)
    return Promise.reject(error)
  }
}


/**
 * @description 获取奖金池余额
 * @param provider web3React Library
 * @returns Promise<ContractReceipt>
 */
export const getLuckFomoDLT=async (provider: Web3Provider) => {
  const hero = getHero(provider)
  const address = await hero.luckyFomo()
  const dlt = getDlt(provider)
  const dltGroup= await dlt.balanceOf(address)
  return ethers.utils.formatEther(dltGroup)
}


