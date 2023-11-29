
Express with minimal shared setup. Also includes some shared middlewares

[![npm](https://img.shields.io/npm/v/@zvs001/express)](https://www.npmjs.com/package/@zvs001/express)


## Install

``yarn add @zvs001/express``

## Usage

Configure server
```typescript
import { createServer, createIPRateLimitMiddleWare, createRequestLogger } from '@zvs001/express'
import bodyParser from 'body-parser'
import redisClient from '@libs/redis'

const isTest = process.env.NODE_ENV === 'test'

function createAppServer() {
  const app = createServer()

  app.use(bodyParser.json())

  if (!isTest) app.use(createRequestLogger())

  app.use([
    createIPRateLimitMiddleWare({
      serviceName: 'my-service',
      redisClient,
    }),
  ])

  return app
}

export default createAppServer
```


Apply server
```typescript
import { applyPostMiddleWares } from '@zvs001/express/src/middlewares'
import adminRouter from './api/admin/router'
import createServer from './lib/express/createServer'

const server = createServer()

server.use('/admin', adminRouter)

applyPostMiddleWares(server)
```
