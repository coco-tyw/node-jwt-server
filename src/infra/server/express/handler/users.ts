import {Router} from 'express'

const router = Router()

router.post('/', (req, res, next) => {
  res.send('create user')
})
router.get('/', (req, res, next) => {
  res.send('get users')
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