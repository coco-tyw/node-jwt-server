import * as entity from "@/domain/entity"
import * as view from "@/application/view"

export type Role = {
  id: string
  name: string
  users: view.UserSummary[]
  createdAt: number
  updatedAt: number
}

export type Roles = {
  items: Role[]
  perPage: number
  count: number
  nextCursor: number | null
}
