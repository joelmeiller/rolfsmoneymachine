import type { TranslatorProgress, TranslatorResult } from '../types/translator'

export const TranslatorService = {
  run: (params: {
    file: File
    languages: Array<string>
    numRows: Number
    onFinished: (data: TranslatorResult) => void
    onProgress: (data: TranslatorProgress) => void
  }) => {
    // Rund code in worker
    // const worker = new Worker(new URL('./translator.worker.js', import.meta.url))
    // worker.postMessage(params)
    // worker.onmessage = (event) => {
    //   const data = event.data
    //   if (data.type === 'progress') {
    //     params.onProgress(data)
    //   } else if (data.type === 'result') {
    //     params.onFinished(data)
    //   }
    // }
  }
}
