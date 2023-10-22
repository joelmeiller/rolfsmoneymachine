<script setup lang="ts">
import { TranslatorWorker } from '@/services/TranslatorWorker';
import { computed, ref } from 'vue';

defineProps<{
  title: string
  description: string
  button: {
    label: string
    onClick: () => void
  }
}>()

const numCharsAvailable = ref<number | null>(null)

TranslatorWorker.usage().then((usage) => {
  numCharsAvailable.value = usage.limit - usage.count
})

const charsAvailableClass = computed(() => {
  return !numCharsAvailable.value || numCharsAvailable.value > 1000 ? '' : 'red'
})

</script>

<template>
  <main class="page">
    <h2>{{ title }}</h2>

    <section>
      <p>{{ description }}</p>
      <p v-if="numCharsAvailable !== null" :class="charsAvailableClass">Verbleibende Anzahl Zeichen im deepL Free Plan: <b>{{
        numCharsAvailable }}</b></p>
      <button @click="button.onClick">{{ button.label }}</button>
    </section>

  </main>
</template>

<style scoped>
.red {
  border: 2px solid red;
  border-radius: 4px;
  padding: 1rem 2rem;
  background-color: rgba(255, 245, 245, 0.5);
  color: red;
}
</style>