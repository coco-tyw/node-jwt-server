type User = {
  id: number
  name: string
  email: string
  password: string
}
type UserCreate = Pick<User, 'name'|'email'|'password'>

class UsersDB {
  private id = 0
  private users = [] as User[]
  
  getUsers() {
    return this.users.map(user => ({id: user.id, name: user.name, email: user.email}))
  }
  getUser(id: number) {
    return this.users.find(user => user.id === id)
  }
  
  createUser(user: UserCreate) {
    this.id++
    this.users.push({id: this.id, ...user})
  }

  deleteUser(id: number) {
    delete this.users[this.users.findIndex(user => user.id === id)]
  }
}

export {
  UsersDB
}
