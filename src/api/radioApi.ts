import ai from './'

/**
 * 获取电台分类
 * @returns
 */
export function getRadioCate(): Return {
  const url = '/api/radio/category'
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
 * 随机获取电台5首歌曲
 * @param id 电台id
 * @returns
 */
export function getRadio(id = 99): Return {
  const url = '/api/radio'
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
