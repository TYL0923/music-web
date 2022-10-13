<script setup lang="ts">
import { Modal } from 'ant-design-vue'
import { Icon } from '@iconify/vue'
import { useDebounceFn } from '@vueuse/shared'
import { getHot, getSearchRecommend } from '../api/songApi'
const { toggle } = useLogin()
const { account, isLocal } = useLogin()
const searchVisible = ref<boolean>(false)
const keyWord = ref<string>('')
const hot = ref<Array<Record<string, number>>>([])
type RecommendMap = Record<
  'song' | 'album' | 'singer' | 'mv',
  {
    count: number
    itemlist: Array<Record<string, string>>
  }
>
const searchRecommend = ref<RecommendMap>()
const searchRecommendCom = computed(() => {
  if (!searchRecommend.value)
    return []
  const value = Object.entries(searchRecommend.value!).reduce((pre, [key, cur], idx) => {
    const _arr = Object.entries(cur.itemlist).reduce((p, [k, c]) => {
      p.push({
        type: key,
        ...c,
      })
      return p
    }, [] as Array<Record<string, string>>)
    if (_arr.length > 0 && idx !== 0) {
      pre.push({
        type: '-',
      })
    }
    return pre.concat(_arr)
  }, [] as Array<Record<string, string>>)
  // value.reverse()
  return value
})
function logout() {
  Modal.confirm({
    title: '是否退出登录',
    okText: '确定',
    okType: 'primary',
    cancelText: '取消',
    onOk() {
      account.value = ''
      isLocal.value = false
    },
    onCancel() {
    },
  })
}
async function initHot() {
  const [err, data] = await getHot()
  if (!err && data)
    hot.value = data
}

const handleInput = useDebounceFn(async () => {
  const [err, data] = await getSearchRecommend(keyWord.value)
  if (!err && data)
    searchRecommend.value = data
}, 350)
function handleFocus() {
  searchVisible.value = true
}
function handleBlur() {
  searchVisible.value = false
}
watchEffect(initHot)
</script>

<template>
  <div
    h-64px w-full px-4 border-b-1
    absolute z-100
    flex items-center
    border-gray-100 bg-white bg-opacity-80 backdrop-blur-sm
  >
    <div flex-1 flex items-center justify-between>
      <div flex item-center>
        <a-button type="text" size="small">
          <template #icon>
            <Icon icon="ph:caret-left" width="20px" />
          </template>
        </a-button>
        <span mx-4>{{ $route.path }}</span>
        <a-button type="text" size="small">
          <template #icon>
            <Icon icon="ph:caret-right" width="20px" />
          </template>
        </a-button>
      </div>
      <div w-300px bg-gray-100 h-40px rounded-xl pt-5px>
        <a-dropdown :visible="true">
          <a-input
            v-model:value="keyWord" placeholder="搜索歌曲"
            :bordered="false"
            @focus="handleFocus" @blur="handleBlur" @change="handleInput"
          >
            <template #prefix>
              <Icon icon="ph:magnifying-glass" width="20px" />
            </template>
          </a-input>
          <template #overlay>
            <a-menu v-if="searchRecommendCom.length > 0 && keyWord">
              <a-menu-item v-for="recommendItem, index in searchRecommendCom" :key="recommendItem.id || index">
                <a-menu-divider v-if="recommendItem.type === '-'" />
                <div v-else w-100 flex items-center px-4 line-clamp-1>
                  <div w-5 text-base>
                    <Icon v-if="recommendItem.type === 'song'" icon="ph:music-note" />
                    <Icon v-else-if="recommendItem.type === 'singer'" icon="ph:user" />
                    <Icon v-else-if="recommendItem.type === 'mv'" icon="ph:youtube-logo" />
                    <Icon v-else-if="recommendItem.type === 'album'" icon="ph:music-note" />
                  </div>
                  <span ml-2>
                    {{ `${recommendItem.name}-${recommendItem.singer}` }}
                  </span>
                </div>
              </a-menu-item>
            </a-menu>
            <a-menu v-else-if="hot.length > 0">
              <a-menu-item v-for="hotItem in hot" :key="hotItem.h">
                <div flex items-center justify-between text-base>
                  <span>{{ hotItem.h }}</span>
                  <span>{{ hotItem.k }}</span>
                </div>
              </a-menu-item>
            </a-menu>
            <a-menu v-else-if="keyWord">
              <a-menu-item v-for="i in 6" :key="i">
                <Skeleton type="search" />
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div
      w-200px mx-4 hover:cursor-pointer
    >
      <template v-if="account">
        <div flex items-center>
          <img
            w-10 h-10 mr-2
            rounded-full
            src="https://avatars.githubusercontent.com/u/82720231?v=4"
            alt=""
          >
          <span font-bold>{{ account }}</span>
          <Icon ml-4 text-gray-500 text-3xl icon="ph:arrow-square-right" @click="logout" />
        </div>
      </template>
      <template v-else>
        <a-button type="text" @click="toggle">
          登录
        </a-button>
      </template>
    </div>
  </div>
</template>

