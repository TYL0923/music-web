<script setup lang="ts">
import { getSingerInfo } from '../api/singerApi'
const route = useRoute()
const singermid = ref<string>(route.query.mid as string)
const singer = ref()
watch(
  () => route.query.mid,
  (newMid) => {
    singermid.value = newMid as string
  },
)
const tabKey = ref<string>('song')
const tabs: Array<Record<string, string> & { key: 'song' | 'album' | 'mv' }> = [
  {
    label: '歌曲',
    key: 'song',
  },
  {
    label: '专辑',
    key: 'album',
  },
  {
    label: '视频',
    key: 'mv',
  },
]
const isLoading = ref<{
  info: boolean
  song: boolean
  album: boolean
  mv: boolean
}>({
  info: false,
  song: false,
  album: false,
  mv: false,
})
const singerSongs = ref<{
  num: number
  total: number
  list: Song[]
}>()
const singerAlbum = ref<{
  pageNo: number
  pageSize: number
  total: number
  list: Album[]
}>()
const singerMv = ref<{
  pageNo: number
  pageSize: number
  total: number
  list: Mv[]
}>()
const singerInfo = computed(() => {
  if (!singer.value)
    return ''
  return (singer.value.basic.item as Array<Record<string, string>>).slice(0, 6).reduce((pre, cur) => {
    return `${pre}${cur.key}: ${cur.value}    `
  }, '')
})
const totalNumber = computed(() => {
  return (key: 'song' | 'album' | 'mv') => {
    return {
      song: (singerSongs.value?.total || 0).toString(),
      album: (singerAlbum.value?.total || 0).toString(),
      mv: (singerMv.value?.total || 0).toString(),
    }[key]
  }
})
function handleTabChange(activekey: any) {
  switch (activekey) {
    case 'song':
      initSingerSongs()
      break
    case 'album':
      initSingerAlbum()
      break
    case 'mv':
      initSingerMv()
      break
    default:
      break
  }
}
async function initSingerInfo() {
  isLoading.value.info = true
  const [err, data] = await getSingerInfo(singermid.value)
  if (!err && data)
    singer.value = data
  isLoading.value.info = false
}
async function initSingerSongs() {
  isLoading.value.song = true
  const [err, data] = await getSingerSong(singermid.value)
  // console.log(data)
  if (!err && data)
    singerSongs.value = data
  isLoading.value.song = false
}
async function initSingerAlbum() {
  isLoading.value.album = true
  const [err, data] = await getSingerAlbum(singermid.value)
  // console.log(data)
  if (!err && data)
    singerAlbum.value = data
  isLoading.value.album = false
}
async function initSingerMv() {
  isLoading.value.mv = true
  const [err, data] = await getSingerMv(singermid.value)
  // console.log(data)
  if (!err && data)
    singerMv.value = data
  isLoading.value.mv = false
}
watchEffect(initSingerInfo)
watchEffect(initSingerSongs)
watchEffect(initSingerAlbum)
watchEffect(initSingerMv)
</script>

<template>
  <div>
    <Skeleton v-if="isLoading.info" type="singerInfo" />
    <div v-else flex items-center>
      <img
        mx-6
        w-50 h-50 rounded-full
        bg-center bg-cover
        :src="`https://y.qq.com/music/photo_new/T001R300x300M000${singermid || ''}.jpg?max_age=2592000`"
      >
      <div py-4 flex-1>
        <h1>{{ singer?.singername || '' }}</h1>
        <p
          text-base
          line-clamp-1
        >
          <span>{{ singerInfo }}</span>
        </p>
      </div>
    </div>
    <div mt-4>
      <a-tabs v-model:activeKey="tabKey" @change="handleTabChange">
        <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="`${tab.label} ${totalNumber(tab.key)}`">
          <template v-if="tab.key === 'song'">
            <template v-if="isLoading.song">
              <Skeleton v-for="i in 6" :key="i" type="list" />
            </template>
            <div v-else>
              <SongListItem
                v-for="song in singerSongs?.list || []" :key="song.songmid" :data="song"
                :more-menu-omit="['remove']"
              />
            </div>
          </template>
          <template v-if="tab.key === 'album'">
            <div style="display: grid;grid-template-columns: repeat(5,1fr);" gap-6>
              <template v-if="isLoading.album">
                <Skeleton v-for="i in 10" :key="i" type="albumCard" />
              </template>
              <template v-else>
                <AlbumCard v-for="album in singerAlbum?.list || []" :key="album.album_mid" :data="album" />
              </template>
            </div>
          </template>
          <template v-if="tab.key === 'mv'">
            <div style="display: grid;grid-template-columns: repeat(5,1fr);" gap-6>
              <template v-if="isLoading.mv">
                <Skeleton v-for="i in 10" :key="i" type="mvCard" />
              </template>
              <template v-else>
                <MvCard v-for="mv in singerMv?.list || []" :key="mv.vid" :data="mv" />
              </template>
            </div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div h-20 />
  </div>
</template>
