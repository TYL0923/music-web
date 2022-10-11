import type { Ref } from 'vue'
import { useStorage } from '@vueuse/core'

interface LoginState {
  account: string
  cookie: string
  isShow: boolean
}
const loginState: Ref<LoginState> = useStorage('login', {
  isShow: true,
  account: '1833290014',
  cookie: '123',
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

