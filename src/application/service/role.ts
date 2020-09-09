import {Role} from '@/domain/entity/index'
import {RoleRepository, UserRepository} from '@/domain/types/repository'
import {RolePresenter, UserPresenter} from '@/application/presenter/index'
import {ErrorBadRequest} from '@/domain/entity/index'

export default class RoleService {

  roleRepository: RoleRepository
  userRepository: UserRepository

  constructor(
    roleRepository: RoleRepository,
    userRepository: UserRepository
  ) {
    this.roleRepository = roleRepository
    this.userRepository = userRepository
  }

  async createRole(
    name: string
  ) {
    const role = new Role(new Date(), name)
    const roles = await this.roleRepository.findAll()

    const exist = roles.find(_role => _role.name === role.name)
    if (exist) throw new ErrorBadRequest(409, 'already exists')
    await this.roleRepository.create(role)

    const presenter = new RolePresenter()
    const res = presenter.resolve(role)

    return res
  }

  async getRoles() {
    const roles = await this.roleRepository.findAll()
    const presenter = new RolePresenter()
    const res = presenter.resolveCollection(roles, 100, null)
    return res
  }

  async getRole(id: string) {
    const roles = await this.roleRepository.findAll()
    const role = roles.find(role => role.id === id)
    if (!role) {
      throw new ErrorBadRequest(404, 'resource not found')
    }
    const users = await this.userRepository.findAll()
    const rolePresenter = new RolePresenter()
    const userPresenter = new UserPresenter([])
    const roleUsers = users
        .filter(user => user.roleIDs.includes(id))
        .map(user => userPresenter.resolve(user))
    const res = rolePresenter.resolve(role, roleUsers)
    return res
  }

  delete(id: string) {

  }
}
