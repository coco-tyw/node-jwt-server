import {Router, Request, Response, NextFunction} from 'express'
import bcryptjs from 'bcryptjs'
import {ErrorBadRequest} from '@/domain/entity/index'
import UserRepository from '@/infra/store/memory/user'

export default class AuthHandler {

  userRepository: UserRepository

  constructor(
    userRepo: UserRepository
  ) {
    this.userRepository = userRepo
  }

  async postSignin(req: Request, res: Response, next: NextFunction) {
    const user = await this.userRepository.findByEmail(req.body.email)
    console.log(user)
    if (!user) {
      console.log("email not found")
      next(new ErrorBadRequest(401, 'unauthorized request!!'))
    }
    if (!await bcryptjs.compare(req.body.password, user!.passwordHash)) {
      next(new ErrorBadRequest(401, 'unauthorized request!!'))
    }
    res.json({
      code: 204,
      message: 'success'
    })
  }
}