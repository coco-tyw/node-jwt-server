import {Router} from 'express'
import {UserRepository, RoleRepository} from '@/infra/store/memory/index'
import {CreateUserCommand} from '@/application/command/index'
import {UserService} from '@/application/service/index'

const router = Router()
const userService = new UserService(new UserRepository(), new RoleRepository())

router.post('/', (req, res, next) => {
  const createUsreCommand = new CreateUserCommand('email', 'name', 'password', ['roleId'])
  try {
    createUsreCommand.validate()
  } catch (error) {
    res.send(error.message)
  }
  res.send('create user')
})

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getUsers()
    res.json(users)
  } catch (error) {
    res.send(error.message)
  }
  
  
})
router.get('/:id', (req, res, next) => {
  res.send('get user')
})
router.put('/:id', (req, res, next) => {
  res.send('update user')
})
router.delete('/:id', (req, res, next) => {
  res.send('delete user')
})

export default router