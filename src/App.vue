<script setup lang="ts">
import { message } from 'ant-design-vue'
import { geUserCreatetSongList, getUserCollectSongList } from './api/songListApi'
import { refresh } from './api/userApi'
const { isShow: loginIsShow, account, isLocal: loginIsLocal, songList } = useLogin()
const { playListDrawerVisible, player } = usePlayer()
const userDetail = ref<UserDetail>()
const userCreateSongList = ref<Array<Record<string, string | number>>>([])
const userCollectSongList = ref<Array<Record<string, string | number>>>([])

onMounted(() => {
  function changeFontSize() {
    const docEl = document.documentElement
    const width = docEl.getBoundingClientRect().width
    const rem = width / 90
    docEl.style.fontSize = `${rem}px`
  }
  function handleUnLoad() {
    player.restore()
  }
  async function loginRefresh() {
    const [err, data] = await refresh()
  }
  window.addEventListener('resize', changeFontSize)
  window.addEventListener('unload', handleUnLoad)
  changeFontSize()
  handleUnLoad()
  if (loginIsLocal.value && account)
    loginRefresh()
})

async function initUserDetail() {
  const [err, data] = await getUserDetail(account.value)
  if (!err && data)
    userDetail.value = data
}
async function initUserCreateSongList() {
  const [err, data] = await geUserCreatetSongList(account.value)
  if (!err && data) {
    songList.value = []
    // 排除Qzone,我喜欢，本地上传歌单
    userCreateSongList.value = data.list.filter((item: Record<string, string | number>) => {
      if (![205, 206].includes(item.dirid as number)) {
        songList.value.push({
          label: item.diss_name,
          dirid: item.dirid,
        })
      }
      return ![205, 201, 206].includes(item.dirid as number)
    })
  }
}
async function initUserCollectSongList() {
  const [err, data] = await getUserCollectSongList(account.value)
  if (!err && data)
    userCollectSongList.value = data.list
}
function handleBeforLogin(loginForm: LoginForm) {
  message.loading({
    content: `账号${loginForm.account}正在登录中`,
    key: 'login',
  })
}
function handleLoginSuccess(accountRes: string) {
  account.value = accountRes
  message.success({
    content: `账号${accountRes}登录成功`,
    key: 'login',
    duration: 1,
  })
  loginIsShow.value = false
}
function handleLoginFail(err: string | null | undefined) {
  message.error({
    content: `登录失败${err ? (`,${err}`) : ''}`,
    key: 'login',
    duration: 1,
  })
}
watchEffect(initUserCreateSongList)
watchEffect(initUserCollectSongList)
watchEffect(initUserDetail)
</script>

<template>
  <div>
    <Login
      v-model:is-show="loginIsShow"
      @on-befor-login="handleBeforLogin"
      @on-login-success="handleLoginSuccess"
      @on-login-fail="handleLoginFail"
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
      />
    </a-drawer>
    <div flex>
      <nav w-220px min-w-220px h-screen border-r-2 border-gray-100>
        <div text-24px text-center p-4 h-70px>
          vue音乐
        </div>
        <div overflow-auto style="height: calc(100vh - 70px)">
          <Nav
            :user-detail="userDetail"
            :user-create-song-list="userCreateSongList"
            :user-collect-song-list="userCollectSongList"
          />
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
