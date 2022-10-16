import { useStorage } from '@vueuse/core'
import { message } from 'ant-design-vue'
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
    if (playList && playList.length !== 0)
      this._playList.value = playList
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
    return this._playList.value.findIndex(songItem => songItem.songmid === this._playSate.value.playSong?.songmid)
  }

  /**
   * 播放歌单, 默认播放第一首
   * @param playList 歌单列表
   */
  playAll(playList: Song[]) {
    if (playList && playList.length !== 0)
      this._playList.value = playList
    this._playSate.value.playSong = playList[0]
  }

  /**
   * 添加下一首播放
   * @param song
   */
  addNextPlaySong(song: Song) {
    if (this.playSong.songmid === song.songmid)
      return
    if (this.isExist(song))
      this.removeSong(song)
    const curPlayIdx = this.playList.findIndex(songItem => songItem.songmid === this.playSong.songmid)
    // console.log(curPlayIdx)
    // console.log(this.mayLenght(curPlayIdx + 2))
    const beforList = this.playList.slice(0, curPlayIdx + 1)
    const curList = [song]
    const afterList = this.playList.slice(this.mayLenght(curPlayIdx + 1))
    this.playList = ([] as Song[]).concat(beforList).concat(curList).concat(afterList)
  }

  /**
   * 播放下一首
   */
  playNextSong() {
    let nextSong: Song | undefined
    if (this.playMode === 'order' || this.playMode === 'cycle')
      nextSong = this.playList.at((this.playSongIdx + 1) % this.playListLength)
    else nextSong = this.playList.at(random(0, this.playListLength))
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
    if (this.playSong.songmid === song.songmid) { this._playSate.value.isPause = false }
    else {
      this.playSong = song
      this.isPause = false
    }
  }

  /**
   * 添加歌曲到播放列表最前面
   * @param song
   */
  addPlaySong(song: Song): boolean {
    if (this.isExist(song))
      return false
    this.playList.unshift(song)
    return true
  }

  // 恢复状态
  async restore() {
    if (this.playSong) {
      const url = await getUrl(this.playSong.songmid!)
      if (url) {
        this.audio.value.src = url
        this.audio.value.currentTime = this.playState.value.playTime
        this.isPause = true
      }
      else {
        this.playNextSong()
      }
    }
  }

  /**
   * 移除播放歌曲
   * @param song
   */
  removeSong(song: Song) {
    this.playList = this.playList.filter(songItem => songItem.songmid !== song.songmid)
  }

  /**
   * 比较len与歌单长度之间的值
   * @param len
   * @returns len > this.playList.length ? this.playList.length : len
   */
  private mayLenght(len: number) {
    return len > this.playList.length ? this.playList.length : len
  }

  /**
   * 检查歌曲是否在歌单
   * @param song
   * @returns
   */
  private isExist(song: Song): Song | undefined {
    return this.playList.find(songItem => songItem.songmid === song.songmid)
  }
}
// 全局hooks属性
let playInstance: Player | null = null
const playListDrawerVisible = ref<boolean>(false)

async function getUrl(songmid: string) {
  const [err, data] = await getSongPlayUrl(songmid)
  let url = ''
  if (!err && data && Object.keys(data).length > 0) { url = Object.entries(data)[0][1] as string }
  else {
    message.error({
      content: '请求播放链接失败，请检查是否登录',
    })
  }
  return url
}

function handleDurationchange() {
  playInstance!.playState.value.totalTime = playInstance!.audio.value.duration
}
function handleTimeupdate() {
  playInstance!.playState.value.playTime = playInstance!.audio.value.currentTime
}
function handleEnded() {
  playInstance!.playNextSong()
}

function watchPlaySongChange() {
  if (playInstance) {
    watch(
      () => playInstance!.playSong,
      async (song) => {
        const url = await getUrl(song.songmid!)
        if (url) {
          playInstance!.audio.value.autoplay = true
          playInstance!.audio.value.src = url
        }
        else {
          // 需要vip
          playInstance!.playNextSong()
        }
      },
    )
  }
}
function watchAudioIsPause() {
  if (playInstance) {
    watch(
      () => playInstance!.isPause,
      (value) => {
        value ? playInstance!.audio.value.pause() : playInstance!.audio.value.play()
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
function watchIsLoop() {
  if (playInstance) {
    watch(
      () => playInstance!.playMode,
      (value) => {
        if (value === 'cycle')
          playInstance!.audio.value.loop = true
        else playInstance!.audio.value.loop = false
      },
      {
        immediate: true,
      },
    )
  }
}
function createAudio(): Ref<HTMLAudioElement> {
  const audio = ref(document.createElement('audio'))
  return audio
}
export function usePlayer() {
  if (!playInstance) {
    playInstance = new Player(createAudio())
    watchPlaySongChange()
    watchProgress()
    watchAudioIsPause()
    watchIsLoop()
    playInstance.audio.value.addEventListener('durationchange', handleDurationchange)
    playInstance.audio.value.addEventListener('timeupdate', handleTimeupdate)
    playInstance.audio.value.addEventListener('ended', handleEnded)
  }
  return {
    player: playInstance,
    playListDrawerVisible,
  }
}
