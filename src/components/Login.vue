<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { FormInstance } from 'ant-design-vue/es'
const props = defineProps<{
  isShow: boolean
}>()
const emits = defineEmits<{
  (e: 'onBeforLogin', loginForm: LoginForm): void
  (e: 'onLoginSuccess', account: string): void
  (e: 'onLoginFail', err: string | null | undefined): void
  (e: 'onLoginFinish'): void
  (e: 'update:is-show', newValue: boolean): void
}>()
const { isLocal: loginIsLocal } = useLogin()
const loginFormRef = ref<FormInstance | null>(null)
const loginForm = reactive<LoginForm>({
  account: '1833290014',
  password: '123456',
  isLocal: false,
})
const onFinish = async (values: LoginForm) => {
  emits('onBeforLogin', values)
  const [err, data] = await login(values)
  if (!err && data) {
    if (data.result === 100) {
      const [e, d] = await getCookie(values.account)
      if (!e && d) {
        emits('onLoginSuccess', loginForm.account)
        if (loginForm.isLocal)
          loginLocal()
        else loginIsLocal.value = false
      }
      else { emits('onLoginFail', '设置cookie失败') }
    }
    else { emits('onLoginFail', '登录失败') }
  }
  else { emits('onLoginFail', '登录失败') }
  emits('onLoginFinish')
}
const onFinishFailed = (error: any) => {
  emits('onLoginFail', error)
}
const maskRef = ref<HTMLElement | null>(null)
const handleLoginClick = (e: MouseEvent) => {
  if (maskRef.value === (e.target as HTMLElement))
    emits('update:is-show', !props.isShow)
}
function loginLocal() {
  loginIsLocal.value = true
}
</script>

<template>
  <div
    v-if="isShow"
    ref="maskRef"
    fixed z-1000
    w-100vw h-100vh
    bg-gray-600 bg-opacity-30
    @click="handleLoginClick($event)"
  >
    <div
      class="-translate-50%"
      absolute inset="1/2"
      w-120 h-100 min-w-400px min-h-350px
      bg-white rounded-xl px-20
    >
      <img
        w-30 h-30
        rounded-full
        absolute left="1/2"
        class="-translate-x-50% -translate-y-30%"
        src="https://avatars.githubusercontent.com/u/82720231?v=4"
      >
      <div mt-30>
        <a-form
          ref="loginFormRef"
          :model="loginForm"
          @finish="onFinish"
          @finish-failed="onFinishFailed"
        >
          <a-form-item
            name="account"
            :rules="[{ required: true, message: '请输入账号' }]"
          >
            <div border-b-2 border-gray-100>
              <a-input
                v-model:value="loginForm.account"
                size="large"
                :bordered="false"
              >
                <template #prefix>
                  <Icon icon="ph:user" width="26px" />
                </template>
              </a-input>
            </div>
          </a-form-item>
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <div border-b-2 border-gray-100>
              <a-input
                v-model:value="loginForm.password"
                size="large"
                type="password"
                :bordered="false"
              >
                <template #prefix>
                  <Icon icon="ph:lock-simple" width="26px" />
                </template>
              </a-input>
            </div>
          </a-form-item>
          <div mt-10>
            <a-checkbox v-model:checked="loginForm.isLocal">
              记住我
            </a-checkbox>
            <a-button mt-1 w-full size="large" type="primary" html-type="submit">
              登录
            </a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>
