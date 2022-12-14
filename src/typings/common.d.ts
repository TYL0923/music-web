type Res = {
  result: number
  errMsg?: string
  data?: any
  message?: string
}
type Return<T = any> = Promise<[string | null | undefined, T]>

interface LoginForm {
  account: string
  password: string
  isLocal: boolean
}
interface LoginRes {
  account: string
  cookie: string
}
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
  dirid?: number
  disstid?: string | number
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
  singer_id?: number
  singer_mid?: string
  singer_name?: string

  id?: number
  mid?: string
  name?: string
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
  vid?: string
  listennum?: number
  listenCount?: string
  mv_id?: number
  mvtitle?: string
  title?: string
  picurl?: string
  pic?: string
  playcnt?: number
  pub_date?: string
  publictime?: string
  singer_id?: number
  singer_mid?: string
  singer_name?: string
  singerid?: number
  singermid?: string
  singername?: string
  singers: Singer[]
}
type Album = {
  album_mid?: string
  albummid?: string
  album_name?: string
  desc?: string
  pub_time?: string
  id?: number
  mid?: string
  name?: string
  pmid?: string
  subtitle?: string
  time_public?: string
  title?: string
  singers?: Singer[]
  singer?: Singer[]
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

type MyMusic = {
  id: string
  jumpkey: string
  jumptype: number
  jumpurl: string
  laypic: string
  music_bykey: {
    url_key: string
    url_params: string
  }
  num0: number
  num1: number
  num2: number
  picurl: string
  subtitle: string
  title: string
  type: number
}
type MyDiss = {
  jumpurl: string
  laypic: string
  list: SongList[]
  num: number
  title: string 
}
type UserDetail = {
  creator: any
  myarticle: any
  mydiss: MyDiss
  mymusic: MyMusic[]
  mymusitype: string
  myradio: any
  video: any
}