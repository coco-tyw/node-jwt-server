import * as entity from './entity'

export interface UserRepository {
  FindByEmail(email: string): entity.User
  FindById(id: string): entity.User
  FindAll(): entity.User[]
  Create(user: entity.User): void
  Update(runner: any, user: entity.User): void
}

export interface RoleRepository {
  FindAll(): entity.Role[]
  Create(user: entity.User): void
  Delete(id: string): void
}
