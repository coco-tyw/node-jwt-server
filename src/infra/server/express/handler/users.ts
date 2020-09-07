import {Request, Response, NextFunction} from 'express'
import {UserRepository, RoleRepository} from '@/infra/store/memory/index'
import {CreateUserCommand, UpdateUserCommand} from '@/application/command/index'
import {UserService} from '@/application/service/index'

export default class UsersHandler {

  userRepository: UserRepository
  roleRepository: RoleRepository
  userService: UserService

  constructor(
    userRepo: UserRepository,
    roleRepo: RoleRepository
  ) {
    this.userRepository = userRepo
    this.roleRepository = roleRepo
    this.userService = new UserService(userRepo, roleRepo)
  }

  async postUser(req: Request, res: Response, next: NextFunction) {
    const com = new CreateUserCommand(
      'sample@example.com', 
      'sample', 
      'password', 
      []
    )
    try {
      await com.validate()
      const user = await this.userService.createUser(
        com.email, 
        com.password, 
        com.name, 
        com.roleIDs 
      )
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    console.log(this)
    try {
      const users = await this.userService.getUsers()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getUser(req.params.id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  async putUser(req: Request, res: Response, next: NextFunction) {
    const com = new UpdateUserCommand(
      'sample@example.updated.com', 
      'sample.updated', 
      'password.updated', 
      []
    )
    try {
      const user = await this.userService.updateUser(
        req.params.id,
        com.email,
        com.password,
        com.name,
        com.roleIDs
      )
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userService.deleteUser(req.params.id)
      res.json({
        code: 204
      })
    } catch(error) {
      next(error)
    }
  }
}