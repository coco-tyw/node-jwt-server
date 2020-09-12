import {User} from "@/domain/entity/index"
import {RoleView, UserView, UsersView} from "@/application/types/view"

export default class UserPresenter {
  private roles: RoleView[]

  constructor(roles: RoleView[]) {
    this.roles = roles
  }

  resolve(user: User): UserView {
    const roles = this.roles.filter(role => user.roleIDs.includes(role.id))
    return {
      id: user.id,
      roles: roles,
      extras: user.extras,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime()
    }
  }
  resolveCollection(users: User[], perPage: number, cursor: number | null): UsersView {
    const res = users.map(user => this.resolve(user))
    return {
      items: res,
      count: res.length,
      nextCursor: cursor,
      perPage: perPage
    }
  }
}
