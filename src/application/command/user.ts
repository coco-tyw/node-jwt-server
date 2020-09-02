import {UserRepository} from '@/domain/repository'
import * as Entity from '@/domain/entity/index'
import Joi from 'joi'

const createUserSchema = Joi.object({
  email: Joi.string()
      .email()
      .required(),
  name: Joi.string().alphanum().min(3).max(30)
      .required(),
  password: Joi.string(),
  repeat_password: Joi.ref('password'),
  roleIds: Joi.array().items(Joi.string().alphanum())
})

export default class User {

  readonly userRepository: UserRepository
  
  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo
  }

  async createUser(
    email: string, 
    name: string, 
    password: string,
    repeat_password: string,
    roleIDs: string[]
  ) {
    const value: any = await createUserSchema.validate({email, name, password, repeat_password, roleIDs})
    if (value.error) throw new Error(value.error.details[0].message)
  }

  readUser(id: string) {

  }

  updateUser(
    id: string, 
    email: string, 
    password: string, 
    roleIDs: string[]
  ) {

  }

  deleteUser(id: string) {

  }
}