<script setup lang="ts">
const { isShow } = useLogin()
const logFun = (info: string) => {
  // console.log(info)
}
onMounted(() => {
  function changeFontSize() {
    const docEl = document.documentElement
    const width = docEl.getBoundingClientRect().width
    const rem = width / 90
    docEl.style.fontSize = `${rem}px`
  }
  window.addEventListener('resize', changeFontSize)
  changeFontSize()
})
const { playListDrawerVisible, player } = usePlayer()
function handleSongPlay(song: Song) {
  player.togglePlaySong(song)
}
function handleSongPause() {
  player.pausePlay()
}
</script>

<template>
  <div>
    <Login
      v-model:is-show="isShow"
      @on-befor-login="logFun('befor')"
      @on-login-success="logFun('success')"
      @on-login-fail="logFun('fail')"
    />
    <a-drawer
      v-model:visible="playListDrawerVisible"
      width="280"
      class="custom-class"
      title="播放列表"
      placement="right"
      :body-style="{ padding: 0 }"
    >
      <SongPlayerItem
        v-for="song in player.playList"
        :key="song.songmid"
        :data="song"
        @play="handleSongPlay"
        @pause="handleSongPause"
      />
    </a-drawer>
    <div flex>
      <nav w-220px min-w-220px h-screen border-r-2 border-gray-100>
        <div text-24px text-center p-4 h-70px>
          vue音乐
        </div>
        <div overflow-auto style="height: calc(100vh - 70px)">
          <Nav />
        </div>
      </nav>
      <div flex-1 flex-col relative>
        <Header />
        <main flex-1 pt-84px px-5 pb-10 h-100vh overflow-y-auto overflow-x-hidden>
          <RouterView />
          <Player />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
