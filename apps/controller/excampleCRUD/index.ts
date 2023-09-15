import { findAllExcampleCrud, findOneexcampleCrud } from './find'
import { createExcampleCrud } from './create'

export const excampleCrudController = {
  create: createExcampleCrud,
  findAll: findAllExcampleCrud,
  findOne: findOneexcampleCrud
}
