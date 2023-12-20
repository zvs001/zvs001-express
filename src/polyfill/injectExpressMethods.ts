import colors from 'colors'
import express from 'express'
import _ from 'lodash'
import logger from '../lib/logger'
import LogicError from '../lib/LogicError'

const isTest = process.env.NODE_ENV === 'test'

// @ts-ignore
express.request.log = function (...args) {
  // @ts-ignore
  logger.log('', colors.cyan('[LOG]'), this.id, ...args)// extra space to make it same as erors
}

// @ts-ignore
express.request.logError = function (...args) {
  // this method is designed to be used as custom error handler, like validation ,etc.
  if (isTest) return null

  // @ts-ignore
  logger.error(colors.cyan('[LOG]'), this.id, ...args)
}

interface ExpressError {
  error: string
  messageCustom?: string
  errorCode?: string
}
// @ts-ignore
express.response.sendError = function (status: string | number | ExpressError | typeof LogicError, message: string | ExpressError, errorCode?: string) {
  if (!message) {
    message = status as string | ExpressError
    status = 400
  }

  let responseData: ExpressError
  if (_.isObject(message)) {
    if (message instanceof Error) {
      // @ts-ignore
      if (message.isLogicError) {
        errorCode = message.errorCode
        // @ts-ignore
        if (message.httpStatus) status = message.httpStatus
        message = message.message
      } else {
        const internalError = 'res.sendError accepts only LogicError class for errors. This is necessary for security issues.'
        if (this.req) this.req.logError(internalError)
        else console.error(internalError)

        status = 500
        message = 'Server Problem!'
      }
    } else {
      responseData = message
    }
  } else {
    responseData = { error: message }
  }

  if (_.isString(message)) responseData = { error: message }

  if (errorCode) { // @ts-ignore
    responseData.errorCode = errorCode
  }

  this.status(status as number)
  // @ts-ignore
  this.req?.logError(colors.red('res#sendError:'), JSON.stringify(responseData))

  // @ts-ignore
  return this.send(_.isEmpty(responseData) ? message : responseData)
}
