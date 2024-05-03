import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Defect } from './defect.model'

export class DefectApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Defect>,
  ): Promise<Defect[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/defects${buildOptions}`)
  }

  static findOne(
    defectId: string,
    queryOptions?: ApiHelper.QueryOptions<Defect>,
  ): Promise<Defect> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/defects/${defectId}${buildOptions}`)
  }

  static createOne(values: Partial<Defect>): Promise<Defect> {
    return HttpService.api.post(`/v1/defects`, values)
  }

  static updateOne(defectId: string, values: Partial<Defect>): Promise<Defect> {
    return HttpService.api.patch(`/v1/defects/${defectId}`, values)
  }

  static deleteOne(defectId: string): Promise<void> {
    return HttpService.api.delete(`/v1/defects/${defectId}`)
  }
}
