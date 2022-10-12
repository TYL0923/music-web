import type { Ref } from 'vue'
import { useStorage } from '@vueuse/core'

interface LoginState {
  account: string
  isShow: boolean
  isLocal: boolean
}
const loginState: Ref<LoginState> = useStorage('login', {
  isShow: true,
  account: '',
  isLocal: false,
})
const useLogin = () => {
  const toggle = () => {
    loginState.value.isShow = !loginState.value.isShow
  }
  return {
    ...toRefs(loginState.value),
    toggle,
  }
}

export default useLogin

