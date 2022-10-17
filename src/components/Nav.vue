<script setup lang="ts">
import { useStorage } from '@vueuse/core'
const props = defineProps<{
  userDetail: UserDetail | undefined
  userCreateSongList: Array<Record<string, string | number>>
  userCollectSongList: Array<Record<string, string | number>>
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
        key: 'mv',
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

    ],
  },
]
const navState = useStorage('nav', { selectedKeys: [] })
function handleGotoPage(item: { label: string; key: string }) {
  const { key } = item
  if (key === 'love') {
    router.push({
      path: '/songlist',
      query: {
        id: props.userDetail!.mymusic.find(songlist => songlist.title === '我喜欢')?.id || '',
      },
    })
  }
  else { router.push(key as string) }
}
function handleGotoSongList(id: number | string) {
  router.push({
    path: '/songlist',
    query: {
      id,
    },
  })
}
</script>

<template>
  <a-menu
    v-model:selected-keys="navState.selectedKeys"
    mode="inline"
  >
    <a-menu-item-group v-for="group in navList" :key="group.key">
      <template #title>
        <span text-13px>{{ group.label }}</span>
      </template>
      <a-menu-item v-for="item in group.childrens" :key="item.key" @click="handleGotoPage(item)">
        <span text-14px font-bold> {{ item.label }} </span>
      </a-menu-item>
    </a-menu-item-group>
    <a-sub-menu key="my-song-list">
      <template #title>
        <span text-14px>我的歌单</span>
      </template>
      <a-menu-item
        v-for="songList in userCreateSongList"
        :key="songList.tid"
        @click="handleGotoSongList(songList.tid)"
      >
        {{ songList.diss_name }}
      </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="collect-song-list">
      <template #title>
        <span text-14px>收藏歌单</span>
      </template>
      <a-menu-item
        v-for="songList in userCollectSongList"
        :key="songList.dissid"
        @click="handleGotoSongList(songList.dissid)"
      >
        {{ songList.dissname }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
