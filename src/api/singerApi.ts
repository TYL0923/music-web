import ai from './'

/**
 * 获取歌手信息
 * @returns
 */
export function getSingerInfo(singermid: string): Return {
  const url = '/api/singer/desc'
  return new Promise((resolve) => {
    setTimeout(() => {
      ai.get(url, { params: { singermid } })
        .then((res) => {
          resolve([res.errMsg, res.data])
        })
    }, 350)
  })
}
/**
 * 获取歌手热门歌曲
 * @returns
 */
export function getSingerSong(singermid: string): Return {
  const url = '/api/singer/songs'
  return new Promise((resolve) => {
    setTimeout(() => {
      ai.get(url, { params: { singermid } })
        .then((res) => {
          resolve([res.errMsg, res.data])
        })
    }, 350)
  })
}
/**
 * 获取歌手专辑
 * @returns
 */
export function getSingerAlbum(singermid: string): Return {
  const url = '/api/singer/album'
  return new Promise((resolve) => {
    setTimeout(() => {
      ai.get(url, { params: { singermid } })
        .then((res) => {
          resolve([res.errMsg, res.data])
        })
    }, 350)
  })
}
/**
 * 获取歌手Mv
 * @returns
 */
export function getSingerMv(singermid: string): Return {
  const url = '/api/singer/mv'
  return new Promise((resolve) => {
    setTimeout(() => {
      ai.get(url, { params: { singermid } })
        .then((res) => {
          resolve([res.errMsg, res.data])
        })
    }, 350)
  })
}

