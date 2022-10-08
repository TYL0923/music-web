import ai from './'

/**
 * 获取播放链接
 * @returns
 */
export function getSongPlayUrl(id: string): Return {
  const url = '/api/song/urls'
  return new Promise((resolve) => {
    ai.get(url, { params: { id } })
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, null])
      })
  })
}
/**
 * 获取推荐歌单
 * @returns
 */
export function getNewSongs(type = '0'): Return {
  const url = '/api/new/songs'
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
