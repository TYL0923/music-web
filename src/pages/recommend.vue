<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { getSongList } from '../api/songListApi'
import { usePlayer } from '../composables/usePlayer'
const { player } = usePlayer()
const recommendSongList = ref<SongList[]>([])
const recommendRadio = ref()
const recommendDaily = ref()
const recommendNewSongs = ref<Song[]>([])
const recommendNewAlbums = ref<Album[]>([])
const recommendNewMvs = ref<Mv[]>([])
const songLists = computed(() => {
  return recommendSongList.value.slice(0, 10) || []
})
const newSongs = computed(() => {
  return recommendNewSongs.value.slice(0, 9) || []
})
const newAlbums = computed(() => {
  return recommendNewAlbums.value.slice(0, 10) || []
})
const newMvs = computed(() => {
  return recommendNewMvs.value.slice(0, 10) || []
})

const songTabKeyArr = {
  0: '最新',
  1: '内地',
  2: '港台',
  3: '欧美',
  4: '韩国',
  5: '日本',
}
const mvTabKeyArr = {
  0: '最新',
  1: '内地',
  2: '港台',
  3: '欧美',
  4: '韩国',
  5: '日本',
}
const albumTabKeyArr = {
  1: '内地',
  2: '港台',
  3: '欧美',
  4: '韩国',
  5: '日本',
  6: '其他',
}
const songActiveTabKey = ref('0')
const albumActiveTabKey = ref('1')
const mvActiveTabKey = ref('0')

async function handlePlaySongList(id: number | undefined) {
  if (!id)
    return
  const [err, data] = await getSongList(id)
  if (!err && data)
    player.playList = data.songlist
  // todo init playurl
}
// 推荐歌单
async function initRecommendSongList() {
  const [err, data] = await getRecommendSongList()
  if (!err && data)
    recommendSongList.value = data.list
}
// 个性电台
async function initRecommendRadio() {
  const [err, data] = await getRadio()
  if (!err && data)
    recommendRadio.value = data.tracks
}
// 每日30首
async function initRecommendDaily() {
  const [err, data] = await getRecommendDaily()
  if (!err && data)
    recommendDaily.value = data
}
// 新歌推荐
async function initNewSongs() {
  const [err, data] = await getNewSongs(songActiveTabKey.value)
  if (!err && data)
    recommendNewSongs.value = data.list
}
// 新专辑推荐
async function initNewAlbums() {
  const [err, data] = await getNewAlbums(albumActiveTabKey.value)
  if (!err && data)
    recommendNewAlbums.value = data.list
}
// 新Mv推荐
async function initNewMvs() {
  const [err, data] = await getNewMv(mvActiveTabKey.value)
  if (!err && data)
    recommendNewMvs.value = data.list
}

watchEffect(initRecommendSongList)
// watchEffect(initRecommendDaily)
// watchEffect(initRecommendRadio)
// watchEffect(initNewSongs)
// watchEffect(initNewAlbums)
// watchEffect(initNewMvs)
</script>

<template>
  <div>
    <h1>推荐</h1>
    <div mb-6>
      <h2>今日推荐</h2>
      <div class="header">
        <div
          w-90 h-40 rounded-2 p-4
          bg-slate-500 bg-opacity-50 duration="300"
          hover="-translate-y-10px cursor-pointer"
          flex="~" items-center justify-start
          text-white
        >
          <div ml-4>
            <p text-base mb-2>
              说好不哭
            </p>
            <p text-xs text-gray-200>
              周杰伦
            </p>
            <span flex text-xl class="icons">
              <Icon icon="ph:play-fill" />
              <Icon icon="ph:heart" />
              <Icon icon="ph:chat-centered-dots" />
            </span>
          </div>
        </div>
        <div>
          <div
            :style="{ backgroundImage: `url(${recommendDaily?.logo || ''})` }"
            class="daily"
            w-40 h-40
            bg-gray-300
            duration-300
            hover="-translate-y-10px cursor-pointer"
            inline-block relative
            bg-center bg-no-repeat bg-cover
            rounded-2
          >
            <div
              duration-300
              absolute z-1
              w-full h-full rounded-2
              bg-gray-500 opacity-0
              hover="opacity-50 opacity-100 bg-opacity-50"
              flex items-center justify-center
            >
              <span duration-300 text-white hover="text-emerald-500">
                <Icon icon="ph:play-fill" width="3rem" />
              </span>
            </div>
          </div>
          <p>每日30首</p>
        </div>
      </div>
    </div>
    <div mb-6>
      <h2>为你推荐</h2>
      <div class="song-list-contailer">
        <SongListCard
          v-for="songList in songLists"
          :key="songList.album_pic_mid"
          :data="songList"
          @play="handlePlaySongList(songList.content_id)"
        />
      </div>
    </div>
    <div mb-10>
      <h2 mb-0>
        新歌推荐
      </h2>
      <div>
        <a-tabs v-model:activeKey="songActiveTabKey">
          <a-tab-pane v-for="tab, key in songTabKeyArr" :key="key" :tab="tab">
            <div style="display: grid;grid-template-columns: repeat(3,1fr);" gap-6>
              <SongCard v-for="song in newSongs" :key="song.mid" :data="song" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div mb-10>
      <h2 mb-0>
        新专辑推荐
      </h2>
      <div>
        <a-tabs v-model:activeKey="albumActiveTabKey">
          <a-tab-pane v-for="tab, key in albumTabKeyArr" :key="key" :tab="tab">
            <div style="display: grid;grid-template-columns: repeat(5,1fr);" gap-6>
              <AlbumCard v-for="album in newAlbums" :key="album.mid" :data="album" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div mb-6>
      <h2 mb-0>
        新Mv推荐
      </h2>
      <div>
        <a-tabs v-model:activeKey="mvActiveTabKey">
          <a-tab-pane v-for="tab, key in mvTabKeyArr" :key="key" :tab="tab">
            <div style="display: grid;grid-template-columns: repeat(5,1fr);" gap-6>
              <MvCard v-for="mv in newMvs" :key="mv.mv_id" :data="mv" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .header {
    display: grid;
    grid-template-columns: 30rem 1fr 1fr 1fr;
    grid-gap: 1rem;
  }
  .song-list-contailer {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
  }
  .icons {
    * {
      margin-right: 15px;
    }
  }
</style>
