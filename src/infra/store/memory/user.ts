import {UserRepository as UserRepo} from '@/domain/types/repository'
import {User} from '@/domain/entity/index'

export default class UserRepository implements UserRepo {

  private users: User[] = []

  async create(user: User) {
    this.users.push(user)
    return
  }

  async findAll() {
    return this.users
  }

  async findById(id: string) {
    const user = this.users.find(user => user.id === id)
    return user
  }
  
  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email)
    return user
  }

  async update(user: User) {
    const index = this.users.findIndex(u => u.id === user.id)
    this.users.splice(index, 1, user)
    return
  }

  async delete(id: string) {
    const index = this.users.findIndex(user => user.id === id)
    this.users.splice(index, 1)
  }

}