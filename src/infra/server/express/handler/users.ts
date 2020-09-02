import {Router} from 'express'
import {User as UserRepository} from '@/infra/store/memory/index'
import {User as UserCommand} from '@/application/command/index'

const router = Router()
const userCommand = new UserCommand(new UserRepository)

router.post('/', (req, res, next) => {
  res.send('create user')
})
router.get('/', async (req, res, next) => {
  try {
    await userCommand.createUser('email', 'name', 'password', 'password', ['roleId'])
    res.send('get users')
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