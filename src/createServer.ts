import express from 'express'
import cors from 'cors'
import addRequestId from 'express-request-id'
import robots from 'express-robots-txt'
import bodyParser from "body-parser";

interface CreateServerParams {
  parsers?: {
    json?: boolean
    urlEncoded?: boolean
    text?: boolean
    limit?: string
  }
}
function createServer(params?: CreateServerParams) {
  const { parsers } = params || {}
  const { json = true, urlEncoded, text, limit } = parsers || {}
  const app = express()

  app.set('trust proxy', 1) // it changes proxy x-forwarded-for ip as client ip

  app.use(cors('*'))
  app.use(addRequestId())

  app.use(robots({
    UserAgent: '*',
    Disallow: '/'
  }))

  if(json) {
    app.use(bodyParser.json({ limit }))
  }
  if(urlEncoded) {
    app.use(bodyParser.urlencoded({
      extended: true,
      limit,
    }))
  }

  if(text) {
    app.use(bodyParser.text({ limit }))
  }

  return app
}

export default createServer
