import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import Joi from 'joi'

export default function createJoiValidator<T = any>(schema: Joi.ObjectSchema<T>): RequestHandler {
  return async function validateMiddleware(req, res, next) {
    try {
      const validated = await schema.validateAsync(req.body, { allowUnknown: true, stripUnknown: false })
      req.body = validated
      next()
    } catch (err: any) {
      if (err.isJoi) {
        // @ts-ignore
        req.logError('[joi]:', err.details)
        return res.status(422).send({ errors: err.details })
      }
      next(createHttpError(500))
    }
  }
}
