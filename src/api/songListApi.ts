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
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, null])
      })
  })
}
/**
 * 获取日推歌单
 * @returns
 */
export function getRecommendDaily(): Return {
  const url = '/api/recommend/daily'
  return new Promise((resolve) => {
    ai.get(url)
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, null])
      })
  })
}
