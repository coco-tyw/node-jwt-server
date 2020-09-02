import {UserRepository} from '@/domain/repository'
import {User as UserEntity} from '@/domain/entity/index'

export default class User implements UserRepository {

  private users: UserEntity[] = []

  async create(user: UserEntity) {
    const exist = this.users.find(u => u.id === user.id)
    if (exist) throw new Error('already exists')
    this.users.push(user)
    return
  }

  async findAll() {
    return Promise.resolve(this.users)
  }

  async findById(id: string) {
    const user = this.users.find(user => user.id === id)
    if (!user) throw new Error('resouce not fount');
    return user
  }
  
  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email)
    if (!user) throw new Error('rosouce not fount')
    return user
  }

  async update(user: UserEntity) {
    const index = this.users.findIndex(u => u.id === user.id)
    if (!index) throw new Error('resouce not found')
    this.users.splice(index, 1, user)
    return
  }

  async delete(id: string) {
    const index = this.users.findIndex(user => user.id === id)
    if (!index) throw new Error('resouce not found')
    this.users.splice(index, 1)
  }

}