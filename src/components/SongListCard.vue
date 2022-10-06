<script setup lang="ts">
import { Icon } from '@iconify/vue'
const props = withDefaults(defineProps<{
  width?: number
  height?: number
  isTranslate?: boolean
  isShowListenNum?: boolean
  isShowTitle?: boolean
  data?: SongList
}>(), {
  width: 50,
  height: 50,
  isTranslate: true,
  isShowListenNum: true,
  isShowTitle: true,
})
// const bgUrl = computed(() => {
//   return `url('${props.data?.cover}')`
// })
const dynamicstyle = computed(() => {
  return `w-${props.width} h-${props.height}`
})
</script>

<template>
  <div>
    <div
      bg-gray-300
      :style="{ backgroundImage: `url(${data?.cover || ''})` }"
      duration-300
      :hover="isTranslate ? '-translate-y-10px cursor-pointer' : 'cursor-pointer' "
      inline-block relative
      bg-center bg-no-repeat bg-cover
      :class="dynamicstyle"
      rounded-2
    >
      <span
        v-if="isShowListenNum"
        absolute z-1 bottom-2 right-2 inline-block
        px-2 py-2px rounded-full bg-gray-700
        flex items-center justify-center
        text-xs text-white
      >
        <Icon icon="ph:headset" />
        <span>2.8万</span>
      </span>
      <div
        duration-300
        absolute z-1
        w-full h-full rounded-2
        bg-gray-500 opacity-0
        hover="opacity-50 opacity-100 bg-opacity-50"
        flex items-center justify-center
      >
        <span duration-300 text-white hover="text-emerald-500">
          <Icon icon="ph:play-fill" :width="`${width}px`" />
        </span>
      </div>
    </div>
    <p v-if="isShowTitle" pb-0 text-sm>
      {{ data?.title }}
    </p>
  </div>
</template>

<style scoped lang="less">
  // .container {
  //   background-image: v-bind(bgUrl);
  // }
</style>

