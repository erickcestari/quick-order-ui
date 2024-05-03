import { Product } from '../product'

export class Defect {
  id: string

  description: string

  status: string

  productId: string

  product?: Product

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
