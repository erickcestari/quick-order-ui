import { useEffect, useState } from 'react'
import DashboardCard from './DashboardCard'
import {
  FileTextOutlined,
} from '@ant-design/icons'
import { Api } from '@web/domain'
import { ColProps } from 'antd'

const OrdersCard = (props: ColProps) => {
  const [ordersData, setOrdersData] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await Api.Order.findMany()
      setOrdersData(orders.length)
    }

    fetchOrders()
  }, [])

  return (
    <DashboardCard href='/orders' icon={<FileTextOutlined />} title='Ordens de Produção' value={ordersData} {...props}/>
  )
}

export default OrdersCard