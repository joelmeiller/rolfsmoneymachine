import type { Language } from './enums'
export type TranslatorConfig = {
  languages: Array<Language>
  numRows: number
  startRow: number
}
export type TranslatorProgress = {
  numTranslated: number
}

export type TranslatorResult = {
  error: string | null
  numTranslated: number
  numFailed: number
  numTotal: number
}
