<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'songList' | 'recommend' | 'default' | 'songCard' | 'albumCard' | 'mvCard' | 'songListCard' | 'search' | 'list' | 'singerInfo'
    w?: number
    h?: number
  }>(), {
    type: 'default',
  })
</script>

<template>
  <div class="container">
    <template v-if="type === 'songList'">
      <div flex flex-items-center>
        <main w-40 h-40 rounded-2 mr-6 />
        <main w-200 h-40 rounded-2 />
      </div>
      <div mt-15>
        <main w-full h-8 mb-8 rounded-1 />
        <main w-full h-8 mb-8 rounded-1 />
        <main w-full h-8 mb-8 rounded-1 />
        <main w-full h-8 mb-8 rounded-1 />
      </div>
    </template>
    <template v-else-if="type === 'recommend'">
      <div mt-20 flex items-center>
        <main w-80 h-40 mr-30 rounded-2 />
        <main w-40 h-40 mr-10 rounded-2 />
        <main w-40 h-40 mr-10 rounded-2 />
      </div>
      <div mt-20 flex items-center gap-x-8>
        <main w-50 h-50 rounded-2 />
        <main w-50 h-50 rounded-2 />
        <main w-50 h-50 rounded-2 />
        <main w-50 h-50 rounded-2 />
        <main w-50 h-50 rounded-2 />
      </div>
    </template>
    <template v-else-if="type === 'songCard'">
      <div flex items-center>
        <main w-25 h-25 rounded-1 />
        <div ml-4>
          <main mb-2 w-40 h-4 rounded-1 />
          <main w-30 h-4 rounded-1 />
        </div>
      </div>
    </template>
    <template v-else-if="type === 'albumCard'">
      <div>
        <main w-40 h-40 rounded-2 />
        <main mt-2 w-30 h-5 rounded-1 />
      </div>
    </template>
    <template v-else-if="type === 'mvCard'">
      <div>
        <main w-50 h-30 rounded-2 />
        <main mt-2 w-50 h-5 rounded-1 />
        <main mt-1 w-15 h-5 rounded-1 />
      </div>
    </template>
    <template v-else-if="type === 'songListCard'">
      <div>
        <main w-50 h-50 rounded-2 />
        <main mt-2 w-30 h-5 rounded-1 />
      </div>
    </template>
    <template v-else-if="type === 'search'">
      <div>
        <main h-4 mt-2 />
      </div>
    </template>
    <template v-else-if="type === 'list'">
      <div>
        <main h-6 my-10 mx-6 rounded-1 />
      </div>
    </template>
    <template v-else-if="type === 'singerInfo'">
      <div flex items-center>
        <main w-50 h-50 mx-6 rounded-full />
        <main py-4 w-200 h-40 rounded-2 />
      </div>
    </template>
    <template v-else>
      <main :class="`w-${w} h-${h}`" rounded-2 />
    </template>
  </div>
</template>

<style scoped lang="less">
  @keyframes loading {
    to {
      background-position-x: -20%;
    }
  }
  .container {
    main {
      overflow: hidden;
      background-color: #f3f4f6;
      background: linear-gradient(
        120deg,
        rgba(255,255,255, 0) 40%,
        rgba(255,255,255, .5) 50%,
        rgba(255,255,255, 0) 60%
      ) #eee;
      background-size: 200% 100%;
      background-position-x: 120%;
      animation: 1s loading ease-in-out infinite;
    }
  }
</style>
