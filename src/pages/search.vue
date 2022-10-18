<script setup lang="ts">
import { useDebounceFn } from '@vueuse/shared'
import { getSearchList } from '../api/songApi'
const route = useRoute()
const tabs: Array<Record<string, string> & { type: 'song' | 'singer' | 'mv' | 'album' }> = [
  {
    label: '单曲',
    type: 'song',
    t: '0',
  },
  {
    label: '专辑',
    type: 'album',
    t: '8',
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
]
const isLoading = ref<boolean>(false)
const t = ref<string>((tabs.find(item => item.type === route.query.type)?.t || 12).toString())
const key = ref<string>(route.query.key as string)
const total = ref<number>(0)
const searchList = ref<{
  'song': Song[]
  'album': Album[]
  'singer': Song[]
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
function handleTabChange(type: any) {
  t.value = type.toString()
}
const handleSearchInputChange = useDebounceFn(() => {
  initSearchList()
}, 350)
async function initSearchList() {
  isLoading.value = true
  const [err, data] = await getSearchList(key.value, t.value)
  if (!err && data) {
    total.value = data.total
    switch (data.t) {
      case '0':
        searchList.value!.song = data.list
        break
      case '9':
        searchList.value!.singer = data.list
        console.log(data)
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
  isLoading.value = false
}
watchEffect(initSearchList)
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
    <a-tabs v-model:activeKey="t" @change="handleTabChange">
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
          <template v-if="isLoading">
            <Skeleton v-for="i in 2" :key="i" type="list" />
          </template>
          <template v-else>
            <SongListItem
              v-for="song in searchList!.song" :key="song.songmid" :data="song"
              :more-menu-omit="['remove']"
            />
          </template>
        </div>
        <div v-if="tab.type === 'album'" style="display: grid;grid-template-columns: repeat(5,1fr);" gap-6>
          <template v-if="isLoading">
            <Skeleton v-for="i in 10" :key="i" type="albumCard" />
          </template>
          <template v-else>
            <AlbumCard v-for="album in searchList.album" :key="album.mid" :data="album" />
          </template>
        </div>
        <div v-if="tab.type === 'singer'">
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
          <template v-if="isLoading">
            <Skeleton v-for="i in 9" :key="i" type="list" />
          </template>
          <template v-else>
            <SongListItem
              v-for="song in searchList!.singer" :key="song.songmid" :data="song"
              :more-menu-omit="['remove']"
            />
          </template>
        </div>
      </a-tab-pane>
    </a-tabs>
    <div h-100px />
  </div>
</template>
