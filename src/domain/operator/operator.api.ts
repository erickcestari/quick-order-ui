import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Operator } from './operator.model'

export class OperatorApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Operator>,
  ): Promise<Operator[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/operators${buildOptions}`)
  }

  static findOne(
    operatorId: string,
    queryOptions?: ApiHelper.QueryOptions<Operator>,
  ): Promise<Operator> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/operators/${operatorId}${buildOptions}`)
  }

  static createOne(values: Partial<Operator>): Promise<Operator> {
    return HttpService.api.post(`/v1/operators`, values)
  }

  static updateOne(
    operatorId: string,
    values: Partial<Operator>,
  ): Promise<Operator> {
    return HttpService.api.patch(`/v1/operators/${operatorId}`, values)
  }

  static deleteOne(operatorId: string): Promise<void> {
    return HttpService.api.delete(`/v1/operators/${operatorId}`)
  }
}
