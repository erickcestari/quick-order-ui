import { useEffect, useState } from 'react'
import DashboardCard from './DashboardCard'
import {
  TeamOutlined,
} from '@ant-design/icons'
import { Api } from '@web/domain'
import { ColProps } from 'antd'

const OperatorsCard = (props: ColProps) => {
  const [ordersData, setOrdersData] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await Api.Operator.findMany()
      setOrdersData(orders.length)
    }

    fetchOrders()
  }, [])

  return (
    <DashboardCard href='/operators' icon={<TeamOutlined />} title='Operadores' value={ordersData} {...props}/>
  )
}

export default OperatorsCard