interface ExpressError {
  error: string
  messageCustom?: string
  errorCode?: string
}


declare global {
  namespace Express {
    interface Request {
      log(...any: any[]): void
      logError(...any: any[]): void
      logError(...any: any[]): void
    }

    interface Response {
      sendError(status: number, message: string, errorCode: string): void
      sendError(status: number, message: string | ExpressError): void
      sendError(message: string | ExpressError | Error | unknown): void
    }
  }
}
