import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Product } from './product.model'

export class ProductApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Product>,
  ): Promise<Product[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/products${buildOptions}`)
  }

  static findOne(
    productId: string,
    queryOptions?: ApiHelper.QueryOptions<Product>,
  ): Promise<Product> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/products/${productId}${buildOptions}`)
  }

  static createOne(values: Partial<Product>): Promise<Product> {
    return HttpService.api.post(`/v1/products`, values)
  }

  static updateOne(
    productId: string,
    values: Partial<Product>,
  ): Promise<Product> {
    return HttpService.api.patch(`/v1/products/${productId}`, values)
  }

  static deleteOne(productId: string): Promise<void> {
    return HttpService.api.delete(`/v1/products/${productId}`)
  }
}
