import session from 'express-session'
import { Config } from '../config.mjs'
import createMemoryStore from 'memorystore'

// Session Memory Storage
const MemorySessionStore = createMemoryStore(session)

const _90DaysInSeconds = 90 * 24 * 60 * 60 // 90 days in seconds
const _1DayInSeconds = 24 * 60 * 60 // 1 day in seconds

export type SessionControllerActions = {
  createSessionMiddleware: () => void
  checkSessionActive: (session: any) => boolean
}

export async function SessionController(): Promise<SessionControllerActions> {
  let sessionStore = new MemorySessionStore({
    checkPeriod: _1DayInSeconds, // prune expired entries every 24h
    ttl: _90DaysInSeconds // set default ttl to 90 days
  })

  return {
    createSessionMiddleware: () =>
      session({
        store: sessionStore,
        name: Config.EXPRESS_SESSION_NAME,
        secret: [Config.EXPRESS_SESSION_SECRET], // first element encrypts, others only validate
        saveUninitialized: true,
        resave: false,
        cookie: {
          httpOnly: true,
          maxAge: 8 * 60 * 60 * 1000,
          sameSite: false,
          secure: true,
        }
      }),

    checkSessionActive: (session) => {
      return true // TODO: !!session?.authenticated
    }
  }
}
