<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    data: Singer[] | string
    char?: ' - ' | ' | '
  }>(),
  {
    char: ' | ',
  },
)
const singerList = computed(() => {
  if (!Array.isArray(props.data))
    return [{ mid: undefined, name: props.data }]
  return props.data
})
const router = useRouter()
function handleGotoSinger(singerMid: string | undefined) {
  if (singerMid) {
    router.push({
      path: 'singer',
      query: {
        mid: singerMid,
      },
    })
  }
}
</script>

<template>
  <span>
    <template v-for="singer, index in singerList" :key="singer.singer_mid || index">
      <span v-if="index !== 0">{{ char }}</span>
      <span hover="cursor-pointer text-emerald-500" @click="handleGotoSinger(singer.mid || singer.singer_mid)">{{ singer.singer_name || singer.name }}</span>
    </template>
  </span>
</template>
