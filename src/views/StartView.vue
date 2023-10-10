<script setup lang="ts">
defineProps<{
  title: string
  description: string
  button: {
    label: string
    onClick: () => void
  }
}>()
</script>

<template>
  {{ console.log('START VIEW') }}
  <main class="page">
    <h2>{{ title }}</h2>

    <section>
      <p>{{ description }}</p>
      <button @click="button.onClick">{{ button.label }}</button>
    </section>

  </main>
</template>
