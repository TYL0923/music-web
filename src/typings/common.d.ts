type Return<T = Record<string, string | number | Arrar<T> | T> | null> = Promise<[string | null, T]>

type SongList = {
  id: string
  album_pic_mid: string
  albumId: string
  cover: string
  logo: string
  title: string
  listen_num: number
  userName: string
}
type Singer = {
  id: number
  mid: string
  name: string
  pmid?: string
  title?: string
  type?: number
  uin?: number
}
type SongFile = Record<string, string | number>
type Mv = {
  listennum: number
  mv_id: number
  mvtitle: string
  picurl: string
  pub_date: string
  publictime: string
  singer_id: number
  singer_mid: string
  singer_name: string
  singerid: number
  singermid: string
  singername: string
  singers: Singer[]
}
type Album = {
  id: number
  mid: string
  name: string
  pmid: string
  subtitle: string
  time_public: string
  title: string
  singers: Singer[]
}
type Song = {
  id: number
  mid: string
  album: Album
  file: SongFile
  mv: {
    id: number
    vid: string
    name: string
    title: string
    vt: number
  }
  name: string
  title: string
  singer: Array<Singer>
  interval: number
}
