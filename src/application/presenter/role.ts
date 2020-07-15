import * as entity from "@/domain/entity"
import * as view from "@/application/view"

export class RoleResolver {
  private users: entity.User[]
  constructor(users: entity.User[]) {
    this.users = users
  }

  resolve(role: entity.Role): view.Role {
    const users = this.users.filter(user => user.RoleIDs.includes(role.ID))
    users.forEach(user => {
      delete user.PasswordHash
      delete user.RoleIDs
      delete user.DeletedAt
    })
    return {
      ID: role.ID,
      Name: role.Name,
      Users: users,
      CreatedAt: role.CreatedAt,
      UpdatedAt: role.UpdatedAt
    }
  }
  resolveCollection(roles: entity.Role[], perPage: number, cursor: number): view.Roles {
    const res = roles.map(this.resolve)
    return {
      Items: res,
      Count: res.length,
      NextCursor: cursor,
      PerPage: perPage
    }
  }
}
