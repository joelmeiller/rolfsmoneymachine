<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <p class="label">{{ text }}</p>
</template>

<style scoped>
.label {
  font-size: 1rem;
  margin-bottom: 12px;
}
</style>
