<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import type { SelectInfo } from 'ant-design-vue/es/menu/src/interface'
const props = defineProps<{
  userDetail: UserDetail | undefined
}>()
const router = useRouter()
const navList = [
  {
    label: '在线音乐',
    key: 'online-music',
    childrens: [
      {
        label: '推荐',
        key: 'recommend',
      },
      {
        label: '视频',
        key: 'video',
      },
      {
        label: '电台',
        key: 'radio',
      },
    ],
  },
  {
    label: '我的音乐',
    key: 'my-music',
    childrens: [
      {
        label: '我喜欢',
        key: 'love',
      },
      {
        label: '已购音乐',
        key: 'buy',
      },
      {
        label: '最近播放',
        key: 'lately',
      },
      {
        label: '试听列表',
        key: 'audition',
      },

    ],
  },
]
const navState = useStorage('nav', { selectedKeys: [] })
function handleSelected(item: SelectInfo) {
  const { key } = item
  if (key === 'love') {
    router.push({
      path: '/songlist',
      query: {
        id: props.userDetail!.mymusic.find(songlist => songlist.title === '我喜欢')?.id || '',
      },
    })
  }
}
</script>

<template>
  <a-menu
    v-model:selected-keys="navState.selectedKeys"
    mode="inline"
    @select="handleSelected"
  >
    <a-menu-item-group v-for="group in navList" :key="group.key">
      <template #title>
        <span text-13px>{{ group.label }}</span>
      </template>
      <a-menu-item v-for="item in group.childrens" :key="item.key">
        <span text-14px font-bold> {{ item.label }} </span>
      </a-menu-item>
    </a-menu-item-group>
    <a-sub-menu key="my-song-list">
      <template #title>
        <span text-14px>我的歌单</span>
      </template>
      <a-menu-item key="9">
        Option 9
      </a-menu-item>
      <a-menu-item key="10">
        Option 10
      </a-menu-item>
      <a-menu-item key="11">
        Option 11
      </a-menu-item>
      <a-menu-item key="12">
        Option 12
      </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="collect-song-list">
      <template #title>
        <span text-14px>收藏歌单</span>
      </template>
      <a-menu-item key="9">
        Option 9
      </a-menu-item>
      <a-menu-item key="10">
        Option 10
      </a-menu-item>
      <a-menu-item key="11">
        Option 11
      </a-menu-item>
      <a-menu-item key="12">
        Option 12
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
