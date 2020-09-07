import express, {ErrorRequestHandler} from 'express'
import {Server} from '../index'
import morgan from 'morgan'
import router from './handler/router'
import helmet from 'helmet'
import {ErrorBadRequest} from '@/domain/entity/index'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ErrorBadRequest) {
    res.json({
      code: err.code,
      message: err.message
    })
  } else {
    console.log(err)
    res.json({
      code: 500,
      message: 'internal server error!!'
    })
  }
}

export default class implements Server {
  private app = express()
  private port: number

  constructor(port = 3000) {
    this.port = port
    this.app.use(morgan('combined'))
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }));
    router(this.app)
    this.app.use(errorHandler)
  }

  async run() {
    this.app.listen(this.port)
    console.debug('express server runnig')
    console.debug(`PORT: ${this.port}`)
  }
}