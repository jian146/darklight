const storage = {
  getString: (name: string) => {
    const result = localStorage.getItem(name)
    if (!!result) {
      return result
    } else {
      return null
    }
  },
  getObject: (name: string) => {
    const result = localStorage.getItem(name)
    if (!!result) {
      return JSON.parse(result)
    } else {
      return null
    }
  },
  getSession: (name: string) => {
    const result = sessionStorage.getItem(name)
    if (!!result) {
      return JSON.parse(result)
    } else {
      return null
    }
  },

  setSession: (name: string, value: string) => {
    sessionStorage.setItem(name, value)
  },
  setString: (name: string, value: string) => {
    localStorage.setItem(name, value)
  },
  setObject: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name)
  }
}

export const setToken = (token: string) => {
  const nowTime = new Date().getTime()
  storage.setString('token', token)
  storage.setString('tokenST', `${nowTime}`)
}

export const getToken = () => {
  const token = storage.getString('token')
  const tokenST = storage.getString('tokenST')
  // 7天为过期时间
  const expiration = 7 * 86400000
  const nowTime = new Date().getTime()
  if (!!token && !!tokenST) {
    // 判断token是否过期
    if (parseInt(tokenST) + expiration > nowTime) {
      return token
    } else {
      return null
    }
  } else {
    return null
  }
}

export const isLogin = () => {
  return getToken() && storage.getObject('userInfo')?.name
}

export default storage
