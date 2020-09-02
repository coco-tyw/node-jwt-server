import Server from './infra/server/express/index'

require('dotenv').config(process.cwd(), '.env.local')

const {SERVER_PORT} = process.env

const app = new Server(Number(SERVER_PORT) || 8888)
app.run()


