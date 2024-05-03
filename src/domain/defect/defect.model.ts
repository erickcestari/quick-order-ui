import { Product } from '../product'

export class Defect {
  id: string

  status: string

  productId: string

  product?: Product

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
