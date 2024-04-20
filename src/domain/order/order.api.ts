import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Order } from './order.model'

export class OrderApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Order>,
  ): Promise<Order[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/orders${buildOptions}`)
  }

  static findOne(
    orderId: string,
    queryOptions?: ApiHelper.QueryOptions<Order>,
  ): Promise<Order> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/orders/${orderId}${buildOptions}`)
  }

  static createOne(values: Partial<Order>): Promise<Order> {
    return HttpService.api.post(`/v1/orders`, values)
  }

  static updateOne(orderId: string, values: Partial<Order>): Promise<Order> {
    return HttpService.api.patch(`/v1/orders/${orderId}`, values)
  }

  static deleteOne(orderId: string): Promise<void> {
    return HttpService.api.delete(`/v1/orders/${orderId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Order>,
  ): Promise<Order[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/user/${userId}/orders${buildOptions}`)
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Order>,
  ): Promise<Order> {
    return HttpService.api.post(`/v1/users/user/${userId}/orders`, values)
  }
}
