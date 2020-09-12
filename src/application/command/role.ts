import Joi from 'joi'


const roleSchema = Joi.object({
  systemId: Joi.string().alphanum().required(),
  name: Joi.string().alphanum().required(),
  scopeKeys: Joi.array().items(Joi.string().alphanum())
})

export default class CreateRoleCommand {

  

}