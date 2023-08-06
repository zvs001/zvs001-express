import RateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import { RedisClientType } from "redis"

const timeWindowDefaultSeconds = 60 * 60 // hour

function createIPRateLimitMiddleWare(params: {
  serviceName: string
  redisClient: RedisClientType
  timeWindowMs?: number
  rateLimitMax?: number
}) {
  let { serviceName,redisClient, timeWindowMs, rateLimitMax } = params
  if(!timeWindowMs) timeWindowMs =  timeWindowDefaultSeconds * 1000
  if(!rateLimitMax) {
    rateLimitMax = timeWindowMs / 1000 // 1 request per second
  }

  const ipRateLimiter = RateLimit({
    store: new RedisStore({
      prefix: serviceName + '@ipRL@',
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
    }),
    // max: 100, // limit each IP to 100 requests per windowMs
    windowMs: timeWindowMs,
    max: rateLimitMax,
  })

  return ipRateLimiter
}


export default createIPRateLimitMiddleWare
