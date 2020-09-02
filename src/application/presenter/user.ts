import * as entity from "@/domain/entity/index"
import * as view from "@/application/view/index"

export class UserResolver {
  private roles: view.Role[]

  constructor(roles: view.Role[]) {
    this.roles = roles
  }

  resolve(user: entity.User): view.User {
    const roles = this.roles.filter(role => user.roleIds.includes(role.id))
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: roles,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime()
    }
  }
  resolveCollection(users: entity.User[], perPage: number, cursor: number | null): view.Users {
    const res = users.map(this.resolve)
    return {
      items: res,
      count: res.length,
      nextCursor: cursor,
      perPage: perPage
    }
  }
}
