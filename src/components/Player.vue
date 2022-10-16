<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { usePlayer } from '../composables/usePlayer'
const { player, playListDrawerVisible } = usePlayer()
const singer = computed(() => {
  return player.playSong.singer.reduce((pre, cur, idx) => {
    return idx === 0 ? `${pre}${(cur.title || cur.name || '').trim()}` : `${pre} | ${(cur.title || cur.name || '').trim()}`
  }, '')
})
const nameAndSinger = computed(() => {
  return `${player.playSong.songname} - ${singer.value}`
})
const songImg = computed(() => {
  return `https://y.qq.com/music/photo_new/T002R300x300M000${player.playSong.albummid}_1.jpg?max_age=2592000`
})
const progress = computed(() => {
  return player.playState.value.progress
})
function transfromTime(s: number | string) {
  if (typeof s === 'string')
    s = Number(s)
  // const h = parseInt(`${s / 3600}`).toString()
  const minute = parseInt(`${s / 60 % 60}`).toString()
  const second = Math.ceil(s % 60).toString()
  return `${minute.padStart(2, '0')}:${second.padStart(2, '0')}`
}
const playModeOptions = ['']
const time = computed(() => {
  return (originTime: number) => transfromTime(originTime)
})
</script>

<template>
  <div
    absolute bottom-0 left-0 z-100
    w-full h-16 px-10
    bg-white border-t-2px border-gray-100
    flex items-center
  >
    <div absolute class="-top-2px" :style="{ width: `${progress}%` }" left-0 h-2px bg-emerald-500 />
    <div w-100 flex items-center>
      <div
        :style="{ backgroundImage: `url('${songImg}')` }"
        w-10 h-10 rounded-1
        bg-cover bg-center bg-norepect
      />
      <div flex-1 ml-2>
        <p text-sm mb-1 line-clamp-1>
          {{ nameAndSinger }}
        </p>
        <span flex items-center text-lg gap-x-2>
          <Icon icon="ph:heart" />
          <Icon icon="ph:arrow-fat-down" />
          <Icon icon="ph:dots-three-circle" />
          <Icon icon="ph:chat-centered-dots" />
        </span>
      </div>
    </div>
    <div flex-1 text-xl px-10 flex items-center gap-x-6 text-gray-900>
      <a-select v-model:value="player.playMode" :bordered="false" :show-arrow="false">
        <a-select-option value="order">
          <span>循环</span>
        </a-select-option>
        <a-select-option value="random">
          <span>随机</span>
        </a-select-option>
        <a-select-option value="cycle">
          <span>单曲</span>
        </a-select-option>
      </a-select>
      <!-- <Icon icon="ph:arrows-counter-clockwise-light" text-xl />
      <Icon icon="ph:arrow-clockwise" text-xl /> -->
      <Icon icon="ph:caret-left-fill" text-3xl hover="cursor-pointer" />
      <div w-10 h-10 rounded-full text-white text-xl bg-emerald-500 flex items-center justify-center hover="cursor-pointer">
        <Icon v-if="player.isPause" icon="ph:play-fill" @click="player.isPause = false" />
        <Icon v-else icon="ph:pause-fill" @click="player.isPause = true" />
      </div>
      <Icon icon="ph:caret-right-fill" text-3xl hover="cursor-pointer" @click="player.playNextSong()" />
      <div w-30 flex items-center>
        <Icon icon="ph:speaker-high" mr-2 text-xl />
        <a-progress :percent="100" size="small" stroke-color="#10b981" :show-info="false" />
      </div>
    </div>
    <div w-50 text-right>
      <span>
        {{ time(player.playState.value.playTime) }} / {{ time(player.playState.value.totalTime) }}
      </span>
      <span ml-2 text-xl @click="playListDrawerVisible = !playListDrawerVisible">
        <Icon icon="ph:list" hover="cursor-pointer" />
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
