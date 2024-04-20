import { Order } from '../order'

import { Operator } from '../operator'

export class ProductionActivity {
  id: string

  activityType: string

  timestamp: string

  orderId: string

  order?: Order

  operatorId: string

  operator?: Operator

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
