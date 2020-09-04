export default class Role {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date

  constructor(at: Date, name: string) {
    this.id = at.toString()
    this.name = name
    this.createdAt = at
    this.updatedAt = at
  }
}
