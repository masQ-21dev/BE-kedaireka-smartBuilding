import { findAllExcampleCrud, findOneexcampleCrud } from './find'
import { createExcampleCrud } from './create'
import { removeExcampleCrud } from './remove'
import { updateExclampleCrud } from './update'

export const excampleCrudController = {
  create: createExcampleCrud,
  findAll: findAllExcampleCrud,
  findOne: findOneexcampleCrud,
  remove: removeExcampleCrud,
  update: updateExclampleCrud
}
