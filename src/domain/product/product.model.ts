import { OrderProduct } from '../orderProduct'

export class Product {
  id: string

  name: string

  description?: string

  price: number

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  orderProducts?: OrderProduct[]
}
