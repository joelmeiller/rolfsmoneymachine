import compression from 'compression'
import { dirname } from 'dirname-filename-esm'
import type { Request } from 'express'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { Config } from './config.mjs'
import { DeepLController } from './controllers/DeepLController.mjs'

const __dirname = dirname(import.meta)
const indexPath = path.resolve(__dirname, '../../build', 'index.html')

morgan.token('nmethod', function (req) {
  return req.method.length === 3 ? `${req.method} ` : req.method
})

// Start Express server
startServer()

// Define Express server
async function startServer() {
  // Create express server application
  const app = express()

  // https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
  app.use(
    morgan('[:date[web]] :nmethod :status :url - :response-time ms', {
      skip: (req: Request) =>
        req.originalUrl.startsWith('/health') ||
        req.originalUrl.startsWith('/favicon') ||
        req.originalUrl.startsWith('/manifest') ||
        req.originalUrl.startsWith('/static') ||
        req.originalUrl.startsWith('/assets') ||
        req.originalUrl.startsWith('/css'),
    }),
  )
  app.use(compression())

  // DeepL services
  const deepLController = DeepLController()
  app.get(deepLController.translatePath, deepLController.translate)

  // https://expressjs.com/en/api.html#express.json
  app.use(express.json())

  // Config

  // Health check
  app.get(
    '/health/ready',
    (_req, res) => res.send('healthy'), // used by Kubernetes to decide when the application is ready to receive traffic
  )

  // https://expressjs.com/en/starter/static-files.html
  app.use(express.static('build'))

  // https://expressjs.com/en/5x/api.html#res.sendFile
  app.get('*', (_req, res) => res.sendFile(indexPath))

  // Start server and listen on configured port
  app.listen(Config.PORT)

  // Log server start
  const Log = { Reset: '\x1b[0m', Start: '\x1b[' }
  const logStyleStr = `${Log.Start}37;44;1m%s${Log.Reset}`

  console.log(
    logStyleStr,
    ` 🌸 🧚🏻‍♀️ 🌺 Backend for Frontend available (BfF) at port ${Config.PORT} under ${Config.PUBLIC_URL} 🌼 🐉 🌻 `,
  )
  console.log('')
}
