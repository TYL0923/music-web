<script setup lang="ts">
import { Icon } from '@iconify/vue'
const props = defineProps<{
  data: Song
}>()
const { player } = usePlayer()
const singer = computed(() => {
  return props.data.singer.reduce((pre, cur, idx) => {
    return idx === 0 ? `${pre}${(cur.title || cur.name || '').trim()}` : `${pre} | ${(cur.title || cur.name || '').trim()}`
  }, '')
})
const isplay = computed(() => {
  return props.data.songmid === player.playSong.songmid
})
// const isPause = computed(() => {
//   return player.audio.value.paused
// })
function transfromTime(s: number | string) {
  if (typeof s === 'string')
    s = Number(s)
  // const h = parseInt(`${s / 3600}`).toString()
  const minute = parseInt(`${s / 60 % 60}`).toString()
  const second = Math.ceil(s % 60).toString()
  return `${minute.padStart(2, '0')}:${second.padStart(2, '0')}`
}
const time = computed(() => {
  return transfromTime(props.data.interval)
})
</script>

<template>
  <div
    class="container" hover="bg-gray-100"
    relative
    h-20 px-6 py-2 duration-300
    flex itmes-center justify-between
    :class="isplay ? 'text-emerald-500' : ''"
  >
    <div
      absolute class="operation w-30 h-full top-0 right-0"
      text-2xl
      gap-x-2 pr-6 text-gray-500
      flex items-center
    >
      <Icon v-if="!isplay || player.isPause" icon="ph:play" hover="cursor-pointer" @click="player.togglePlaySong(data)" />
      <Icon v-else icon="ph:pause" hover="cursor-pointer" @click="player.isPause = true" />
      <Icon icon="ph:heart" hover="cursor-pointer" />
      <Icon icon="ph:dots-three-circle" hover="cursor-pointer" />
    </div>
    <span flex-1 pt-2>
      <p mb-0 text-base line-clamp-1>
        {{ data.songname || '' }}
      </p>
      <p mb-0 text-sm line-clamp-1>
        {{ singer }}
      </p>
    </span>
    <span w-30 flex items-center justify-end>
      <div class="time" text-gray-400 text-sm>{{ time }}</div>
    </span>
  </div>
</template>

<style scoped lang="less">
  .container {
    .operation {
      display: none;
    }
    &:hover {
      .operation {
        display: flex;
      }
      .time {
        display: none;
      }
    }
  }
</style>
