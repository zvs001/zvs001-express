import colors from 'colors'
import _ from 'lodash'
import morgan from 'morgan'
import logger from '../../lib/logger'
import {Request, Response} from "express"

const createRequestLogger = (options?: {
  getAppInfo?: (req: Request, res: Response) => string
  getUserInfo?: (req: Request, res: Response) => string
  shouldIgnore?: (req: Request, res: Response, url: string) => boolean
  prepareMessage?: (req: Request, res: Response, messageArr: string[]) => string[]
}) => {
  const { getAppInfo, getUserInfo, shouldIgnore, prepareMessage } = options || {}

  return morgan((tokens, req, res) => {
    const { id } = req
    const method = tokens.method(req, res)
    const url = tokens.url(req, res)

    if (shouldIgnore?.(req, res, url)) return null

    let body = ''

    if (method === 'POST' || method === 'PUT') {
      const _body = {}
      _.keys(req.body).forEach(key => {
        let value = req.body[key]
        if (_.isString(value)) {
          if (key === 'password') value = value.replace(/./g, '*')

          // if (value.length > 100) value = `${value.substring(0, 90)} ...`
        }

        _body[key] = value
      })

      body = JSON.stringify(_body)
      if (body.length > 10000) body = `${body.substring(0, 990)} ... l:${body.length}`
    }

    let status: number | string = parseInt(tokens.status(req, res))

    if (status >= 200 && status < 300) {
      status = colors.green(status.toString())
    }

    if (status as number >= 400 && status) {
      status = colors.red(status.toString())
    }

    let length = tokens.res(req, res, 'content-length')

    if (length) {
      length += ':bytes'
    }

    let userInfo = getUserInfo ? getUserInfo(req, res) : ''
    let appInfo = getAppInfo ? getAppInfo(req, res) : ''

    // const app = [req.headers['app-version']]
    // let _app = _.compact(app).join(':')
    // if (_app) _app = `[app:${_app}]`

    let message = [
      colors.cyan('[API]'),
      id,
      method.length === 3 ? `${method} ` : method,
      url,
      colors.cyan(appInfo),
      colors.cyan(userInfo),
      body,
      status,
      length,
      `${tokens['response-time'](req, res)}ms`,
    ]

    if(prepareMessage) message = prepareMessage(req, res, message)

    const messageStr = _.compact(message).join(' ')

    if (!status && !length) {
      logger.error(messageStr)
    } else {
      logger.log('', messageStr) // to keep same as error
    }
  })
}

export default createRequestLogger
