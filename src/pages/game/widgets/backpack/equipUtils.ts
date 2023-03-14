import { I_Equip } from '.'

export const equipImgComPath=`${process.env.PUBLIC_URL}/images/equip/`

export const getEquipImg=(url:string)=>{
  return equipImgComPath+url+'.png'
}
/**
 * 获取我的装备列表
 * @returns {keyList,equipList}
 */
export const equipSpilt=(list:I_Equip[])=>{
  const keyList:I_Equip[]=[]
  const equipList:I_Equip[]=[]
  list.forEach(item => {
    if (item.id===0){
      keyList.push(item)
    } else {
      equipList.push(item)
    }
  })
  return {
    keyList,
    equipList
  }
}
/**
 * 获取钥匙种类
 * @param keyList
 * @returns
 */
export const getKeyPackage=(keyList:I_Equip[])=>{

  const initKeyList:I_Equip[][]=[[], [], [], []]

  keyList.forEach(item => {
    if (item.key>=1&&item.key<=4){
      initKeyList[item.key-1].push(item)
    }
  })
  return initKeyList
}

export const groupBy= (data:any[], key:string) => {
  return data.reduce(function(prev, cur) {
    (prev[cur[key]] = prev[cur[key]] || []).push(cur)
    return prev
  }, {})
}
export const groupByArr= (data:I_Equip[], key:string) => {
  const initArr:I_Equip[][]=[]
  data.forEach((item, index) => {
    const findIndex=initArr.findIndex((findItem)=>findItem.length>0&&findItem[0].name===item.name)
    if (findIndex>=0){
      initArr[findIndex].push(item)
    } else {
      initArr.push([item])
    }

  })

  return initArr
}
