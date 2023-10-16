<script setup lang="ts">
import { defineProps } from 'vue'
import { useConfigStore } from '@/stores/config';
import { TranslatorService } from '@/services/TranslatorService'

const props = defineProps<{
  title: string
  description: string
  onDone: () => void,
  onAbort: {
    label: string
    onClick: () => void
  }
}>()

const { file, languages, numRows } = useConfigStore()

// Go back to start if there is a missing config
if (file === null || languages.length === 0 || numRows === 0) {
  props.onAbort.onClick()
}

TranslatorService.run({
  file: file!,
  languages,
  numRows,
  onDone: (result) => {
    console.log(result)
    props.onDone()
  },
  onProgress: (progress) => {
    console.log(progress)
  },
})

</script>

<template>
  <main class="page">
    <h2>{{ title }}</h2>

    <section>
      <p>{{ description }}</p>
      <button type="button" @click="onAbort.onClick">{{ onAbort.label }}</button>
    </section>

  </main>
</template>
