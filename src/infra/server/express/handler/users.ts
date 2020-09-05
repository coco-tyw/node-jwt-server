import {Router} from 'express'
import {UserRepository, RoleRepository} from '@/infra/store/memory/index'
import {CreateUserCommand} from '@/application/command/index'
import {UserService} from '@/application/service/index'

const router = Router()
const userService = new UserService(new UserRepository(), new RoleRepository())

router.post('/', async (req, res, next) => {
  const com = new CreateUserCommand(
    'sample@example.com', 
    'sample', 
    'password', 
    []
  )
  try {
    await com.validate()
    const user = await userService.createUser(
      com.email, 
      com.password, 
      com.name, 
      com.roleIDs 
    )
    res.json(user)
  } catch (error) {
    res.send(error.message)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getUsers()
    res.json(users)
  } catch (error) {
    res.send(error.message)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id)
    res.json(user)
  } catch (error) {
    res.send(error.message)
  }
})
router.put('/:id', (req, res, next) => {
  res.send('update user')
})
router.delete('/:id', async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id)
    res.send('delete user')
  } catch(error) {
    res.send('failed to delete user')
  }
})

export default router