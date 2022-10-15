<script setup lang="ts">
import { Icon } from '@iconify/vue'
const props = defineProps<{
  data: Mv
}>()
const singer = computed(() => {
  if (!props.data.singers)
    return props.data.singer_name
  return props.data.singers.reduce((pre, cur, idx) => {
    return idx === 0 ? pre + (cur.name || cur.singer_name || '').trim() : `${pre} | ${(cur.name || cur.singer_name || '').trim()}`
  }, '')
})
const num = computed(() => {
  const y = (props.data.listennum || Number(props.data.listenCount)) / 100000000
  const w = (props.data.listennum || Number(props.data.listenCount)) / 10000
  return y >= 1 ? `${y.toFixed(2)}亿` : `${w.toFixed(2)}万`
})
</script>

<template>
  <div w-50>
    <div
      :style="{ backgroundImage: `url('${data.picurl || data.pic}')` }"
      w-50 h-30 rounded-2
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
      <h5 text-sm mb-1 line-clamp-1>
        {{ data.mvtitle || data.title || '' }}
      </h5>
      <p line-clamp-1 text-sm mb-0>
        {{ singer }}
      </p>
      <span text-sm flex items-center>
        <Icon icon="ph:play" />
        <span ml-1> {{ num }} </span>
      </span>
    </div>
  </div>
</template>

