import ai from './'

/**
 * 获取推荐新Mv
 * @returns
 */
export function getNewMv(type = '0'): Return {
  const url = '/api/new/mv'
  return new Promise((resolve) => {
    setTimeout(() => {
      ai.get(url, { params: { type } })
        .then((res) => {
          resolve([res.errMsg, res.data])
        })
    }, 350)
  })
}
/**
 * 获取mv分类
 * @returns
 */
export function getMvCate(): Return {
  const url = '/api/mv/category'
  return new Promise((resolve) => {
    ai.get(url)
      .then((res) => {
        resolve([res.errMsg, res.data])
      })
  })
}
/**
 * 根据分类获取mv
 * @returns
 */
export function getMvByCate({
  area = 15,
  version = 7,
  pageNo = 1,
  pageSize = 20,
},
): Return {
  const url = '/api/mv/list'
  return new Promise((resolve) => {
    setTimeout(() => {
      ai.get(url, {
        params: {
          pageNo,
          pageSize,
          area,
          version,
        },
      })
        .then((res) => {
          resolve([res.errMsg, res.data])
        })
    }, 350)
  })
}
