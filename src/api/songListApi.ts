import ai from './'

/**
 * 获取推荐歌单
 * @returns
 */
export function getRecommendSongList(): Return {
  const url = '/api/recommend/playlist/u'
  return new Promise((resolve) => {
    ai.get(url)
      .then((res) => {
        resolve([res.errMsg, res.data])
      })
  })
}
/**
 *
 * @param id 歌单id
 * @returns
 */
export function getSongList(id: string | number): Return {
  const url = '/api/songlist'
  return new Promise((resolve) => {
    ai.get(url, { params: { id } })
      .then((res) => {
        resolve([res.errMsg, res.data])
      })
  })
}
/**
 * 获取日推歌曲
 * @returns
 */
export function getRecommendDaily(): Return {
  const url = '/api/recommend/daily'
  return new Promise((resolve) => {
    ai.get(url)
      .then((res) => {
        resolve([res.errMsg, res.data])
      })
  })
}
