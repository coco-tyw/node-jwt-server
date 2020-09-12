import User from "@/domain/entity/user"

export type UserView = {
  id: string
  roles: RoleView[]
  extras: {[s: string]: string}
  createdAt: number
  updatedAt: number
}

export type UsersView = {
  items: UserView[]
  perPage: number
  count: number
  nextCursor: number | null
}

export type RoleView = {
  id: string
  users: UserView[]
  createdAt: number
  updatedAt: number
}

export type RolesView = {
  items: RoleView[]
  perPage: number
  count: number
  nextCursor: number | null
}

export type ScopeView = {
  id: string
  name: string
  routes: RouteView[]
}

export type RouteView = {
  path: string
  method: string
}