import {Router} from "express";
import createJoiValidator from './createJoiValidator'
import checkValidator from './checkValidator'
import apiCallMiddleware from './apiCallMiddleware'
import errorMiddleware from "./errorMiddleware"

export function applyNotFoundMiddleWare(app: Router) {
  app.all('*', (req, res) => {
    res.status(404).json({ error: 'Method is not provided' })
  })
}

export function applyPostMiddleWares(app: Router) {
  applyNotFoundMiddleWare(app)
  app.use(errorMiddleware)
}

export const autoForwardApiError = apiCallMiddleware.autoForwardApiError

export {
  createJoiValidator,
  checkValidator,
  apiCallMiddleware,
  errorMiddleware,
}


export default {
  createJoiValidator,
  checkValidator,
  apiCallMiddleware,
  errorMiddleware,
}