import ai from './'

/**
 * 获取推荐新专辑
 * @returns
 */
export function getNewAlbums(type = '1', num = 10): Return {
  const url = '/api/new/album'
  return new Promise((resolve) => {
    setTimeout(() => {
      ai.get(url, { params: { type, num } })
        .then((res) => {
          resolve([res.errMsg, res.data])
        })
    }, 350)
  })
}
/**
 * 获取专辑信息
 * @returns
 */
export function getAlbumInfo(albummid: string): Return {
  const url = '/api/album'
  return new Promise((resolve) => {
    setTimeout(() => {
      ai.get(url, { params: { albummid } })
        .then((res) => {
          resolve([res.errMsg, res.data])
        })
    }, 350)
  })
}
/**
 * 获取专辑歌曲
 * @returns
 */
export function getAlbumSongs(albummid: string): Return {
  const url = '/api/album/songs'
  return new Promise((resolve) => {
    setTimeout(() => {
      ai.get(url, { params: { albummid } })
        .then((res) => {
          resolve([res.errMsg, res.data])
        })
    }, 350)
  })
}
