import ErrorBadRequest from './error'
import bcryptjs from 'bcryptjs'

export default class User {

  id: string
  systemId: string
  passwordHash: string // このシステム使う場合はユーザーグループごとに権限ふる時だからさすがにpasswordは必須項目だよねって感じ
  roleIDs: string[]
  extras: {[s: string]: string} // application固有の付加情報用
  createdAt: Date
  updatedAt: Date

  constructor(
    at: Date,
    systemId: string,
    password: string,
    roleIDs: string[],
    extras: {[s: string]: string}
  ) {
    this.id = `${at.getTime()}`
    this.systemId = systemId
    this.passwordHash = bcryptjs.hashSync(password, 10)
    this.roleIDs = roleIDs
    this.extras = extras
    this.createdAt = at
    this.updatedAt = at
  }

  update(password: string, roleIDs: string[], extras = {}) {
    this.passwordHash = password
    this.roleIDs = roleIDs
    this.extras = extras
  }

  setRoleIds(
    at: Date,
    roleIds: string[]
  ) {
    this.roleIDs = roleIds
    this.updatedAt = at
  }
}
