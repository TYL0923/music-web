<script setup lang="ts">
import { message } from 'ant-design-vue'
import { removeSongById } from '../api/songListApi'
const route = useRoute()
const songListDetail = ref<SongList>()
const { player } = usePlayer()
const { uin } = useLogin()
const isLoading = ref<boolean>(false)
const tabOption = [
  {
    label: '歌曲',
    key: 'song',
  },
  {
    label: '最近收藏',
    key: 'collect',
  },
  {
    label: '评论',
    key: 'comment',
  },
]
const tabKey = ref<string>('song')
const songList = computed(() => {
  return songListDetail.value?.songlist || []
})

async function initSongList() {
  isLoading.value = true
  const [err, data] = await getSongList(route.query.id as string)
  if (!err && data)
    songListDetail.value = data
  isLoading.value = false
}
async function removeSong(id: string) {
  const [err, data] = await removeSongById(id, songListDetail.value!.dirid!)
  if (!err && data) {
    message.success({
      key: 'removeSong',
      content: '删除成功',
      duration: 1,
    })
    initSongList()
  }
  else {
    message.error({
      key: 'removeSong',
      content: '删除失败',
      duration: 1,
    })
  }
}
function added() {
  // 歌曲添加歌单成功回调
}

watchEffect(initSongList)
</script>

<template>
  <Skeleton v-if="isLoading" type="songList" />
  <div v-else>
    <div flex flex-items-center>
      <img w-40 h-40 rounded-2 mr-6 :src="songListDetail?.logo || ''" alt="">
      <div flex-1 text-sm text-gray-400 flex flex-col justify-between py-2>
        <div>
          <h1>{{ songListDetail?.dissname || '' }}</h1>
          <div my-2>
            <img w-6 h-6 rounded-full mr-2 :src="songListDetail?.headurl || ''" alt="">
            <span>{{ songListDetail?.nick || songListDetail?.nickname || '' }}</span>
          </div>
          <p>{{ songListDetail?.desc || '完善歌单信息有机会获得推荐' }}</p>
        </div>
        <div flex itema-center gap-x-4>
          <a-button type="primary" @click="player.playAll(songListDetail!.songlist)">
            播放全部
          </a-button>
          <a-button>
            批量操作
          </a-button>
        </div>
      </div>
    </div>
    <div mt-4>
      <a-tabs v-model:activeKey="tabKey">
        <a-tab-pane v-for="tab in tabOption" :key="tab.key" :tab="tab.label">
          <div>
            <div text-sm text-gray-500 flex px-2>
              <div style="width: 40%">
                歌曲
              </div>
              <div style="width: 30%">
                歌手
              </div>
              <div style="width: 30%">
                专辑
              </div>
            </div>
            <SongListItem
              v-for="song in songList" :key="song.songmid" :data="song"
              :more-menu-omit="uin !== songListDetail?.uin ? ['remove'] : []"
              @remove-song="removeSong"
              @added-song="added"
            />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
