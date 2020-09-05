import {RoleRepository as RoleRepo} from '@/domain/types/repository'
import {Role} from '@/domain/entity/index'

export default class RoleRepository implements RoleRepo {

  private roles: Role[] = []

  async create(role: Role) {
    const exist = this.roles.find(u => u.id === role.id)
    if (exist) throw new Error('already exists')
    this.roles.push(role)
    return
  }

  async findAll() {
    return Promise.resolve(this.roles)
  }

  async update(role: Role) {
    const index = this.roles.findIndex(u => u.id === role.id)
    if (!index) throw new Error('resource not found')
    this.roles.splice(index, 1, role)
    return
  }

  async delete(id: string) {
    const index = this.roles.findIndex(role => role.id === id)
    if (!index) throw new Error('resource not found')
    this.roles.splice(index, 1)
  }

}