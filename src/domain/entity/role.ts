export type RoleT = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface RoleIF extends RoleT {}

export class Role implements RoleIF {
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
