
export type TranslatorProgress = {
  numTranslated: number
}

export type TranslatorResult = {
  error: string | null
  numTranslated: number
  numFailed: number
  numTotal: number
}

export enum Language {
  English = 'EN',
  French = 'FR',
  Italian = 'IT',
}