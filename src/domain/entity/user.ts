const passwordLengthMin = 8
const passwordLengthMax = 64

export default class User {
  id: string
  email: string
  name: string
  passwordHash: string
  roleIds: string[]
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
      throw new Error('invalid password length')
    }
    this.id = at.toString()
    this.email = email
    this.name = name
    this.passwordHash = password
    this.roleIds = roleIDs
    this.createdAt = at
    this.updatedAt = at
  }

  setRoleIds(
    at: Date,
    roleIds: string[]
  ) {
    this.roleIds = roleIds
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
