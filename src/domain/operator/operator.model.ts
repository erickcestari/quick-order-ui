import { ProductionActivity } from '../productionActivity'

export class Operator {
  id: string

  name: string

  email: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  productionActivitys?: ProductionActivity[]
}
