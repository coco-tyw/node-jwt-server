import * as Dotenv from "dotenv"
import * as AppRootPath from "app-root-path"
import Server from './infra/server/express'

Dotenv.config({path: AppRootPath.resolve('/.env.local')})

const {SERVER_PORT} = process.env

const app = new Server(Number(SERVER_PORT))
app.run()


