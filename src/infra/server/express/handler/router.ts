import {Express} from 'express'

import root from './root'
import users from './users'
import auth from './auth'

export default (app: Express) => {
  app.use('/', root)
  app.use('/', auth)
  app.use('/users', users)
}