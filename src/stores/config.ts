import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Language } from '@/types/enums'

export const useConfigStore = defineStore('config', () => {
  const file = ref<File | null>(null)
  const languages = ref<Array<Language>>([])
  const numRows = ref<number>(0)

  // Set actions
  const setFile = (params: { file: File }) => {
    file.value = params.file
  }

  const setConfig = (params: { languages: Array<Language>; numRows: number }) => {
    languages.value = params.languages
    numRows.value = params.numRows
  }

  return { file, languages, numRows, setFile, setConfig }
})
