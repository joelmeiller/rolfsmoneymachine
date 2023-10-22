import dotenv from 'dotenv'
import * as envalid from 'envalid'

// Set path to .env file
dotenv.config({ path: './.env' })

type EnvConfig = {
  DEEPL_API_KEY: string
  DEEPL_API_ACTIVE: boolean
  NODE_ENV: string
  PORT: number
  EXPRESS_SESSION_NAME: string
  EXPRESS_SESSION_SECRET: string
  USERNAME: string
  PASSWORD: string
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

  // Express session
  EXPRESS_SESSION_NAME: envalid.str({ default: 'rolfs-money-machine' }),
  EXPRESS_SESSION_SECRET: envalid.str({ default: 'G8qLOJVK*HcfIvL8T8Pg' }),

  // Authentication
  USERNAME: envalid.str({ default: 'Rolf' }),
  PASSWORD: envalid.str({ devDefault: '1234' })
})
