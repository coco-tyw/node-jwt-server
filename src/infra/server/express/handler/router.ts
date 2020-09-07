import {Express} from 'express'
import {UserRepository, RoleRepository} from '@/infra/store/memory/index'
import AuthHandler from './auth'
import UsersHandler from './users'

export default (app: Express) => {

  const userRepository = new UserRepository()
  const roleRepository = new RoleRepository()

  const authHandler = new AuthHandler(userRepository)
  const usersHandler = new UsersHandler(userRepository, roleRepository)

  app.post('/signin', authHandler.postSignin.bind(authHandler))
  app.post('/users', usersHandler.postUser.bind(usersHandler))
  app.get('/users', usersHandler.getUsers.bind(usersHandler))
  app.get('/users/:id', usersHandler.getUser.bind(usersHandler))
  app.put('/users/:id', usersHandler.putUser.bind(usersHandler))
  app.delete('/users/:id', usersHandler.deleteUser.bind(usersHandler))
}