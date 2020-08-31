import Redis from "ioredis"

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
  console.error("set redis env vars!!")
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
}).catch(() => {
  console.error("can not connect to database server")
process.exit(0)
})