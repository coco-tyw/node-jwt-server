import express from 'express'
import {Server, Controllers} from '..'
import Router from './routes'

export default class ExpressServer implements Server {
  private app = express()
  private port: number

  constructor(port = 3000, controllers: Controllers) {
    this.port = port
    new Router(this.app).init(controllers)
  }

  async run() {
    this.app.listen(this.port)
    console.debug('express server runnig')
    console.debug(`PORT: ${this.port}`)
  }
}