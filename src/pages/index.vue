<script setup lang="ts">
const a = () => {
  getUserDetail('1833290014')
}
const b = () => {
  getCookie('1833290014')
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
