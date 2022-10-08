<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div
    class="container" hover="bg-gray-100"
    relative
    h-20 px-6 py-2 duration-300
    flex itmes-center justify-between
  >
    <div
      absolute class="operation w-30 h-full top-0 right-0"
      text-2xl
      gap-x-2 pr-6 text-gray-500
      flex items-center
    >
      <Icon icon="ph:play" hover="cursor-pointer" />
      <Icon icon="ph:heart" hover="cursor-pointer" />
      <Icon icon="ph:dots-three-circle" hover="cursor-pointer" />
    </div>
    <span flex-1 pt-2>
      <p mb-0 text-base>
        Time
      </p>
      <p mb-0 text-sm>
        OVSKY
      </p>
    </span>
    <span w-30 flex items-center justify-end>
      <div class="time" text-gray-400 text-sm>02:19</div>
    </span>
  </div>
</template>

<style scoped lang="less">
  .container {
    .operation {
      display: none;
    }
    &:hover {
      .operation {
        display: flex;
      }
      .time {
        display: none;
      }
    }
  }
</style>
