import * as entity from '@/domain/entity/index'
import * as repository from '@/domain/repository'
import * as view from '../view/index'
import * as presenter from '../presenter/index'

export class User {
  readonly userRepository: repository.UserRepository
  readonly roleRepository: repository.RoleRepository
  
  constructor(userRepository: repository.UserRepository, roleRepository: repository.RoleRepository) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
  }

  static GenerateUser(
    at: Date,
    email: string,
    password: string,
    name: string,
    roleIDs: string[],
  ): entity.User {
    const user = new entity.User(at, email, password, name, roleIDs)
    return user
  }

  async userResolver(): Promise<presenter.UserResolver> {
    const roles: view.Role[] = []
    const roleResolver = new presenter.RoleResolver()
    for (const role of await this.roleRepository.findAll()) {
      roles.push(roleResolver.resolve(role))
    }
    const resolver = new presenter.UserResolver(roles)
    return resolver
  }

  async createUser(email: string, password: string, name: string, roleIDs: string[]): Promise<view.User> {
    const user = new entity.User(new Date(), email, password, name, roleIDs)
    await this.userRepository.create(user)
    const roleResolver = new presenter.RoleResolver()
    const roles = await this.roleRepository.findAll()
        .then(roles => roles.map(role => {
          return roleResolver.resolve(role)
        }))
    const res = new presenter.UserResolver(roles).resolve(user)
    return res
  }
  
  async getUsers(): Promise<view.Users> {
    const users = await this.userRepository.findAll()
    const resolver = await this.userResolver()
    const res = resolver.resolveCollection(users, 50, null)
    return res
  }

  async getUser(id: string) {
    const user = await this.userRepository.findById(id)
    const resolver = await this.userResolver()
    const res = resolver.resolve(user)
    return res
  }

  UpdateUser() {

  }

  DeleteUser() {

  }
}
