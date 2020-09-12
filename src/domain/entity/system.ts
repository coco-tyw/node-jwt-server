import { User } from "./index"

export default class Syetem {

  id: string // unique for global
  name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}