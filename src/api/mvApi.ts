import ai from './'

/**
 * 获取推荐新Mv
 * @returns
 */
export function getNewMv(type = '0'): Return {
  const url = '/api/new/mv'
  return new Promise((resolve) => {
    ai.get(url, { params: { type } })
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, null])
      })
  })
}
