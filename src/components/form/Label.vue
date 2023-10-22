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
  width: 240px;
  margin: 6px 0 0;
}
.error {
  color: red;
  font-size: 0.8rem;
  margin-bottom: 4px;
  width: 240px;
}
</style>
