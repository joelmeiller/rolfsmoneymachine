import axios from 'axios'
import * as XLSX from 'xlsx'
// import * as fs from 'fs/promises'
import type { TranslatorProgress, TranslatorResult } from '../types/translator'
import { Language } from '../types/enums'

// Define your DeepL API key and endpoint
const apiKey = 'YOUR_DEEPL_API_KEY'
const deepLApiEndpoint = 'https://api.deepl.com/v2/translate'
const serverDeepLApiEndpoint = 'http://localhost:5201/api/deepL/translate'

// Function to translate text using DeepL API
const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  try {
    const response = await axios.post(deepLApiEndpoint, {
      text,
      target_lang: targetLanguage,
      auth_key: apiKey
    })

    return response.data.translations[0].text
  } catch (error: any) {
    console.error(`Error translating text: ${error.message}`)
    return ''
  }
}

const translateTextServer = async (text: string, targetLanguage: string): Promise<string> => {
  try {
    const response = await axios.post(serverDeepLApiEndpoint, {
      textList: [text],
      targetLanguage
    })

    return response.data.translatedTextList[0]
  } catch (error: any) {
    console.error(`Error translating text: ${error.message}`)
    return ''
  }
}

export const TranslatorWorker = {
  run: async (params: {
    file: File
    languages: Array<Language>
    numRows: number
    onDone: (data: TranslatorResult) => void
    onProgress: (data: TranslatorProgress) => void
  }) => {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      /* Parse data */
      const bstr = e.target.result
      TranslatorWorker.processExcel({
        workbook: XLSX.read(bstr, { type: 'binary' }),
        languages: params.languages,
        numRows: params.numRows,
        onDone: params.onDone,
        onProgress: params.onProgress
      })
    }

    reader.readAsBinaryString(params.file)
  },

  processExcel: async (params: {
    workbook: XLSX.WorkBook
    languages: Array<Language>
    numRows: number
    onDone: (data: TranslatorResult) => void
    onProgress: (data: TranslatorProgress) => void
  }) => {
    // Load the Excel file and get the worksheet
    const sheetName = params.workbook.SheetNames[0] // Assuming you want to work with the first sheet
    const worksheet = params.workbook.Sheets[sheetName]

    // Initialize an empty array to store the translated data
    const translatedData: Record<string, string>[] = []

    // Loop through each row in the Excel file
    for (let rowIndex = 2; ; rowIndex++) {
      const cell = worksheet[`A${rowIndex}`] // Assuming the data starts from the second row in column A

      if (rowIndex > params.numRows || !cell || !cell.v) {
        // Break the loop when there are no more cells with data
        break
      }

      const sourceText = cell.v

      // Translate the source text into the target languages
      const frenchTranslation = await translateTextServer(sourceText, 'FR')
      const italianTranslation = await translateTextServer(sourceText, 'IT')
      const englishTranslation = await translateTextServer(sourceText, 'EN')

      // Push the translations to the translatedData array
      translatedData.push({
        SourceLanguage: 'German',
        SourceText: sourceText,
        FrenchTranslation: frenchTranslation,
        ItalianTranslation: italianTranslation,
        EnglishTranslation: englishTranslation
      })
    }

    // Convert the translated data to CSV format
    const csvData = `SourceLanguage,SourceText,FrenchTranslation,ItalianTranslation,EnglishTranslation\n${translatedData
      .map((item) => Object.values(item).join(','))
      .join('\n')}`

    // Write the CSV data to a new file
    // TODO: await fs.writeFile('output.csv', csvData, 'utf-8')

    console.log('Translation completed. Results saved to output.csv', csvData)
  }
}
