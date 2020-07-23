import * as entity from '@/domain/entity'
import * as domain from '@/domain/repository'

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
  }
  get() {
    
  }
  create() {

  }
  delete(id: string) {

  }
}
