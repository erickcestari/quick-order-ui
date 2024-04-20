import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Order as OrderModel } from './order/order.model'

import { Product as ProductModel } from './product/product.model'

import { OrderProduct as OrderProductModel } from './orderProduct/orderProduct.model'

import { Operator as OperatorModel } from './operator/operator.model'

import { ProductionActivity as ProductionActivityModel } from './productionActivity/productionActivity.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Order extends OrderModel {}

  export class Product extends ProductModel {}

  export class OrderProduct extends OrderProductModel {}

  export class Operator extends OperatorModel {}

  export class ProductionActivity extends ProductionActivityModel {}
}
