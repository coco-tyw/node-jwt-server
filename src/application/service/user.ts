import {User} from '@/domain/entity/index'
import {UserRepository, RoleRepository} from '@/domain/types/repository'
import {RoleView, UsersView, UserView} from '@/application/types/view'
import {UserPresenter, RolePresenter} from '@/application/presenter/index'

export default class UserService {
  readonly userRepository: UserRepository
  readonly roleRepository: RoleRepository
  
  constructor(userRepository: UserRepository, roleRepository: RoleRepository) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
  }

  static GenerateUser(
    at: Date,
    email: string,
    password: string,
    name: string,
    roleIDs: string[],
  ): User {
    const user = new User(at, email, password, name, roleIDs)
    return user
  }

  async userPresenter(): Promise<UserPresenter> {
    const roles: RoleView[] = []
    const rolePresenter = new RolePresenter()
    for (const role of await this.roleRepository.findAll()) {
      roles.push(rolePresenter.resolve(role))
    }
    const presenter = new UserPresenter(roles)
    return presenter
  }

  async createUser(
    email: string, 
    password: string, 
    name: string, 
    roleIDs: string[]
  ): Promise<UserView> {
    const user = new User(new Date(), email, password, name, roleIDs)
    await this.userRepository.create(user)
    const rolePresenter = new RolePresenter()
    const roles = await this.roleRepository.findAll()
        .then(roles => roles.map(role => {
          return rolePresenter.resolve(role)
        }))
    const res = new UserPresenter(roles).resolve(user)
    return res
  }
  
  async getUsers(): Promise<UsersView> {
    const users = await this.userRepository.findAll()
    const presenter = await this.userPresenter()
    const res = presenter.resolveCollection(users, 50, null)
    return res
  }

  async getUser(id: string) {
    const user = await this.userRepository.findById(id)
    const presenter = await this.userPresenter()
    const res = presenter.resolve(user)
    return res
  }

  UpdateUser() {

  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id)
  }
}
