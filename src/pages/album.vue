<script setup lang="ts">
const route = useRoute()
const { player } = usePlayer()
const albummid = ref<string>(route.query.albummid as string)
const albumInfo = ref()
const albumSongs = ref()
const isLoading = reactive<{
  songs: boolean
  info: boolean
  comment: boolean
}>({
  songs: false,
  info: false,
  comment: false,
})
const tabKey = ref<string>('songs')
const tabs = reactive([
  {
    label: '歌曲',
    key: 'songs',
  },
  {
    label: '专辑信息',
    key: 'info',
  },
  {
    label: '评论',
    key: 'comment',
  },
])
const info = reactive<Record<string, string>>({
  albumName: '专辑',
  singer: '专辑',
  genre: '流派',
  language: '语言',
  company: '唱片公司',
  albumType: '唱片类型',
  desc: '专辑简介',
})
const infoItemVlaue = computed(() => {
  return (key: string) => {
    if (!albumInfo.value)
      return ''
    return albumInfo.value![key]
  }
})
function handleTabChange(activekey: any) {
  switch (activekey) {
    case 'songs':
      initAlbumSongs()
      break
    default:
      break
  }
}
async function initAlbumInfo() {
  isLoading.info = true
  const [err, data] = await getAlbumInfo(albummid.value)
  if (!err && data)
    albumInfo.value = data
  isLoading.info = false
}
async function initAlbumSongs() {
  isLoading.songs = true
  const [err, data] = await getAlbumSongs(albummid.value)
  if (!err && data)
    albumSongs.value = data.list
  isLoading.songs = false
}
watchEffect(initAlbumInfo)
watchEffect(initAlbumSongs)
</script>

<template>
  <div>
    <Skeleton v-if="isLoading.info" type="albumTitle" />
    <div v-else flex flex-items-center>
      <img w-50 h-50 rounded-2 mr-6 :src="albumInfo.picurl" alt="">
      <div flex-1 text-base text-gray-400 flex flex-col justify-center py-2>
        <h1>{{ albumInfo.name || albumInfo.title || '' }}</h1>
        <div text-gray-900>
          <p><Singer :data="albumInfo.ar || []" /></p>
          <p>
            <span mr-4>{{ albumInfo.publishTime }}</span>
            <span>{{ albumInfo.genre }}</span>
          </p>
        </div>
        <div flex itema-center gap-x-4>
          <a-button type="primary" @click="player.playAll(albumSongs)">
            播放全部
          </a-button>
          <a-button>
            批量操作
          </a-button>
        </div>
      </div>
    </div>
    <div mt-4>
      <a-tabs v-model:activeKey="tabKey" @change="handleTabChange">
        <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.label">
          <template v-if="tab.key === 'songs'">
            <Skeleton v-if="isLoading.songs" type="list" />
            <div v-else>
              <div text-sm text-gray-500 flex px-2>
                <div style="width: 40%">
                  歌曲
                </div>
                <div style="width: 30%">
                  歌手
                </div>
                <div style="width: 30%">
                  专辑
                </div>
              </div>
              <SongListItem
                v-for="song in albumSongs" :key="song.songmid" :data="song"
                :more-menu-omit="['remove']"
              />
            </div>
          </template>
          <template v-if="tab.key === 'info'">
            <div>
              <div v-for="infoItem, index in info" :key="index" text-base flex items-start my-2>
                <span w-20 text-gray-900>{{ `${infoItem}: ` }}</span>
                <Singer v-if="index === 'singer'" :data="albumInfo?.ar || []" />
                <span v-else flex-1>{{ infoItemVlaue(index) }}</span>
              </div>
            </div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
