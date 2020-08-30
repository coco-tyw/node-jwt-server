import Redis from "ioredis"
import * as Dotenv from "dotenv"
import * as AppRootPath from "app-root-path"

Dotenv.config({path: AppRootPath.resolve('/.env.local')})

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
  console.error("set env file!!")
  process.exit(0)
}

const options = {
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  lazyConnect: true
} as Redis.RedisOptions

const redis = new Redis(options)

redis.connect().then(async () => {
  console.log(await redis.get("key"))
})
