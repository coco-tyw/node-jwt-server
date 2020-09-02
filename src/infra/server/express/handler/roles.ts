import {Router} from 'express'

const router = Router()

router.post('/', (req, res, next) => {
  res.send('create role')
})
router.get('/', (req, res, next) => {
  res.send('get roles')
})
router.get('/:id', (req, res, next) => {
  res.send('get role')
})
router.put('/:id', (req, res, next) => {
  res.send('update role')
})
router.delete('/:id', (req, res, next) => {
  res.send('delete role')
})