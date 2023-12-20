export const errorMiddleware = (err, req, res, next) => {
  console.error(err) // second handler to make sure it is visible in console. logError can be ignored in tests
  req.logError('[exception]', err.message)

  if (!res.finished) {
    res.status(500).send({ error: 'Server error' })
  }
}


export default errorMiddleware
