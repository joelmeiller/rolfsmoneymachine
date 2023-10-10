<script setup lang="ts">
defineProps<{
  title: string
  description: string
  data: {
    numTranslated: number
    numFailed: number
    numTotal: number
  }
  button: {
    label: string
    onClick: () => void
  }
}>()
</script>

<template>
  <main class="page">
    <h2>{{ title }}</h2>

    <section>
      <p>{{ description }}</p>
      <p>Erfolreich übersetzt: {{ data.numTranslated }}</p>
      <p>Übersetzung fehlgeschlagen: {{ data.numTranslated }}</p>
      <p>Total: {{ data.numTotal }}</p>

      <button @click="button.onClick">{{ button.label }}</button>
    </section>

  </main>
</template>
