import { useStorage } from '@vueuse/core'

import type { Ref } from 'vue'
interface PlayState {
  playMode: 'order' | 'random' | 'cycle'
  playSong: Song | null
  playVolume: number
}
const playList = useStorage('play-list', [])
const playSate: Ref<PlayState> = ref(useStorage('play-state', {
  playMode: 'order',
  playSong: null,
  playVolume: 100,
}))

function random(min: number, max: number) {
  return Number((Math.random() * (max - min) + min).toFixed(0))
}
class Player {
  private _playList: Ref<Song[]>
  private _playSate: Ref<PlayState>
  constructor() {
    this._playList = ref(playList)
    this._playSate = ref(playSate)
  }

  set playSong(song: Song) {
    this._playSate.value.playSong = reactive(song)
  }

  get playSong() {
    return this._playSate.value.playSong!
  }

  get playList() {
    return this._playList.value
  }

  set playList(playList: Song[]) {
    if (playList && playList.length !== 0) {
      this._playList.value = playList
      this.playSong = playList[0]
    }
  }

  get playListLength() {
    return this._playList.value.length
  }

  set playMode(mode: 'order' | 'random' | 'cycle') {
    this._playSate.value.playMode = mode
  }

  get playMode() {
    return this._playSate.value.playMode
  }

  get playSongIdx() {
    return this._playList.value.findIndex(songItem => songItem.mid === this._playSate.value.playSong?.mid)
  }

  /**
   * 添加下一首播放
   * @param song
   */
  addNextPlaySong(song: Song) {
    let curPlayIdx = this.playList.findIndex(songItem => songItem.mid === this.playSong.mid)
    if (this.isExist(song))
      this.removeSong(song)
    if (curPlayIdx === -1)
      curPlayIdx = 0
    this.playList
      = this.playList.slice(0, curPlayIdx + 1)
        .concat(song)
        .concat(this.playList.slice(this.mayLenght(curPlayIdx + 2)))
  }

  playNextSong() {
    let nextSong: Song | undefined
    if (this.playMode === 'order')
      nextSong = this.playList.at((this.playSongIdx + 1) % this.playListLength)
    else
      nextSong = this.playList.at(random(0, this.playListLength)) // todo 排除当前播放
    this.togglePlaySong(nextSong)
  }

  /**
   * 切换播放歌曲
   * @param song 播放歌曲
   */
  togglePlaySong(song: Song | undefined | null) {
    if (!song)
      return
    if (!this.isExist(song))
      this.addPlaySong(song)
    this.playSong = song
  }

  mayLenght(len: number) {
    return len > this.playList.length ? this.playList.length : len
  }

  /**
   * 添加歌曲到播放列表最前面
   * @param song
   */
  addPlaySong(song: Song) {
    if (!this.isExist(song))
      this.playList.unshift(song)
  }

  /**
   * 移除播放歌曲
   * @param song
   */
  removeSong(song: Song) {
    if (this.isExist(song))
      this.playList = this.playList.filter(songItem => songItem.mid === song.mid)
  }

  isExist(song: Song): Song | undefined {
    return this.playList.find(songItem => songItem.mid === song.mid)
  }
}
let playInstance: Player | null = null
export function usePlayer() {
  if (!playInstance)
    playInstance = new Player()
  return {
    player: playInstance,
  }
}
