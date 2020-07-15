import * as entity from "@/domain/entity"
import * as view from "@/application/view"

export class UserResolver {
  private roles: entity.Role[]
  constructor(roles: entity.Role[]) {
    this.roles = roles
  }

  resolve(user: entity.User): view.User {
    const roles = this.roles.filter(role => user.RoleIDs.includes(role.ID))
    roles.forEach(role => {
      delete role.DeletedAt
    })
    return {
      ID: user.ID,
      Name: user.Name,
      Email: user.Email,
      Roles: roles,
      CreatedAt: user.CreatedAt,
      UpdatedAt: user.UpdatedAt
    }
  }
  resolveCollection(users: entity.User[], perPage: number, cursor: number): view.Users {
    const res = users.map(this.resolve)
    return {
      Items: res,
      Count: res.length,
      NextCursor: cursor,
      PerPage: perPage
    }
  }
}
