<script setup lang="ts">
import { Icon } from '@iconify/vue'
import useDiffClick from '../composables/useDiffClick'
const props = defineProps<{
  data: Song
}>()
const emits = defineEmits<{
  (e: 'playList'): void
}>()
const { player } = usePlayer()
const singer = computed(() => {
  return props.data.singer.reduce((pre, cur, idx) => {
    return idx === 0 ? `${pre}${cur.title?.trim() || cur.name.trim()}` : `${pre} | ${cur.title?.trim() || cur.name.trim()}`
  }, '')
})
const isplay = computed(() => {
  return props.data.songmid === player.playSong.songmid
})
function handleClick() {
  player.togglePlaySong(props.data)
}
function handleDoubleClick() {
  // todo 双击事件
}
const { handleClickFn, handleDoubleClickFn } = useDiffClick(handleClick, handleDoubleClick)
</script>

<template>
  <div
    class="container"
    h-13 duration-300 px-2 rounded-1
    flex items-center
    text-gray-900 hover="bg-gray-100 cursor-pointer"
  >
    <div style="width: 40%" flex items-center justify-between relative :class="isplay ? 'text-emerald-500' : 'text-gray-900'">
      <div flex items-center>
        <div min-w-20px leading-1 text-gray-500>
          <Icon icon="ph:heart" mr-1 text-xl />
        </div>
        <span line-clamp-1>{{ data.songname || '' }}</span>
      </div>
      <div class="operation" flex items-center text-xl text-gray-500 gap-x-3 px-4>
        <Icon
          v-if="!isplay || player.isPause" icon="ph:play" hover="cursor-pointer"
          @click="handleClickFn" @dblclick="handleDoubleClickFn"
        />
        <Icon v-else icon="ph:pause" hover="cursor-pointer" @click="player.isPause = true" />
        <Icon icon="ph:chat-centered-dots" />
        <Icon icon="ph:dots-three-circle" />
      </div>
    </div>
    <div style="width: 30%" line-clamp-1 :class="isplay ? 'text-emerald-500' : 'text-gray-900'">
      {{ singer }}
    </div>
    <div style="width: 30%" line-clamp-1 :class="isplay ? 'text-emerald-500' : 'text-gray-900'">
      {{ data.albumname }}
    </div>
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
    }
  }
</style>
