import type { Request, Response } from 'express'
import deepl, { type TargetLanguageCode } from 'deepl-node'
import { Config } from '../config.mjs'

const DEEPL_API_PATH = '/api/deepL'

const Translator = new deepl.Translator(Config.DEEPL_API_KEY)

type TranslateTextParams = {
  textList: Array<string>
  targetLanguage: TargetLanguageCode
}

type TranslateTextResult = Array<string>

const translate = async (params: TranslateTextParams): Promise<TranslateTextResult> => {
  const results = await Translator.translateText(params.textList, null, params.targetLanguage)
  return results.map((result) => result.text)
}

const translateMock = (params: TranslateTextParams): Promise<TranslateTextResult> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(params.textList.map((text) => `Translated: ${text}`))
    }, 1000)
  })

const translateText = Config.DEEPL_API_ACTIVE ? translate : translateMock

export const DeepLController = () => {
  return {
    // ======================================
    // DeepL API Controller
    // ======================================

    translatePath: `${DEEPL_API_PATH}/translate`,
    translate: async (req: Request, res: Response) => {
      if (!req.body.textList || req.body.textList.length === 0 || !req.body.targetLanguage)
        return res.status(400).json({ error: 'Invalid request' })

      try {
        const translatedTextList = await translateText({
          textList: req.body.textList,
          targetLanguage: req.body.targetLanguage
        })
        res.json({ translatedTextList })
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
      }
    }
  }
}
