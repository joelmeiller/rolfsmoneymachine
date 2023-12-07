<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="text-center">
    <h1>💸 🎅🏼 💸<br />{{ text }}<br /><span class="money-after">💸 🎅🏼 💸</span></h1>
  </div>
</template>

<style scoped>
.money-after {
  line-height: 1.6;
}
</style>


