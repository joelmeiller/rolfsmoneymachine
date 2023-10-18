import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Language } from '@/types/enums'

const InitialConfig = JSON.stringify({ startRow: 3, numRows: 13 })
const Config = JSON.parse(window.localStorage.getItem('Config') || InitialConfig)

export const useConfigStore = defineStore('config', () => {
  const file = ref<File | null>(null)
  const languages = ref<Array<Language>>([])
  const numRows = ref<number>(Config.numRows)
  const startRow = ref<number>(Config.startRow)

  // Set actions
  const setFile = (params: { file: File }) => {
    file.value = params.file
  }

  const setConfig = (params: { languages: Array<Language>; numRows: number; startRow: number }) => {
    languages.value = params.languages
    numRows.value = params.numRows
    startRow.value = params.startRow

    window.localStorage.setItem(
      'Config',
      JSON.stringify({ startRow: startRow.value, numRows: numRows.value })
    )
  }

  return { file, languages, numRows, setFile, setConfig, startRow }
})
