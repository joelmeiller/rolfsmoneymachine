<script setup lang="ts">
defineProps<{
  text: string
  error?: string
}>()
</script>

<template>
  <p class="label">{{ text }}</p>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<style scoped>
.label {
  font-size: 1rem;
  margin: 0;
  width: 128px;
}
.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 4px;
}
</style>
