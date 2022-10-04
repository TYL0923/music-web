<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { FormInstance } from 'ant-design-vue/es'
type LoginForm = {
  account: string
  password: string
}
type LoginRes = {
  account: string
  cookie: string
}

const props = defineProps<{
  isShow: boolean
}>()
const loginFormRef = ref<FormInstance | null>(null)
const loginForm = reactive<LoginForm>({
  account: 'tyl0923',
  password: '123456',
})
const emits = defineEmits<{
  (e: 'onBeforLogin', loginForm: LoginForm): void
  (e: 'onLoginSuccess', loginRes: LoginRes): void
  (e: 'onLoginFail', err: string): void
  (e: 'onLoginFinish'): void
  (e: 'update:is-show', newValue: boolean): void
}>()
const onFinish = (values: LoginForm) => {
  emits('onBeforLogin', values)
  const promise: Promise<LoginRes | string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.account === 'tyl0923' && values.password === '123456') {
        resolve({
          account: values.account,
          cookie: '',
        })
      } else {
        reject('账号或密码不正确')
      }
    }, 2000)
  })
  promise
    .then(res => {
      emits('onLoginSuccess', res as LoginRes)
    })
    .catch(err => {
      emits('onLoginFail', err)
    })
    .finally(() => {
      emits('onLoginFinish')
    })
}
const onFinishFailed = (error: any) => {
  emits('onLoginFail', error)
}
const maskRef = ref<HTMLElement | null>(null)
const handleLoginClick = (e: MouseEvent) => {
  if (maskRef.value === (e.target as HTMLElement)) {
    emits('update:is-show', !props.isShow)
  } else {
  }
}
</script>
<template>
  <div
    ref="maskRef"
    fixed
    z-100
    w-100vw
    h-100vh
    bg-gray-600
    bg-opacity-30
    v-if="isShow"
    @click="handleLoginClick($event)"
  >
    <div
      absolute
      inset="1/2"
      class="-translate-50%"
      w-120
      h-100
      bg-white
      rounded-xl
      px-20
    >
      <img
        w-30
        h-30
        rounded-full
        absolute
        left="1/2"
        class="-translate-x-50% -translate-y-30%"
        src="https://avatars.githubusercontent.com/u/82720231?v=4"
      />
      <div mt-30>
        <a-form
          :model="loginForm"
          ref="loginFormRef"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="account"
            :rules="[{ required: true, message: '请输入账号' }]"
          >
            <div border-b-2 border-gray-100>
              <a-input
                size="large"
                :bordered="false"
                v-model:value="loginForm.account"
              >
                <template #prefix>
                  <Icon icon="ph:user" width="26px"></Icon>
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
                size="large"
                type="password"
                v-model:value="loginForm.password"
                :bordered="false"
              >
                <template #prefix>
                  <Icon icon="ph:lock-simple" width="26px"></Icon>
                </template>
              </a-input>
            </div>
          </a-form-item>
          <a-button w-full mt-10 size="large" type="primary" html-type="submit"
            >登录</a-button
          >
        </a-form>
      </div>
    </div>
  </div>
</template>
