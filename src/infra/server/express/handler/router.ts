import {Express} from 'express'

import root from './root'
import users from './users'

export default (app: Express) => {
  app.use('/', root)
  app.use('/users', users)
}