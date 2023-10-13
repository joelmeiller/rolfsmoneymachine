import dotenv from 'dotenv'
import * as envalid from 'envalid'

// Set path to .env file
dotenv.config({ path: './.env' })

type EnvConfig = {
  NODE_ENV: string
  PORT: number
  PUBLIC_URL: string
  DEEPL_API_KEY: string
}

// https://github.com/af/envalid#envalidcleanenvenvironment-validators-options
export const Config = envalid.cleanEnv<EnvConfig>(process.env, {
  // Node settings
  NODE_ENV: envalid.str({
    choices: ['production', 'stage', 'test', 'development']
  }),
  PORT: envalid.port({ devDefault: 3001 }),

  PUBLIC_URL: envalid.url({ devDefault: 'http://localhost:5000' }),

  DEEPL_API_KEY: envalid.str({ default: '' })
})
