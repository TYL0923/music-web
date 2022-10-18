<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { popoverProps } from 'ant-design-vue/lib/popover'
import router from '../router'
const props = withDefaults(defineProps<{
  isTranslate?: boolean
  isShowListenNum?: boolean
  isShowTitle?: boolean
  data: SongList
}>(), {
  isTranslate: true,
  isShowListenNum: true,
  isShowTitle: true,
})
const emits = defineEmits<{
  (e: 'play', id: number | undefined): void
}>()
const num = computed(() => {
  const y = props.data.listen_num! / 100000000
  const w = props.data.listen_num! / 10000
  return y >= 1 ? `${y.toFixed(0)} 亿` : `${w.toFixed(0)} 万`
})
function handleGotoSongList() {
  if (props.data.content_id) {
    router.push({
      path: 'songlist',
      query: {
        id: props.data.content_id,
      },
    })
  }
}
</script>

<template>
  <div w-50>
    <div
      bg-gray-300
      :style="{ backgroundImage: `url(${data?.cover || ''})` }"
      duration-300
      :hover="isTranslate ? '-translate-y-10px cursor-pointer' : 'cursor-pointer' "
      inline-block relative
      bg-center bg-no-repeat bg-cover
      w-50 h-50 rounded-2
    >
      <span
        v-if="isShowListenNum"
        absolute z-1 bottom-2 right-2 inline-block
        px-2 py-2px rounded-full bg-gray-700
        flex items-center justify-center
        text-xs text-white
      >
        <Icon icon="ph:play" />
        <span ml-1>{{ num }}</span>
      </span>
      <div
        duration-300
        absolute z-1
        w-full h-full rounded-2
        bg-gray-500 opacity-0
        hover="opacity-100 bg-opacity-50"
        flex items-center justify-center
      >
        <span duration-300 text-white hover="text-emerald-500" @click="handleGotoSongList">
          <Icon icon="ph:play-fill" width="3rem" />
        </span>
      </div>
    </div>
    <p v-if="isShowTitle" pb-0 text-sm>
      {{ data?.title }}
    </p>
  </div>
</template>

<style scoped lang="less">
</style>

