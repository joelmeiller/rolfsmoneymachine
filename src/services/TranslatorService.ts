import type { TranslatorConfig, TranslatorProgress, TranslatorResult } from '../types/translator'
import { Language } from '../types/enums'
import { TranslatorWorker } from './TranslatorWorker'
export const TranslatorService = {
  run: (params: {
    file: File
    config: TranslatorConfig
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
