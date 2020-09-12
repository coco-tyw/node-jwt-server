import Joi from 'joi'
import {ErrorBadRequest} from '@/domain/entity/index'

const userSchema = Joi.object({
  password: Joi.string(),
  roleIDs: Joi.array().items(Joi.string().alphanum())
})

export class CreateUserCommand {

  password: string
  roleIDs: string[]

  constructor(
    password: string, 
    roleIDs: string[]
  ) {
    const { error } = userSchema.validate({password, roleIDs})
    if (error) {
      throw new ErrorBadRequest(400, error.details[0].message)
    }
    this.password = password
    this.roleIDs = roleIDs
  }
}

export class UpdateUserCommand {

  password: string
  roleIDs: string[]

  constructor(
    password: string,
    roleIDs: string[]
  ) {
    const { error } = userSchema.validate({password, roleIDs})
    if (error) {
      throw new ErrorBadRequest(400, error.details[0].message)
    }
    this.password = password
    this.roleIDs = roleIDs
  }
}