<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { message } from 'ant-design-vue'
const props = defineProps<{
  data: Song
}>()
const emits = defineEmits<{
  (e: 'playList'): void
  (e: 'removeSong', id: string): void
  (e: 'addSong', mid: string, dirid: string): void
}>()
const { player } = usePlayer()
const { songList } = useLogin()
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
const addOption = computed(() => {
  return [
    {
      label: '播放列表',
      dirid: '-1',
    },
  ]
    .concat(songList.value.find(item => item.label === '我喜欢') as any)
    .concat([
      {
        label: '',
        dirid: '-',
      },
    ])
    .concat(songList.value.filter(item => item.label !== '我喜欢') as any)
})
function handleAddSong(dirid: string) {
  if (dirid === '-1') {
    const addRes = player.addPlaySong(props.data)
    if (addRes) {
      message.success({
        key: 'addRes',
        content: '已添加',
        duration: 1,
      })
    }
    else {
      message.info({
        key: 'addRes',
        content: '歌曲已存在',
        duration: 1,
      })
    }
  }
  else {
    emits('addSong', props.data.songmid!, dirid)
  }
}
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
        <span line-clamp-1>{{ data.songname || data.title || '' }}</span>
      </div>
      <div class="operation" flex items-center text-xl text-gray-500 gap-x-3 px-4>
        <Icon
          v-if="!isplay || player.isPause" icon="ph:play" hover="cursor-pointer"
          @click="handleClickFn" @dblclick="handleDoubleClickFn"
        />
        <Icon v-else icon="ph:pause" hover="cursor-pointer" @click="player.isPause = true" />
        <a-dropdown :trigger="['click']">
          <Icon icon="ph:plus-circle" />
          <template #overlay>
            <a-menu style="width: 180px">
              <template v-for="item in addOption">
                <a-menu-item
                  v-if="item.dirid !== '-'" :key="item.dirid"
                  @click="handleAddSong(item.dirid)"
                >
                  <span text-sm text-gray-900>{{ item.label }}</span>
                </a-menu-item>
                <a-menu-divider v-else :key="`${item.dirid}-`" />
              </template>
            </a-menu>
          </template>
        </a-dropdown>

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
      <Singer :data="data.singer" />
    </div>
    <div style="width: 30%" line-clamp-1 :class="isplay ? 'text-emerald-500' : 'text-gray-900'">
      {{ data.albumname || data.album?.name || '' }}
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
