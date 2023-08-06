import { RequestHandler } from 'express'
import LogicError from "../lib/LogicError";
import { AxiosError } from 'axios'


export function autoForwardApiError<HandlerType extends RequestHandler<any, any, any, any, any>>(fn: HandlerType): HandlerType {
  const handlerProxy: any = async (req, res, next) => {
    try {
      await fn(req, res, next)
    }
      // @ts-ignore
    catch (e: AxiosError) {
      const { data, status } = e?.response || {}
      if (data?.errorCode) {
        const logicErr = new LogicError({ errorCode: data.errorCode, message: data.message, httpStatus: status })
        return res.sendError(logicErr)
      }
      return res.sendError(e)
    }
  }

  return handlerProxy
}

export default {
  autoForwardApiError,
}
