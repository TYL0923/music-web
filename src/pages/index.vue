<script setup lang="ts">
const a = async () => {
  const [err, data] = await getUserDetail('1833290014')
}
const b = async () => {
  const [err, data] = await getCookie('1833290014')
}
</script>

<template>
  <div>
    <a-button @click="a">
      get
    </a-button>
    <a-button @click="b">
      cookie
    </a-button>
  </div>
</template>
