import * as entity from "@/domain/entity"

export type User = {
  ID: string
  Name: string
  Email: string
  Roles: entity.Role[]
  CreatedAt: number
  UpdatedAt: number
}

export type Users = {
  Items: User[]
  PerPage: number
  Count: number
  NextCursor: number
}

export type UserSummary = {
  ID: string
  Name: string
  Email: string
  CreatedAt: number
  UpdatedAt: number
}
