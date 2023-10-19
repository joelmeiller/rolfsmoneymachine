<script setup lang="ts">
import { useConfigStore } from '@/stores/config';
import { TranslatorService } from '@/services/TranslatorService'
import { useResultStore } from '@/stores/result';
import { ref } from 'vue';

const props = defineProps<{
  title: string
  description: string
  onDone: () => void,
  onAbort: {
    label: string
    onClick: () => void
  }
}>()

const { file, languages, numRows, startRow, setConfig } = useConfigStore()
const { setResult } = useResultStore()

const numTranslated = ref<number>(0)

// Go back to start if there is a missing config
if (file === null || languages.length === 0 || numRows === 0) {
  props.onAbort.onClick()
}

TranslatorService.run({
  file: file!,
  config: {
    languages,
    numRows,
    startRow,
  },
  onDone: (result) => {
    setResult(result)

    if (!result.error) {
      setConfig({
        languages,
        numRows,
        startRow: startRow + numRows,
      })
    }

    props.onDone()
  },
  onProgress: (progress) => {
    numTranslated.value = progress.numTranslated + progress.numFailed
  },
})

</script>

<template>
  <main class="page">
    <h2>{{ title }}</h2>

    <section>
      <p>{{ description }}</p>
      <p>Fortschritt: <b>{{ numTranslated }}</b> / {{ numRows }} Zeilen bearbeitet</p>
      <button type="button" @click="onAbort.onClick">{{ onAbort.label }}</button>
    </section>

  </main>
</template>
