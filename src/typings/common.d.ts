type Res = {
  result: number
  errMsg?: string
  data?: any
  message?: string
}
type Return<T = any> = Promise<[string | null | undefined, T]>
type SongTag = {
  id: number
  name: string
  pid: number
}
type SongList = {
  id?: number
  album_pic_mid: string
  content_id?: number
  dissname?: string
  disstid?: string
  cover?: string
  creator?: number
  headurl?: string
  ifpicurl?: string
  logo?: string
  desc?: string

  songids?: string
  songlist: Song[]
  title?: string
  tag?: SongTag[]
  listen_num?: number
  visitnum?: number
  songnum?: number
  total_song_num?: number
  userName?: string
  nick?: string
  nickname?: string
  uin?: string
  encryt_uin?: string
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
type SongFile = {
  'size128': number
  'size320': number
  'sizeape': number
  'sizeflac': number
}
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
  id?: number
  songid?: number
  songmid?: string
  mid: string
  name?: string
  songname?: string
  songorig?: string
  album?: Album
  albumid?: number
  albummid?: string
  albumname?: string
  interval: number
  file: SongFile
  mv?: {
    id: number
    vid: string
    name: string
    title: string
    vt: number
  }
  title?: string
  singer: Array<Singer>
}
