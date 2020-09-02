import * as entity from "@/domain/entity/index"
import * as view from "@/application/view/index"

export type User = {
  id: string
  name: string
  email: string
  roles: view.Role[]
  createdAt: number
  updatedAt: number
}

export type Users = {
  items: User[]
  perPage: number
  count: number
  nextCursor: number | null
}

export type UserSummary = {
  id: string
  name: string
  email: string
  createdAt: number
  updatedAt: number
}
