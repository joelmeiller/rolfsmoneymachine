import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Language } from '@/types/translator'

export const useConfigStore = defineStore('config', () => {
  const filePath = ref<string | null>(null)
  const languages = ref<Array<Language>>([])
  const numRows = ref<number>(0)

  // Set actions
  const setFile = (params: { filePath: string }) => {
    filePath.value = params.filePath
  }

  const setConfig = (params: { languages: Array<Language>; numRows: number }) => {
    languages.value = params.languages
    numRows.value = params.numRows
  }

  return { filePath, languages, numRows, setFile, setConfig }
})
