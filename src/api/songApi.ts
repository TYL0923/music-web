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
        resolve([res.errMsg, res.data])
      })
  })
}
/**
 * 获取推荐歌曲
 * @returns
 */
export function getNewSongs(type = '0'): Return {
  const url = '/api/new/songs'
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
 * 获取热搜词
 * @returns
 */
export function getHot(): Return {
  const url = '/api/search/hot'
  return new Promise((resolve) => {
    setTimeout(() => {
      ai.get(url)
        .then((res) => {
          resolve([res.errMsg, res])
        })
    }, 0)
  })
}
/**
 * 获取搜索推荐
 * @returns
 */
export function getSearchRecommend(keyWord: string): Return {
  const url = '/api/search/quick'
  return new Promise((resolve) => {
    setTimeout(() => {
      ai.get(url, { params: { key: keyWord } })
        .then((res) => {
          resolve([res.errMsg, res.data])
        })
    }, 0)
  })
}
