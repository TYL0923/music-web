<script setup lang="ts">
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
const loginForm = reactive({
  account: 'tyl0923',
  password: '123456',
})
</script>
<template>
  <div fixed z-100 w-100vw h-100vh bg-gray-600 bg-opacity-30>
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
        <a-form :model="loginForm">
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
          <a-button w-full mt-10 size="large" type="primary">登录</a-button>
        </a-form>
      </div>
    </div>
  </div>
</template>
