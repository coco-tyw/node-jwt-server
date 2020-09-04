import {User, Role} from '../entity/index'

export interface UserRepository {
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  findAll(): Promise<User[]>
  create(user: User): Promise<void>
  update(user: User): Promise<void>
  delete(id: string): Promise<void>
}

export interface RoleRepository {
  findAll(): Promise<Role[]>
  create(role: Role): Promise<void>
  update(role: Role): Promise<void>
  delete(id: string): Promise<void>
}