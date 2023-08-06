import './polyfill/injectExpressMethods'
export * from './lib/expressUtils'
import LogicError from './lib/LogicError'
import errorMiddleware from "./middlewares/errorMiddleware";
import createServer from './createServer';
import router from './router';
import createIPRateLimitMiddleWare from './rateLimits/createIPRateLimitMiddleWare'
export * from './middlewares'

export { LogicError, errorMiddleware, createServer, router }
export { createIPRateLimitMiddleWare }

export default createServer