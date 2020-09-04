import Joi from 'joi'

const userSchema = Joi.object({
  email: Joi.string()
      .email()
      .required(),
  name: Joi.string().alphanum().min(3).max(30)
      .required(),
  password: Joi.string(),
  roleIds: Joi.array().items(Joi.string().alphanum())
})

export class CreateUserCommand {

  email: string
  name: string
  password: string
  roleIDs: string[]

  constructor(
    email: string, 
    name: string, 
    password: string, 
    roleIDs: string[]
  ) {
    this.email = email
    this.name = name
    this.password = password
    this.roleIDs = roleIDs
  }

  async validate() {
    const data = {
      email: this.email,
      name: this.name,
      password: this.password,
      roleIDs: this.roleIDs
    }
    const { error } = userSchema.validate(data)
    if (error) throw new Error(error.details[0].message)
    return
  }
}

export class UpdateUserCommand {

  id: string
  email: string
  name: string
  password: string
  roleIDs: string[]

  constructor(
    id: string,
    email: string,
    name: string,
    password: string,
    roleIDs: string[]
  ) {
    this.id = id
    this.email = email
    this.name = name
    this.password = password
    this.roleIDs = roleIDs
  }

  async validate() {
    const data = {
      email: this.email,
      name: this.name,
      password: this.password,
      roleIDs: this.roleIDs
    }
    const { error } = userSchema.validate(data)
    if (error) throw new Error(error.details[0].message)
    return
  }
}