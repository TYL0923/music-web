<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div
    absolute bottom-0 left-0
    w-full h-20 px-10
    bg-white
    flex items-center
  >
    <div absolute top-0 left-0 w-200px h-2px bg-emerald-500 />
    <div w-100 flex items-center>
      <div
        :style="{ backgroundImage: `url('https://y.qq.com/music/photo_new/T002R300x300M000000quurA1pLBwu_1.jpg?max_age=2592000')` }"
        w-13 h-13 rounded-1
        bg-cover bg-center bg-norepect
      />
      <div flex-1 ml-2>
        <p text-sm mb-1>
          Complicated - Avril Lavigne
        </p>
        <span flex items-center text-xl>
          <Icon icon="ph:heart" />
          <Icon icon="ph:arrow-fat-down" />
          <Icon icon="ph:chat" />
          <Icon icon="ph:chat-centered-dots" />
        </span>
      </div>
    </div>
    <div flex-1 text-base text-gray-900 px-10 flex items-center gap-x-6>
      <Icon icon="ph:arrows-counter-clockwise-light" />
      <Icon icon="ph:arrow-fat-left-fill" />
      <div w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center>
        <Icon icon="ph:pause" />
      </div>
      <Icon icon="ph:arrow-fat-right-fill" />
      <Icon icon="ph:speaker-high" />
    </div>
    <div w-50 text-right>
      02:02/03:03 词
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
