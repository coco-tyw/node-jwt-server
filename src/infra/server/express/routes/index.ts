import {Express, Router} from 'express'
import { Controllers } from '../..'

export default class ExpressRouter {
  private app: Express

  constructor(app: Express) {
    this.app = app
  }
  public init(controllers: Controllers) {
    const router = Router()

    router.get('/', (req, res, next) => {
      res.send('hello jwt!')
    })
    this.app.use(router)
  }
}