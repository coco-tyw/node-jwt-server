import * as entity from '@/domain/entity'
import * as repository from '@/domain/repository'
import * as view from '../view'
import * as command from '../command'
import * as presenter from '../presenter'

interface UserIF {
  userRepository: repository.UserRepository
  roleRepository: repository.RoleRepository
}

export class User implements UserIF {
  readonly userRepository: repository.UserRepository
  readonly roleRepository: repository.RoleRepository
  
  constructor(userRepository: repository.UserRepository, roleRepository: repository.RoleRepository) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
  }

  create(com: command.CreateUser): view.User {
    const user = new entity.User(new Date(), com.email, com.password, com.name, com.roleIDs)
    this.userRepository.Create(user)
    const roles = this.roleRepository.FindAll()
    const roleViews = roles.map(role => {
      return new presenter.RoleResolver().resolve(role)
    })
    const res = new presenter.UserResolver(roleViews).resolve(user)
    return res
  }
  
}
