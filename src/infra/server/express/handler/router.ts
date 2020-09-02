import {Express} from 'express'
import morgan from 'morgan'

import root from './root'
import users from './users'

export default (app: Express) => {
  app.use(morgan('combined'))
  app.use('/', root)
  app.use('/users', users)
}