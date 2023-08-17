import { validationResult } from 'express-validator'

export function checkValidator(req, res, next) {
  const validation = validationResult(req)
  if (validation.isEmpty()) return next()

  return res.sendError(422, {
    validator: validation.array(),
    error: 'Validation Error',
  })
}

export default checkValidator
