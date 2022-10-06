<script setup lang="ts">
const a = async () => {
  const [err, res] = await getUserDetail('1833290014')
  // console.log(res)
}
const b = async () => {
  const [err, res] = await getCookie('1833290014')
  // console.log(res)
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
