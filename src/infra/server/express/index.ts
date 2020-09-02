import express from 'express'
import {Server} from '../index'
import router from './handler/router'

export default class implements Server {
  private app = express()
  private port: number

  constructor(port = 3000) {
    this.port = port
    router(this.app)
  }

  async run() {
    this.app.listen(this.port)
    console.debug('express server runnig')
    console.debug(`PORT: ${this.port}`)
  }
}