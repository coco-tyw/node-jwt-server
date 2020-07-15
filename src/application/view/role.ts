import * as entity from "@/domain/entity"
import * as view from "@/application/view"

export type Role = {
  ID: string
  Name: string
  Users: view.UserSummary[]
  CreatedAt: number
  UpdatedAt: number
}

export type Roles = {
  Items: Role[]
  PerPage: number
  Count: number
  NextCursor: number
}
