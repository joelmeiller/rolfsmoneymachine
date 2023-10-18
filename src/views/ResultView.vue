<script setup lang="ts">
import { useResultStore } from '@/stores/result';

defineProps<{
  title: string
  description: string
  button: {
    label: string
    onClick: () => void
  }
}>()

const { numTranslated, numFailed, numTotal } = useResultStore()


</script>

<template>
  <main class="page">
    <h2>{{ title }}</h2>

    <section>
      <p>{{ description }}</p>
      <p>Erfolreich übersetzt: {{ numTranslated }}</p>
      <p>Übersetzung fehlgeschlagen: {{ numFailed }}</p>
      <p>Total: {{ numTotal }}</p>

      <button @click="button.onClick">{{ button.label }}</button>
    </section>

  </main>
</template>
