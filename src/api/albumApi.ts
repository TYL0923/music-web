import ai from './'

/**
 * 获取推荐新专辑
 * @returns
 */
export function getNewAlbums(type = '1', num = 10): Return {
  const url = '/api/new/album'
  return new Promise((resolve) => {
    ai.get(url, { params: { type, num } })
      .then((res) => {
        resolve([res.errMsg, res.data])
      })
  })
}
