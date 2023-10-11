import type { Language, TranslatorProgress, TranslatorResult } from '../types/translator'
import { TranslatorWorker } from './TranslatorWorker'
export const TranslatorService = {
  run: (params: {
    filePath: string
    languages: Array<Language>
    numRows: number
    onDone: (data: TranslatorResult) => void
    onProgress: (data: TranslatorProgress) => void
  }) => {
    // Rund code in worker
    TranslatorWorker.run(params)
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
