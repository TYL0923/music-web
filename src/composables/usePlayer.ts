import { useStorage } from '@vueuse/core'

import type { Ref } from 'vue'
interface PlayState {
  playMode: 'order' | 'random' | 'cycle'
  playSong: Song | null
  playVolume: number
  isPause: boolean
  progress: number
  playTime: number
  totalTime: number
}
const playList = useStorage('play-list', [])
const playSate: Ref<PlayState> = ref(useStorage('play-state', {
  playMode: 'order',
  playSong: null,
  playVolume: 100,
  isPause: true,
  progress: 0,
  playTime: 0,
  totalTime: 0,
}))
function random(min: number, max: number) {
  return Number((Math.random() * (max - min) + min).toFixed(0))
}
class Player {
  private _playList: Ref<Song[]>
  private _playSate: Ref<PlayState>
  private _audio: Ref<HTMLAudioElement>
  constructor(audio: Ref<HTMLAudioElement>) {
    this._playList = ref(playList)
    this._playSate = ref(playSate)
    this._audio = ref(audio)
  }

  // play set or get
  set playList(playList: Song[]) {
    if (playList && playList.length !== 0) {
      this._playList.value = playList
      this._playSate.value.playSong = playList[0]
    }
  }

  get playList() {
    return this._playList.value
  }

  // playState get
  get playState() {
    return this._playSate
  }

  // audio get
  get audio() {
    return this._audio
  }

  // playSate.playSong set or get
  set playSong(song: Song) {
    this._playSate.value.playSong = reactive(song)
  }

  get playSong() {
    return this._playSate.value.playSong!
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

  get isPause() {
    return this._playSate.value.isPause
  }

  set isPause(value: boolean) {
    this._playSate.value.isPause = value
  }

  get playSongIdx() {
    return this._playList.value.findIndex(songItem => songItem.mid === this._playSate.value.playSong?.mid)
  }

  pausePlay() {
    this.audio.value.pause()
    this.isPause = true
  }

  startPlay() {
    this.audio.value.play()
    this.isPause = false
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
    if (this.playSong.songmid === song.songmid)
      this._playSate.value.isPause = false
    else
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

  // 恢复状态
  restore() {
    if (this.playSong) {
      // todo
    }
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
// 全局hooks属性
let playInstance: Player | null = null
const playListDrawerVisible = ref<boolean>(true)

function createAudio(): Ref<HTMLAudioElement> {
  const audio = ref(document.createElement('audio'))
  audio.value.autoplay = true
  return audio
}
function handleDurationchange() {
  playInstance!.playState.value.totalTime = playInstance!.audio.value.duration
}
function handleTimeupdate() {
  playInstance!.playState.value.playTime = playInstance!.audio.value.currentTime
}
function watchPlaySongChange() {
  if (playInstance) {
    watch(
      () => playInstance!.playSong,
      async (song) => {
        const [err, data] = await getSongPlayUrl(song.songmid!)
        let url = ''
        if (!err && data)
          url = Object.entries(data)[0][1] as string
        playInstance!.audio.value.src = url
        playInstance!.isPause = false
        playInstance!.playState.value.playTime = 0
        playInstance!.playState.value.totalTime = 0
      },
    )
  }
}
function watchProgress() {
  if (playInstance) {
    watch(
      [
        () => playInstance?.playState.value.playTime,
        () => playInstance?.playState.value.totalTime,
      ],
      () => {
        const progress = playInstance!.playState.value.playTime / playInstance!.playState.value.totalTime * 100
        playInstance!.playState.value.progress = progress && !Number.isNaN(progress) ? Number(progress.toFixed(2)) : 0
      },
    )
  }
}

export function usePlayer() {
  if (!playInstance) {
    playInstance = new Player(createAudio())
    watchPlaySongChange()
    watchProgress()
    playInstance.audio.value.addEventListener('durationchange', handleDurationchange)
    playInstance.audio.value.addEventListener('timeupdate', handleTimeupdate)
  }
  return {
    player: playInstance,
    playListDrawerVisible,
  }
}
