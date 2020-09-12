import {Role} from '@/domain/entity/index'
import {RoleRepository, UserRepository} from '@/domain/types/repository'
import {RolePresenter, UserPresenter} from '@/application/presenter/index'
import {ErrorBadRequest} from '@/domain/entity/index'
import {RolesView, RoleView} from '@/application/types/view'

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
    systemId: string,
    name: string,
    scopeKeys: string[]
  ): Promise<RoleView> {
    const role = new Role(new Date(), systemId, name, scopeKeys)
    await this.roleRepository.create(role)
    const presenter = new RolePresenter()
    const res = presenter.resolve(role)
    return res
  }

  async getRoles(): Promise<RolesView> {
    const roles = await this.roleRepository.findAll()
    const presenter = new RolePresenter()
    const res = presenter.resolveCollection(roles, 100, null)
    return res
  }

  async getRole(id: string): Promise<RoleView> {
    const role = await this.roleRepository.findById(id)
    if (!role) {
      throw new ErrorBadRequest(404, 'resource not found')
    }
    const roleUsers = await this.getRoleUsers(id)
    const presenter = new RolePresenter()
    const res = presenter.resolve(role, roleUsers)
    return res
  }

  async updateRole(
    id: string,
    name: string,
    scopeKeys: string[]
  ): Promise<RoleView> {
    const role = await this.roleRepository.findById(id)
    if (!role) {
      throw new ErrorBadRequest(404, 'resource not found')
    }
    role.update(name, scopeKeys)
    await this.roleRepository.update(role)
    const roleUsers = await this.getRoleUsers(id)
    const presenter = new RolePresenter()
    const res = presenter.resolve(role, roleUsers)
    return res
  }

  async deleteRole(id: string) {
    const role = await this.roleRepository.findById(id)
    if (!role) {
      throw new ErrorBadRequest(404, 'resource not found')
    }
    await this.roleRepository.delete(id)
    return
  }

  async getRoleUsers(roleId: string) {
    const users = await this.userRepository.findAll()
    const presenter = new UserPresenter([])
    const res = users
      .filter(user => user.roleIDs.includes(roleId))
      .map(user => presenter.resolve(user))
    return res
  }
}
