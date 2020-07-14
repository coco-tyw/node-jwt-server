import Redis from "ioredis"
import * as Dotenv from "dotenv"
import * as AppRootPath from "app-root-path"

Dotenv.config({path: AppRootPath.resolve('/.env.local')})

const options = {
  ...(() => process.env.REDIS_PORT ? {port: process.env.REDIS_PORT} : {} )(),
  ...(() => process.env.REDIS_HOST ? {host: process.env.REDIS_HOST} : {} )(),
  lazyConnect: true
} as Redis.RedisOptions

const redis = new Redis(options)

redis.connect().then(async () => {
  console.log(await redis.get("key"))
})
