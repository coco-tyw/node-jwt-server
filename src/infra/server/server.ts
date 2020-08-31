import UserController from "./user";

export default class Server {
  constructor(port: number, controllers: Controllers) {}
  async run() {}
}

export interface Controllers {
  user: UserController
}