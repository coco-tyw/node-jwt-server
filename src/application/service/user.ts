import {User} from '@/domain/entity/index'
import {UserRepository, RoleRepository} from '@/domain/types/repository'
import {UsersView, UserView} from '@/application/types/view'
import {UserPresenter, RolePresenter} from '@/application/presenter/index'
import {ErrorBadRequest} from '@/domain/entity/index'

export default class UserService {

  readonly userRepository: UserRepository
  readonly roleRepository: RoleRepository
  
  constructor(
    userRepository: UserRepository, 
    roleRepository: RoleRepository
  ) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
  }

  async createUser(
    email: string, 
    password: string, 
    roleIDs: string[],
    extras: {[s: string]: string}
  ): Promise<UserView> {
    const user = new User(new Date(), email, password, roleIDs, extras)
    const exist = await this.userRepository.findById(user.id)
    if (exist) {
      throw new ErrorBadRequest(409, 'already exists')
    }
    await this.userRepository.create(user)
    const presenter = await this.userPresenter()
    const res = presenter.resolve(user)
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
    if (!user) {
      throw new ErrorBadRequest(404, 'resource not found')
    }
    const presenter = await this.userPresenter()
    const res = presenter.resolve(user)
    return res
  }

  async updateUser(
    id: string,
    password: string,
    roleIDs: string[],
    extras: {[s: string]: string}
  ) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new ErrorBadRequest(404, 'resource not found')
    }
    user.update(password, roleIDs, extras)
    await this.userRepository.update(user)
    const presenter = await this.userPresenter()
    const res = presenter.resolve(user)
    return res
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new ErrorBadRequest(404, 'resource not found')
    }
    await this.userRepository.delete(id)
    return
  }

  async userPresenter(): Promise<UserPresenter> {
    const rolePresenter = new RolePresenter()
    const roles = await this.roleRepository.findAll()
        .then(roles => roles.map(role => rolePresenter.resolve(role)))
    const presenter = new UserPresenter(roles)
    return presenter
  }
}
