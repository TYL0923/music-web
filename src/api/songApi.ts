import ai from './'

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
