import { User } from '../user'

import { OrderProduct } from '../orderProduct'

import { ProductionActivity } from '../productionActivity'

export class Order {
  id: string

  status: string

  totalPrice?: number

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  orderProducts?: OrderProduct[]

  productionActivitys?: ProductionActivity[]
}
