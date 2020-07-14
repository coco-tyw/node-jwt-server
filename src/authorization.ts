import bcrypt from "bcrypt"
import { promisify } from "util"

const bcryptHash = promisify(bcrypt.hash).bind(bcrypt)
const bcryptCompare = promisify(bcrypt.compare).bind(bcrypt)

const salt = 10

function createHash(val: string) {
  return bcryptHash(val, salt)
}
function compareHash(val: string, hashedVal: string) {
  return bcryptCompare(val, hashedVal)
}

export function login() {
  
}
export function isLoggedIn() {

}
export function logout() {

}
