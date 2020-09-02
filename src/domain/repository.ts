import * as entity from './entity/index'

export interface UserRepository {
  findByEmail(email: string): Promise<entity.User>
  findById(id: string): Promise<entity.User>
  findAll(): Promise<entity.User[]>
  create(user: entity.User): Promise<void>
  update(user: entity.User): Promise<void>
  delete(id: string): Promise<void>
}

export interface RoleRepository {
  findAll(): Promise<entity.Role[]>
  create(role: entity.Role): Promise<void>
  update(role: entity.Role): Promise<void>
  delete(id: string): Promise<void>
}
