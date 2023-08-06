import { Request } from 'express'

export function getClientIP(req: Request): string | undefined {
  const proxyIp = req.headers['x-forwarded-for'] as (string | undefined)
  let ip = proxyIp || req.socket.remoteAddress
  return ip
}

export default {
  getClientIP,
}
