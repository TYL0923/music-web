<script setup lang="ts">
import { Icon } from '@iconify/vue'

const recommendSongList = ref<SongList[]>([])
const recommendRadio = ref()
const recommendDaily = ref()

// 推荐歌单
async function initRecommendSongList() {
  const [err, res] = await getRecommendSongList()
  if (!err && res)
    recommendSongList.value = res.data.list.slice(0, 10)
}
// 个性电台
async function initRecommendRadio() {
  const [err, res] = await getRadio()
  if (!err && res)
    recommendSongList.value = res.data.tracks
}
// 个性电台
async function initRecommendDaily() {
  const [err, res] = await getRecommendDaily()
  if (!err && res)
    recommendDaily.value = res.data
}

initRecommendSongList()
initRecommendDaily()
// initRecommendRadio()
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
        <SongListCard v-for="songList in recommendSongList" :key="songList.id" :data="songList" />
      </div>
    </div>
    <div h-1200px />
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
