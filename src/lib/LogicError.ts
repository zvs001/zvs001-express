class LogicError extends Error {
  errorCode: string

  httpStatus: number

  isLogicError = true

  constructor(params: { message: string; errorCode: string; httpStatus?: number }) {
    super(params.message)
    this.errorCode = params.errorCode
    this.httpStatus = params.httpStatus || 400
  }
}

export default LogicError
