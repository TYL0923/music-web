<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSongImageUrl } from '../composables/useSongImageUrl'
const props = defineProps<{
  data: Song
}>()
const singer = computed(() => {
  return props.data.singer.reduce((pre, cur, idx) => {
    return idx === 0 ? pre + cur.title?.trim() || cur.name.trim() : `${pre} | ${cur.title?.trim() || cur.name.trim()}`
  }, '')
})
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
  <div flex items-center max-w-100>
    <div
      :style="{ backgroundImage: `url('${useSongImageUrl(data.album?.pmid || '')}')` }"
      w-25 h-25 rounded-1
      relative
      bg-cover bg-center bg-norepact
    >
      <div
        absolute z-1 w-full h-full
        flex items-center justify-center
        duration-300
        opacity-0 hover="opacity-100 cursor-pointer"
      >
        <span duration-300 text-white hover="text-emerald-500">
          <Icon icon="ph:play-fill" width="2rem" />
        </span>
      </div>
    </div>
    <div flex-1 px-4>
      <h5 text-base mb-2>
        {{ data.title }}
      </h5>
      <div text-gray-500 flex item-center justify-between>
        <span line-clamp-2 text-base pr-4>{{ singer }}</span>
        <span>{{ time }}</span>
      </div>
    </div>
  </div>
</template>

