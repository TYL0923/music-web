type Return<T = Record<string, string | number | Arrar<T> | T> | null> = Promise<[string | null, T]>

type SongList = {
  id: string
  albumId: string
  cover: string
  logo: string
  title: string
  listenNum: number
  userName: string
  
}
