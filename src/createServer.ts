import express from 'express'
import cors from 'cors'
import addRequestId from 'express-request-id'

function createServer() {
  const app = express()

  app.set('trust proxy', 1) // it changes proxy x-forwarded-for ip as client ip

  app.use(cors('*'))
  app.use(addRequestId())

  return app
}

export default createServer
