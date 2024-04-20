import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { OrderProduct } from './orderProduct.model'

export class OrderProductApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<OrderProduct>,
  ): Promise<OrderProduct[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/orderProducts${buildOptions}`)
  }

  static findOne(
    orderProductId: string,
    queryOptions?: ApiHelper.QueryOptions<OrderProduct>,
  ): Promise<OrderProduct> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/orderProducts/${orderProductId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<OrderProduct>): Promise<OrderProduct> {
    return HttpService.api.post(`/v1/orderProducts`, values)
  }

  static updateOne(
    orderProductId: string,
    values: Partial<OrderProduct>,
  ): Promise<OrderProduct> {
    return HttpService.api.patch(`/v1/orderProducts/${orderProductId}`, values)
  }

  static deleteOne(orderProductId: string): Promise<void> {
    return HttpService.api.delete(`/v1/orderProducts/${orderProductId}`)
  }

  static findManyByOrderId(
    orderId: string,
    queryOptions?: ApiHelper.QueryOptions<OrderProduct>,
  ): Promise<OrderProduct[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/orders/order/${orderId}/orderProducts${buildOptions}`,
    )
  }

  static createOneByOrderId(
    orderId: string,
    values: Partial<OrderProduct>,
  ): Promise<OrderProduct> {
    return HttpService.api.post(
      `/v1/orders/order/${orderId}/orderProducts`,
      values,
    )
  }

  static findManyByProductId(
    productId: string,
    queryOptions?: ApiHelper.QueryOptions<OrderProduct>,
  ): Promise<OrderProduct[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/products/product/${productId}/orderProducts${buildOptions}`,
    )
  }

  static createOneByProductId(
    productId: string,
    values: Partial<OrderProduct>,
  ): Promise<OrderProduct> {
    return HttpService.api.post(
      `/v1/products/product/${productId}/orderProducts`,
      values,
    )
  }
}
