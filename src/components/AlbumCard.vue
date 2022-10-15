<script setup lang="ts">
import { Icon } from '@iconify/vue'
const props = defineProps<{
  data: Album
}>()
const singer = computed(() => {
  return props.data.singers.reduce((pre, cur, idx) => {
    return idx === 0 ? pre + (cur.name || cur.singer_name || '').trim() : `${pre} | ${(cur.name || cur.singer_name || '').trim()}`
  }, '')
})
const albumImageUrl = computed(() => {
  return `https://y.qq.com/music/photo_new/T002R300x300M000${props.data.mid || props.data.album_mid}.jpg?max_age=2592000`
})
</script>

<template>
  <div w-40>
    <div
      :style="{ backgroundImage: `url('${albumImageUrl}')` }"
      w-40 h-40 rounded-2
      relative
      bg-cover bg-center bg-norepact
      hover="-translate-y-10px" duration-300
    >
      <div
        absolute z-1 w-full h-full
        flex items-center justify-center
        duration-300 bg-gray-700 bg-opacity-50
        opacity-0 hover="opacity-100 cursor-pointer"
      >
        <span duration-300 text-white hover="text-emerald-500">
          <Icon icon="ph:play-fill" width="2rem" />
        </span>
      </div>
    </div>
    <div px-1 mt-1>
      <h5 text-sm mb-2 line-clamp-1 mb-0>
        {{ data.name || data.album_name }}
      </h5>
      <span line-clamp-1 text-sm pr-4>{{ singer }}</span>
    </div>
  </div>
</template>

