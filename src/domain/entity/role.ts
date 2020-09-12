export default class Role {

  id: string
  systemId: string
  name: string
  scopeKeys: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date

  constructor(
    at: Date,
    systemId: string,
    name: string,
    scopeKeys: string[]
  ) {
    this.id = `${at.getTime()}`
    this.systemId = systemId
    this.name = name
    this.scopeKeys = scopeKeys
    this.createdAt = at
    this.updatedAt = at
  }

  update(
    name: string,
    scopeKeys: string[]
  ) {
    this.name = name
    this.scopeKeys = scopeKeys
  }
}
