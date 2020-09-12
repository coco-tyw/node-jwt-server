import {User, Role, Scope} from '../entity/index'

export interface UserRepository {
  create(user: User): Promise<void>
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | undefined>
  findByExtra(key: string, value: string): Promise<User | undefined>
  update(user: User): Promise<void>
  delete(id: string): Promise<void>
}

export interface RoleRepository {
  create(role: Role): Promise<void>
  findAll(): Promise<Role[]>
  findById(id: string): Promise<Role | undefined>
  update(role: Role): Promise<void>
  delete(id: string): Promise<void>
}