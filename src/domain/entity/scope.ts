export default class Scope {

  id: string
  name: string
  routes: Route[]

  constructor(
    id: string,
    name: string,
    routes: Route[]
  ) {
    this.id = id
    this.name = name
    this.routes = routes
  }
}

export class Route {

  path: string
  method: string

  constructor(
    path: string,
    method: string
  ) {
    this.path = path
    this.method = method
  }
}