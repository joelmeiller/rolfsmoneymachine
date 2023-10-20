import axios from 'axios'
import * as XLSX from 'xlsx'
import { Language } from '../types/enums'
import type { TranslatorConfig, TranslatorProgress, TranslatorResult } from '../types/translator'

// Define your DeepL API key and endpoint
const apiKey = '*'
const deepLApiEndpoint = 'https://api-free.deepl.com/v2/translate'
const serverDeepLApiEndpoint = 'http://localhost:5201/api/deepL/translate'

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Function to translate text using DeepL API
// https://support.deepl.com/hc/en-us/articles/7869276014748-API-request-blocked-by-CORS-policy-
const NOT_WORKING_translateText = async (
  textList: Array<string>,
  targetLanguage: string
): Promise<string> => {
  try {
    const response = await axios.post(deepLApiEndpoint, {
      text: textList,
      target_lang: targetLanguage,
      auth_key: apiKey
    })

    await delay(50)
    return response.data.translations.map((translation: { text: string }) => translation.text)
  } catch (error: any) {
    console.error(`Error translating text: ${error.message}`)
    return ''
  }
}

const translateTextServer = async (
  textList: Array<string>,
  targetLanguage: string
): Promise<Array<string>> => {
  try {
    const response = await axios.post(serverDeepLApiEndpoint, {
      textList,
      targetLanguage
    })
    await delay(50)
    return response.data.translatedTextList
  } catch (error: any) {
    console.error(`Error translating text: ${error.error}`)
    return []
  }
}

export const TranslatorWorker = {
  run: async (params: {
    file: File
    config: TranslatorConfig
    onDone: (data: TranslatorResult) => void
    onProgress: (data: TranslatorProgress) => void
  }) => {
    try {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        /* Parse data */
        const bstr = e.target.result
        TranslatorWorker.processExcel({
          fileName: params.file.name,
          workbook: XLSX.read(bstr, { type: 'binary' }),
          config: params.config,
          onDone: params.onDone,
          onProgress: params.onProgress
        })
      }

      reader.readAsBinaryString(params.file)
    } catch (error: any) {
      console.error('Error while translating', error)
      params.onDone({
        error: error.reason || error.message,
        numFailed: 0,
        numTranslated: 0,
        numTotal: 0
      })
    }
  },

  processExcel: async (params: {
    fileName: string
    workbook: XLSX.WorkBook
    config: TranslatorConfig
    onDone: (data: TranslatorResult) => void
    onProgress: (data: TranslatorProgress) => void
  }) => {
    // Load the Excel file and get the worksheet
    const sheetName = params.workbook.SheetNames[0] // Assuming you want to work with the first sheet
    const worksheet = params.workbook.Sheets[sheetName]

    // Initialize an empty array to store the translated data
    // const translatedData: Record<string, string>[] = []

    let numTranslated = 0
    let numFailed = 0

    // Loop through each row in the Excel file and get the source texts
    for (let rowIndex = params.config.startRow; ; rowIndex++) {
      const cellB = worksheet[`B${rowIndex}`]
      const cellC = worksheet[`C${rowIndex}`]
      let failed = false

      if (rowIndex >= params.config.startRow + params.config.numRows || !cellB || !cellB.v) {
        // Break the loop when there are no more cells with data
        break
      }

      // Process cell B
      const textList = []
      if (cellB && cellB.v) {
        textList.push(cellB.v)
      }

      // Process cell C
      if (cellC && cellC.v) {
        textList.push(cellC.v)
      }

      // French translation
      if (params.config.languages.includes(Language.French)) {
        const frenchTranslation = await translateTextServer(textList, Language.French)
        if (frenchTranslation.length > 0) {
          // Set the translations in the worksheet
          worksheet[`D${rowIndex}`] = { t: 's', v: frenchTranslation[0] }

          if (frenchTranslation[0].length > 30) {
            worksheet[`J${rowIndex}`] = { t: 's', v: 'French: How looong' }
          }

          if (frenchTranslation.length > 1) {
            // Set the translations in the worksheet
            worksheet[`E${rowIndex}`] = { t: 's', v: frenchTranslation[1] }
            if (frenchTranslation[1].length > 30) {
              worksheet[`J${rowIndex}`] = { t: 's', v: 'French: How looong' }
            }
          }
        } else {
          failed = true
        }
      }

      // Italian translation
      if (params.config.languages.includes(Language.Italian)) {
        const italianTranslation = await translateTextServer(textList, Language.Italian)
        if (italianTranslation.length > 0) {
          // Set the translations in the worksheet
          worksheet[`F${rowIndex}`] = { t: 's', v: italianTranslation[0] }

          if (italianTranslation[0].length > 30) {
            worksheet[`J${rowIndex}`] = { t: 's', v: 'Italian: How looong' }
          }

          if (italianTranslation.length > 1) {
            // Set the translations in the worksheet
            worksheet[`G${rowIndex}`] = { t: 's', v: italianTranslation[1] }

            if (italianTranslation[1].length > 30) {
              worksheet[`J${rowIndex}`] = { t: 's', v: 'Italian: How looong' }
            }
          }
        } else {
          failed = true
        }
      }

      // English translation
      if (params.config.languages.includes(Language.English)) {
        const englishTranslation = await translateTextServer(textList, Language.English)
        if (englishTranslation.length > 0) {
          // Set the translations in the worksheet
          worksheet[`H${rowIndex}`] = { t: 's', v: englishTranslation[0] }

          if (englishTranslation.length > 1) {
            // Set the translations in the worksheet
            worksheet[`I${rowIndex}`] = { t: 's', v: englishTranslation[1] }
          }
        } else {
          failed = true
        }
      }

      if (failed) {
        numFailed++
      } else {
        numTranslated++
      }

      params.onProgress({
        numTranslated,
        numFailed
      })
    }

    // Write worksheet data back to the Excel file
    XLSX.writeFile(params.workbook, params.fileName)

    params.onDone({
      error: null,
      numTranslated,
      numFailed,
      numTotal: numTranslated + numFailed
    })

    // Convert the translated data to CSV format
    // const csvData = `SourceLanguage,SourceText,FrenchTranslation,ItalianTranslation,EnglishTranslation\n${translatedData
    //   .map((item) => Object.values(item).join(','))
    //   .join('\n')}`

    // Write the CSV data to a new file
    // TODO: await fs.writeFile('output.csv', csvData, 'utf-8')

    // console.log('Translation completed. Results saved to output.csv', csvData)
  }
}
