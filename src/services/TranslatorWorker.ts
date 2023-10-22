import axios from 'axios'
import * as XLSX from 'xlsx'
import { Language } from '../types/enums'
import type { TranslatorConfig, TranslatorProgress, TranslatorResult } from '../types/translator'

export const serverDeepLApiEndpoint = `${import.meta.env.VITE_API_URL}/deepL`
// const serverDeepLApiEndpoint = 'https://rolfs-money-machine.onrender.com/api/deepL/translate'

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const translateTextServer = async (
  textList: Array<string>,
  targetLanguage: string
): Promise<Array<string>> => {
  try {
    const response = await axios.post(`${serverDeepLApiEndpoint}/translate`, {
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

    // Shift rows after english description (I) 1 column to the right
    // TODO: XLSX.utils.sheet_shift(worksheet, 0, 1, 1)

    // Initialize counters
    let numTranslated = 0
    let numFailed = 0

    // Loop through each row in the Excel file and get the source texts
    for (let rowIndex = params.config.startRow; ; rowIndex++) {
      const cellB = worksheet[`B${rowIndex}`]
      const cellC = worksheet[`C${rowIndex}`]
      let failed = false
      let languagesTooLong = []

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
            languagesTooLong.push(Language.French)
          }

          if (frenchTranslation.length > 1) {
            // Set the translations in the worksheet
            worksheet[`E${rowIndex}`] = { t: 's', v: frenchTranslation[1] }
            if (frenchTranslation[1].length > 30) {
              languagesTooLong.push(Language.French)
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
            languagesTooLong.push(Language.Italian)
          }

          if (italianTranslation.length > 1) {
            // Set the translations in the worksheet
            worksheet[`G${rowIndex}`] = { t: 's', v: italianTranslation[1] }

            if (italianTranslation[1].length > 30) {
              languagesTooLong.push(Language.Italian)
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
          if (englishTranslation[0].length > 30) {
            languagesTooLong.push(Language.English)
          }

          if (englishTranslation.length > 1) {
            // Set the translations in the worksheet
            worksheet[`I${rowIndex}`] = { t: 's', v: englishTranslation[1] }
            if (englishTranslation[0].length > 30) {
              languagesTooLong.push(Language.English)
            }
          }
        } else {
          failed = true
        }
      }

      if (languagesTooLong.length > 0) {
        worksheet[`J${rowIndex}`] = { t: 's', v: languagesTooLong.join(', ') }
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
  },

  usage: async (): Promise<{ count: number; limit: number }> => {
    try {
      const response = await axios.get(`${serverDeepLApiEndpoint}/usage`)
      console.log('USAGE', response)

      return {
        count: response.data.usage.character.count,
        limit: response.data.usage.character.limit
      }
    } catch (error: any) {
      console.error(`Error getting usage: ${error.error}`)
      return {
        count: 0,
        limit: 0
      }
    }
  }
}
