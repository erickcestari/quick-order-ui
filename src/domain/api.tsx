import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { OrderApi } from './order/order.api'

import { ProductApi } from './product/product.api'

import { OrderProductApi } from './orderProduct/orderProduct.api'

import { OperatorApi } from './operator/operator.api'

import { ProductionActivityApi } from './productionActivity/productionActivity.api'
import { DefectApi } from './defect'

export namespace Api {
  export class Ai extends AiApi { }
  export class Authentication extends AuthenticationApi { }
  export class Authorization extends AuthorizationApi { }
  export class Upload extends UploadApi { }
  export class Defect extends DefectApi { }

  export class User extends UserApi { }

  export class Notification extends NotificationApi { }

  export class Order extends OrderApi { }

  export class Product extends ProductApi { }

  export class OrderProduct extends OrderProductApi { }

  export class Operator extends OperatorApi { }

  export class ProductionActivity extends ProductionActivityApi { }
}
