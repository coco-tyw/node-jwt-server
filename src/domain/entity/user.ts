import ErrorBadRequest from './error'
import bcryptjs from 'bcryptjs'

const passwordLengthMin = 8
const passwordLengthMax = 64

export default class User {
  id: string
  email: string
  name: string
  passwordHash: string
  roleIDs: string[]
  disabled: boolean = false
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date

  constructor(
    at: Date,
    email: string,
    password: string,
    name: string,
    roleIDs: string[]
  ) {
    if (password.length < passwordLengthMin || password.length > passwordLengthMax) {
      throw new ErrorBadRequest(400, 'invalid password length')
    }
    this.id = `${at.getTime()}`
    this.email = email
    this.name = name
    this.passwordHash = bcryptjs.hashSync(password, 10)
    this.roleIDs = roleIDs
    this.createdAt = at
    this.updatedAt = at
  }

  update(email: string, password: string, name: string, roleIDs: string[]) {
    this.email = email
    this.passwordHash = password
    this.name = name
    this.roleIDs = roleIDs
  }

  setRoleIds(
    at: Date,
    roleIds: string[]
  ) {
    this.roleIDs = roleIds
    this.updatedAt = at
  }

  setDisabled(
    at: Date,
    disabled: boolean
  ) {
    this.disabled = disabled
    this.updatedAt = at
  }

  archive(
    at: Date
  ) {
    this.email = `DELETED@${new Date().toString()}@${this.email}`
    this.disabled = true
    this.updatedAt = at
    this.deletedAt = at
  }
}
