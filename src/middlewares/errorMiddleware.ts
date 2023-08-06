export const errorMiddleware = (err, req, res, next) => {
  req.logError('[exception]', err.message)

  if (!res.finished) {
    res.status(500).send({ error: 'Server error' })
  }
}


export default errorMiddleware
