import * as domain from '@/domain/repository'
import * as presenter from '../presenter'
import * as view from '../view'

interface RoleIF {
  roleRepository: domain.RoleRepository
  userRepository: domain.UserRepository
}

export class Role implements RoleIF {
  roleRepository: domain.RoleRepository
  userRepository: domain.UserRepository
  constructor(
    roleRepository: domain.RoleRepository,
    userRepository: domain.UserRepository
  ) {
    this.roleRepository = roleRepository
    this.userRepository = userRepository
  }
  getAll() {
    const roles = this.roleRepository.FindAll()
    const res = new presenter.RoleResolver().resolveCollection(roles, 100, null)
    return res
  }
  get(id: string) {
    const roles = this.roleRepository.FindAll()
    const role = roles.find(role => role.id === id)
    if (!role) {
      throw new Error(`role(id: ${id}) is not found`)
    }
    let users = this.userRepository.FindAll()
    users = users.filter(user => user.roleIds.includes(role.id))
    const userSummarys: view.UserSummary[] = users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime()
      }
    })
    const res = new presenter.RoleResolver().resolve(role, userSummarys)
    return res
  }
  create() {

  }
  delete(id: string) {

  }
}
