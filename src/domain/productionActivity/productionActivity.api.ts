import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { ProductionActivity } from './productionActivity.model'

export class ProductionActivityApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<ProductionActivity>,
  ): Promise<ProductionActivity[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/productionActivitys${buildOptions}`)
  }

  static findOne(
    productionActivityId: string,
    queryOptions?: ApiHelper.QueryOptions<ProductionActivity>,
  ): Promise<ProductionActivity> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/productionActivitys/${productionActivityId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<ProductionActivity>,
  ): Promise<ProductionActivity> {
    return HttpService.api.post(`/v1/productionActivitys`, values)
  }

  static updateOne(
    productionActivityId: string,
    values: Partial<ProductionActivity>,
  ): Promise<ProductionActivity> {
    return HttpService.api.patch(
      `/v1/productionActivitys/${productionActivityId}`,
      values,
    )
  }

  static deleteOne(productionActivityId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/productionActivitys/${productionActivityId}`,
    )
  }

  static findManyByOrderId(
    orderId: string,
    queryOptions?: ApiHelper.QueryOptions<ProductionActivity>,
  ): Promise<ProductionActivity[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/orders/order/${orderId}/productionActivitys${buildOptions}`,
    )
  }

  static createOneByOrderId(
    orderId: string,
    values: Partial<ProductionActivity>,
  ): Promise<ProductionActivity> {
    return HttpService.api.post(
      `/v1/orders/order/${orderId}/productionActivitys`,
      values,
    )
  }

  static findManyByOperatorId(
    operatorId: string,
    queryOptions?: ApiHelper.QueryOptions<ProductionActivity>,
  ): Promise<ProductionActivity[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/operators/operator/${operatorId}/productionActivitys${buildOptions}`,
    )
  }

  static createOneByOperatorId(
    operatorId: string,
    values: Partial<ProductionActivity>,
  ): Promise<ProductionActivity> {
    return HttpService.api.post(
      `/v1/operators/operator/${operatorId}/productionActivitys`,
      values,
    )
  }
}
