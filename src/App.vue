<script setup lang="ts">
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
        label: '音乐馆',
        key: 'music-hall',
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
        label: '本地和下载',
        key: 'local',
      },
      {
        label: '最近播放',
        key: 'lately',
      },
      {
        label: '试听列表',
        key: 'audition',
      },
      {
        label: '已购音乐',
        key: 'buy',
      },
    ],
  },
]
const { isShow } = useLogin()
const logFun = (info: string) => {
  console.log(info)
}
</script>

<template>
  <Login
    v-model:is-show="isShow"
    @on-befor-login="logFun('befor')"
    @on-login-success="logFun('success')"
    @on-login-fail="logFun('fail')"
  />
  <div flex>
    <nav w-220px h-screen border-r-2 border-gray-100>
      <div text-2xl text-center p-4 h-70px>
        vue音乐
      </div>
      <div overflow-auto style="height: calc(100vh - 70px)">
        <a-menu id="dddddd" mode="inline">
          <a-menu-item-group v-for="group in navList" :key="group.key">
            <template #title>
              <span text-sm>{{ group.label }}</span>
            </template>
            <a-menu-item v-for="item in group.childrens" :key="item.key">
              <span text-sm font-bold> {{ item.label }} </span>
            </a-menu-item>
          </a-menu-item-group>
          <a-sub-menu key="my-song-list">
            <template #title>
              <span text-sm>我的歌单</span>
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
              <span text-sm>收藏歌单</span>
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
      </div>
    </nav>
    <div flex-1 flex-col relative>
      <Header />
      <main flex-1 pt-84px px-5 pb-10 h-100vh overflow-y-auto>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
