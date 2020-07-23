import * as entity from "@/domain/entity"
import * as view from "@/application/view"

export class RoleResolver {
  resolve(role: entity.RoleType, users: view.UserSummary[] = []): view.Role {
    return {
      id: role.id,
      name: role.name,
      users: users,
      createdAt: role.createdAt.getTime(),
      updatedAt: role.updatedAt.getTime()
    }
  }
  resolveCollection(roles: entity.RoleType[], perPage: number, cursor: number | null): view.Roles {
    const res = roles.map(role => this.resolve(role))
    return {
      items: res,
      count: res.length,
      nextCursor: cursor,
      perPage: perPage
    }
  }
}
