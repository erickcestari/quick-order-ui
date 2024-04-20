'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Avatar } from 'antd'
import {
  UserOutlined,
  ShoppingOutlined,
  TeamOutlined,
  SyncOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function DashboardInsightsPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [userData, setUserData] = useState(null)
  const [ordersData, setOrdersData] = useState([])
  const [productsData, setProductsData] = useState([])
  const [operatorsData, setOperatorsData] = useState([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not found, please login.', { variant: 'error' })
      // Since there's no valid '/login' path, we remove the redirection to avoid bugs.
      return
    }

    const fetchData = async () => {
      try {
        const user = await Api.User.findOne(userId, { includes: ['orders'] })
        setUserData(user)
        const orders = await Api.Order.findManyByUserId(userId, {
          includes: ['orderProducts', 'productionActivitys'],
        })
        setOrdersData(orders)
        const products = await Api.Product.findMany()
        setProductsData(products)
        const operators = await Api.Operator.findMany()
        setOperatorsData(operators)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      }
    }

    fetchData()
  }, [userId, router])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Dashboard Insights</Title>
      <Text>
        Welcome to your comprehensive overview of orders, products, operators,
        and production processes.
      </Text>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title="Orders"
            bordered={false}
            hoverable
            onClick={() => router.push('/orders')}
          >
            <Avatar size="large" icon={<ShoppingOutlined />} />
            <Text>{ordersData.length} Orders</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title="Products"
            bordered={false}
            hoverable
            onClick={() => router.push('/products')}
          >
            <Avatar size="large" icon={<SyncOutlined />} />
            <Text>{productsData.length} Products</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title="Operators"
            bordered={false}
            hoverable
            onClick={() => router.push('/operators')}
          >
            <Avatar size="large" icon={<TeamOutlined />} />
            <Text>{operatorsData.length} Operators</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="Production Activities" bordered={false}>
            <Avatar size="large" icon={<UserOutlined />} />
            <Text>
              {ordersData.reduce(
                (acc, order) => acc + (order.productionActivitys?.length || 0),
                0,
              )}{' '}
              Activities
            </Text>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
