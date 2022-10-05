<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { toggle } = useLogin()
</script>

<template>
  <div
    h-64px w-full px-4 border-b-1
    absolute
    flex items-center
    border-gray-100 bg-white bg-opacity-80 backdrop-blur-sm
  >
    <div flex-1 flex items-center justify-between>
      <div flex item-center>
        <a-button type="text" size="small">
          <template #icon>
            <Icon icon="ph:caret-left" width="20px" />
          </template>
        </a-button>
        <span mx-4>{{ $route.path }}</span>
        <a-button type="text" size="small">
          <template #icon>
            <Icon icon="ph:caret-right" width="20px" />
          </template>
        </a-button>
      </div>
      <div w-300px bg-gray-100 h-40px rounded-xl pt-5px>
        <a-input placeholder="搜索歌曲" :bordered="false">
          <template #prefix>
            <Icon icon="ph:magnifying-glass" width="20px" />
          </template>
        </a-input>
      </div>
    </div>
    <div
      w-200px mx-4 hover:cursor-pointer
    >
      <img
        w-10 h-10 mr-2
        rounded-full
        src="https://avatars.githubusercontent.com/u/82720231?v=4"
        alt=""
      >
      <span font-bold @click="toggle">tyl0923</span>
    </div>
  </div>
</template>

