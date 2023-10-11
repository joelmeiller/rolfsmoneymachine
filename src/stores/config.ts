import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Language } from '@/types/translator'

export const useConfigStore = defineStore('config', () => {
  const file = ref<string | null>(null)
  const languages = ref<Array<Language>>([])
  const numRows = ref<Number>(0)

  // Set actions
  const setFile = (params: { file: string }) => {
    file.value = params.file
  }

  const setConfig = (params: { languages: Array<Language>; numRows: Number }) => {
    languages.value = params.languages
    numRows.value = params.numRows
  }

  return { file, languages, numRows, setFile, setConfig }
})
