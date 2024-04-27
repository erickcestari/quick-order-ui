'use client'

import { Typography, Row } from 'antd'
const { Title, Text } = Typography
import { PageLayout } from '@web/layouts/Page.layout'
import OrdersCard from '@web/view/dashboard/cards/OrdersCard'
import ProductsCard from '@web/view/dashboard/cards/ProductsCard'
import OperatorsCard from '@web/view/dashboard/cards/OperatorsCard'
import ProfitCard from '@web/view/dashboard/cards/ProfitCard'
import OrdersBarChart from '@web/view/dashboard/charts/OrdersBarChart'

export default function DashboardInsightsPage() {

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Dashboard</Title>
      <Text>
        Bem-vindo à sua <span style={{fontWeight:"500"}}>dashboard</span>! Aqui você pode visualizar informações importantes sobre o seu negócio.
      </Text>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <ProfitCard xs={24} sm={12} lg={6} />
        <OrdersCard xs={24} sm={12} lg={6} />
        <ProductsCard xs={24} sm={12} lg={6} />
        <OperatorsCard xs={24} sm={12} lg={6} />
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
      <OrdersBarChart />
      </Row>
    </PageLayout>
  )
}
