import * as entity from "@/domain/entity/index"
import * as view from "@/application/view/index"

export class RoleResolver {
  resolve(role: entity.Role, users: view.UserSummary[] = []): view.Role {
    return {
      id: role.id,
      name: role.name,
      users: users,
      createdAt: role.createdAt.getTime(),
      updatedAt: role.updatedAt.getTime()
    }
  }
  resolveCollection(roles: entity.Role[], perPage: number, cursor: number | null): view.Roles {
    const res = roles.map(role => this.resolve(role))
    return {
      items: res,
      count: res.length,
      nextCursor: cursor,
      perPage: perPage
    }
  }
}
