import * as Dotenv from "dotenv"
import * as AppRootPath from "app-root-path"
import ExpressServer from './infra/server/express'

Dotenv.config({path: AppRootPath.resolve('/.env.local')})

const {SERVER_PORT} = process.env

const app = new ExpressServer(Number(SERVER_PORT), {user: {}})
app.run()


