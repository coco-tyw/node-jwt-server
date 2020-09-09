import {Role} from "@/domain/entity/index"
import {RoleView, RolesView, UserView} from "@/application/types/view"

export default class RolePresenter {
  resolve(role: Role, users: UserView[] = []): RoleView {
    return {
      id: role.id,
      name: role.name,
      users: users,
      createdAt: role.createdAt.getTime(),
      updatedAt: role.updatedAt.getTime()
    }
  }
  resolveCollection(roles: Role[], perPage: number, cursor: number | null): RolesView {
    const res = roles.map(role => this.resolve(role))
    return {
      items: res,
      count: res.length,
      nextCursor: cursor,
      perPage: perPage
    }
  }
}
