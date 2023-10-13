import type { Request, Response } from 'express'
import deepl from 'deepl-node'
import { Config } from '../config.mjs'

const DEEPL_API_PATH = '/api/deepL'

const Translator = new deepl.Translator(Config.DEEPL_API_KEY)

// ;(async () => {
//   const result = await translator.translateText('Hello, world!', null, 'fr')
//   console.log(result.text) // Bonjour, le monde !
// })()

export const DeepLController = () => {
  return {
    // ======================================
    // DeepL API Controller
    // ======================================

    translatePath: `${DEEPL_API_PATH}/translate`,
    translate: (req: Request, res: Response) => {}
  }
}
