import { useEffect, useState } from 'react'
import DashboardCard from './DashboardCard'
import {
  DollarCircleOutlined,
} from '@ant-design/icons'
import { Api } from '@web/domain'
import { ColProps } from 'antd'

const ProfitCard = (props: ColProps) => {
  const [ordersData, setOrdersData] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await Api.Order.findMany()
      setOrdersData(orders.reduce((acc, order) => acc + order.totalPrice, 0))
    }

    fetchOrders()
  }, [])

  return (
    <DashboardCard href='/dashboard' icon={<DollarCircleOutlined />} title='Arrecadação' value={ordersData.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })} hideLabel {...props}/>
  )
}

export default ProfitCard