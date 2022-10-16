<script setup lang="ts">
import { useDebounceFn } from '@vueuse/shared'
import { message } from 'ant-design-vue'
import { getSearchList } from '../api/songApi'
const route = useRoute()
const tabs: Array<Record<string, string> & { type: 'song' | 'singer' | 'mv' | 'album' }> = [
  {
    label: '单曲',
    type: 'song',
    t: '0',
  },
  {
    label: '歌手',
    type: 'singer',
    t: '9',
  },
  {
    label: 'mv',
    type: 'mv',
    t: '12',
  },
  {
    label: '专辑',
    type: 'album',
    t: '8',
  },
]
const isLoading = ref<{
  'song': boolean
  'singer': boolean
  'album': boolean
  'mv': boolean
}>({
  song: false,
  singer: false,
  album: false,
  mv: false,
})
const t = ref<string>((tabs.find(item => item.type === route.query.type)?.t || 0).toString())
const key = ref<string>(route.query.key as string)
const total = ref<number>(0)
const searchList = ref<{
  'song': Song[]
  'album': Album[]
  'singer': Singer[]
  'mv': Mv[]
}>({
  song: [],
  album: [],
  singer: [],
  mv: [],
})
watch(
  [() => route.query.type, () => route.query.key],
  ([newType, newKey]) => {
    t.value = (tabs.find(item => item.type === newType)?.t || 0).toString()
    key.value = newKey as string
    initSearchList()
  },
)
async function addSong(mid: string, dirid: string) {
  const [err, data] = await addSongByMid(mid, dirid)
  if (!err && data) {
    message.success({
      key: 'addSong',
      content: '添加成功',
      duration: 1,
    })
  }
  else {
    message.error({
      key: 'addSong',
      content: '添加失败, 请重试',
      duration: 1,
    })
  }
}

const handleSearchInputChange = useDebounceFn(() => {
  initSearchList()
}, 350)
async function initSearchList() {
  isLoading.value.song = true
  const [err, data] = await getSearchList(key.value, t.value)
  if (!err && data) {
    total.value = data.total
    switch (data.t) {
      case '0':
        searchList.value!.song = data.list
        break
      case '9':
        searchList.value!.singer = data.list
        break
      case '12':
        searchList.value!.mv = data.list
        break
      case '8':
        searchList.value!.album = data.list
        break
      default:
        break
    }
  }
  isLoading.value.song = false
}
initSearchList()
</script>

<template>
  <div>
    <div bg-gray-50 rounded-2 h-16 py-1>
      <a-input
        v-model:value="key"
        style="height: 100%;font-size: 2rem;" placeholder="输入关键词"
        :bordered="false"
        @change="handleSearchInputChange"
      />
    </div>
    <a-tabs v-model:activeKey="t">
      <a-tab-pane v-for="tab in tabs" :key="tab.t" :tab="tab.label">
        <div v-if="tab.type === 'song'">
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
          <template v-if="isLoading.song">
            <Skeleton v-for="i in 9" :key="i" type="list" />
          </template>
          <template v-else>
            <SongListItem
              v-for="song in searchList!.song" :key="song.songmid" :data="song"
              :more-menu-omit="['remove']"
              @add-song="addSong"
            />
          </template>
        </div>
      </a-tab-pane>
    </a-tabs>
    <div h-100px />
  </div>
</template>
