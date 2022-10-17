<script setup lang="ts">
import { getMvByCate, getMvCate } from '../api/mvApi'

const cateOption = reactive({
  pageNo: 1,
  pageSize: 20,
  area: 15,
  version: 7,
})
const cateMap: Record<'area' | 'version', string> = {
  area: '地区',
  version: '版本',
}
const isLoading = ref<boolean>(false)
const mvList = ref<Mv[]>([])
const mvCateOption = ref<{
  area: Array<{
    id: number
    name: string
  }>
  version: Array<{
    id: number
    name: string
  }>
}>()
const cateClass = computed(() => {
  return (key: 'area' | 'version', value: number) => {
    return cateOption[key] === value ? 'text-emerald-500' : ''
  }
})
const cateTitle = computed(() => {
  return mvCateOption.value?.area.find(cate => cate.id === cateOption.area)?.name || ''
})
function handleCateChange(key: 'area' | 'version', value: number) {
  cateOption[key] = value
}
async function initMvCate() {
  const [err, data] = await getMvCate()
  if (!err && data)
    mvCateOption.value = data
}
async function initMv() {
  isLoading.value = true
  const [err, data] = await getMvByCate({
    area: cateOption.area,
    version: cateOption.version,
    pageNo: cateOption.pageNo,
    pageSize: cateOption.pageSize,
  })
  // console.log(data)
  if (!err && data)
    mvList.value = data.list
  isLoading.value = false
}
watchEffect(initMvCate)
watchEffect(initMv)
</script>

<template>
  <div>
    <div
      v-for="cateGroup, index in mvCateOption" :key="index"
      my-2 flex items-center
    >
      <div text-gray-900>
        {{ `${cateMap[index]}: ` }}
      </div>
      <div>
        <a-button
          v-for="cateItem in cateGroup"
          :key="cateItem.id"
          type="text" style="margin: 0 10px;"
          @click="handleCateChange(index, cateItem.id)"
        >
          <span :class="cateClass(index, cateItem.id)">{{ cateItem.name }}</span>
        </a-button>
      </div>
    </div>
    <div>
      <h2 my-4>
        {{ cateTitle }}
      </h2>
      <div style="display: grid;grid-template-columns: repeat(4,1fr);" gap-6>
        <template v-if="isLoading">
          <Skeleton v-for="i in 20" :key="i" type="mvListItem" />
        </template>
        <template v-else>
          <MvCard v-for="mv in mvList" :key="mv.vid" :rounded="false" full :data="mv" />
        </template>
      </div>
    </div>
    <div h-40 />
  </div>
</template>
