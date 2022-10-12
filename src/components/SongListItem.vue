<script setup lang="ts">
import { Icon } from '@iconify/vue'
import useDiffClick from '../composables/useDiffClick'
const props = defineProps<{
  data: Song
}>()
const emits = defineEmits<{
  (e: 'playList'): void
  (e: 'removeSong', id: string): void
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
const operationOption = [
  {
    label: '播放',
    key: 'play',
    handle: () => player.togglePlaySong(props.data),
  },
  {
    label: '下一首播放',
    key: 'nextplay',
    handle: () => player.addNextPlaySong(props.data),
  },
  {
    label: '播放mv',
    key: 'playMv',
  },
  {
    label: '',
    key: '-',
  },
  {
    label: '我喜欢',
    key: 'love',
  },
  {
    label: '删除',
    key: 'remove',
    handle: () => {
      // console.log(props.data)
      if (props.data.songmid === player.playSong.songmid)
        player.playNextSong()
      player.removeSong(props.data)
      emits('removeSong', props.data.songid!.toString())
    },
  },
  {
    label: '查看评论',
    key: 'comment',
  },

]

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
        <a-dropdown :trigger="['click']">
          <Icon icon="ph:dots-three-circle" />
          <template #overlay>
            <a-menu style="width: 180px">
              <template v-for="item in operationOption">
                <a-menu-item v-if="item.key !== '-'" :key="item.key" @click="item.handle">
                  <span text-sm text-gray-900>{{ item.label }}</span>
                </a-menu-item>
                <a-menu-divider v-else :key="`${item.key}-`" />
              </template>
            </a-menu>
          </template>
        </a-dropdown>
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
