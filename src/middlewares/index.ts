import {Router} from "express";
import createJoiValidator from './createJoiValidator'
import checkValidator from './checkValidator'
import apiCallMiddleware from './apiCallMiddleware'


export function applyNotFoundMiddleWare(app: Router) {
  app.all('*', (req, res) => {
    res.status(404).json({ error: 'Method is not provided' })
  })
}

export const autoForwardApiError = apiCallMiddleware.autoForwardApiError

export {
  createJoiValidator,
  checkValidator,
  apiCallMiddleware,
}


export default {
  createJoiValidator,
  checkValidator,
  apiCallMiddleware,
}