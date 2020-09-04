import {User} from "@/domain/entity/index"
import {RoleView, UserView, UsersView} from "@/application/types/view"

export default class UserPresenter {
  private roles: RoleView[]

  constructor(roles: RoleView[]) {
    this.roles = roles
  }

  resolve(user: User): UserView {
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
  resolveCollection(users: User[], perPage: number, cursor: number | null): UsersView {
    const res = users.map(this.resolve)
    return {
      items: res,
      count: res.length,
      nextCursor: cursor,
      perPage: perPage
    }
  }
}
