<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { usePlayer } from '../composables/usePlayer'
import { getSongPlayUrl } from '../api/songApi'
const { player, playListDrawerVisible } = usePlayer()
const playSong = computed(() => {
  // return player.playSong || {

  // }
})
const audioRef = ref<HTMLAudioElement | null>(null)
watch(
  () => player.playSong,
  async (song) => {
    const [err, data] = await getSongPlayUrl(song.songmid!)
    let url = ''
    if (!err && data)
      url = Object.entries(data)[0][1] as string
    audioRef.value!.src = url
  },
)
function handleGetPlayDuration(e: Event) {
}
</script>

<template>
  <div
    absolute bottom-0 left-0 z-100
    w-full h-16 px-10
    bg-white
    flex items-center
  >
    <audio
      ref="audioRef"
      :autoplay="true"
      @canplay="handleGetPlayDuration"
    />
    <div absolute top-0 left-0 w-200px h-2px bg-emerald-500 />
    <div w-100 flex items-center>
      <div
        :style="{ backgroundImage: `url('https://y.qq.com/music/photo_new/T002R300x300M000000quurA1pLBwu_1.jpg?max_age=2592000')` }"
        w-10 h-10 rounded-1
        bg-cover bg-center bg-norepect
      />
      <div flex-1 ml-2>
        <p text-sm mb-1>
          Complicated - Avril Lavigne
        </p>
        <span flex items-center text-xl>
          <Icon icon="ph:heart" />
          <Icon icon="ph:arrow-fat-down" />
          <Icon
            icon="ph:dots-three-circle"
          />
          <Icon icon="ph:chat-centered-dots" />
        </span>
      </div>
    </div>
    <div flex-1 text-2xl px-10 flex items-center gap-x-6 text-gray-900>
      <Icon icon="ph:arrows-counter-clockwise-light" />
      <Icon icon="ph:caret-left-fill" />
      <div w-10 h-10 rounded-full text-white text-xl bg-emerald-500 flex items-center justify-center>
        <Icon icon="ph:pause-fill" />
        <!-- <Icon icon="ph:play-fill" /> -->
      </div>
      <Icon icon="ph:caret-right-fill" />
      <Icon icon="ph:speaker-high" />
    </div>
    <div w-50 text-right>
      <span>
        02:02/03:03 词
      </span>
      <span @click="playListDrawerVisible = !playListDrawerVisible">
        <Icon icon="ph:list" />
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
