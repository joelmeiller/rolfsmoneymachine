import dotenv from 'dotenv'
import * as envalid from 'envalid'

// Set path to .env file
dotenv.config({ path: './.env' })

type EnvConfig = {
  DEEPL_API_KEY: string
  DEEPL_API_ACTIVE: boolean
  NODE_ENV: string
  PORT: number
  PUBLIC_URL: string
}

// https://github.com/af/envalid#envalidcleanenvenvironment-validators-options
export const Config = envalid.cleanEnv<EnvConfig>(process.env, {
  // DeepL API settings
  DEEPL_API_KEY: envalid.str({ default: '' }),
  DEEPL_API_ACTIVE: envalid.bool({ default: true }),

  // Node settings
  NODE_ENV: envalid.str({
    choices: ['production', 'development']
  }),
  PORT: envalid.port({ devDefault: 5201 }),
  PUBLIC_URL: envalid.url({ devDefault: 'http://localhost:5201' })
})
