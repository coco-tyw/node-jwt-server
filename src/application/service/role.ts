import {RoleRepository, UserRepository} from '@/domain/types/repository'
import {RolePresenter} from '@/application/presenter/index'
import {UserSummaryView} from '@/application/types/view'

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
  async getAll() {
    const roles = await this.roleRepository.findAll()
    const res = new RolePresenter().resolveCollection(roles, 100, null)
    return res
  }
  async get(id: string) {
    const roles = await this.roleRepository.findAll()
    const role = roles.find(role => role.id === id)
    if (!role) {
      throw new Error(`role(id: ${id}) is not found`)
    }
    let users = await this.userRepository.findAll()
    users = users.filter(user => user.roleIDs.includes(role.id))
    const userSummarys: UserSummaryView[] = users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime()
      }
    })
    const res = new RolePresenter().resolve(role, userSummarys)
    return res
  }
  create() {

  }
  delete(id: string) {

  }
}
