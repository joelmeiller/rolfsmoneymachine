import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TranslatorResult } from '@/types/translator'
import { CONFIG_KEY } from './config'

export const useResultStore = defineStore('result', () => {
  const numTranslated = ref<number>(0)
  const numFailed = ref<number>(0)
  const numTotal = ref<number>(0)
  const error = ref<string | null>(null)

  // Set actions

  const setResult = (params: TranslatorResult) => {
    numTranslated.value = params.numTranslated
    numFailed.value = params.numFailed
    numTotal.value = params.numTotal
    error.value = params.error
  }

  return { numTranslated, numFailed, numTotal, error, setResult }
})
