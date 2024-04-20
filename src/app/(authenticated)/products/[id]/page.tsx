'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, List, Avatar, Space, Grid } from 'antd'
import { DollarCircleOutlined, HistoryOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { useBreakpoint } = Grid
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ProductDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const screens = useBreakpoint()
  const [product, setProduct] = useState(null)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await Api.Product.findOne(params.id, {
          includes: ['orderProducts', 'orderProducts.order'],
        })
        setProduct(productDetails)
        if (productDetails.orderProducts) {
          const orderIds = productDetails.orderProducts.map(op => op.orderId)
          const uniqueOrderIds = Array.from(new Set(orderIds))
          const ordersDetails = await Promise.all(
            uniqueOrderIds.map(orderId =>
              Api.Order.findOne(orderId, { includes: ['user'] }),
            ),
          )
          setOrders(ordersDetails)
        }
      } catch (error) {
        enqueueSnackbar('Failed to fetch product details', { variant: 'error' })
      }
    }

    fetchProductDetails()
  }, [params.id])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Space
        direction="vertical"
        size="large"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Title level={2}>Product Details</Title>
        {product && (
          <Card
            style={{ maxWidth: screens.md ? '80%' : '100%' }}
            actions={[
              <DollarCircleOutlined key="price" />,
              <Text key="priceValue">${product.price}</Text>,
              <HistoryOutlined key="history" />,
              <Text key="historyValue">{orders.length} Orders</Text>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar src="product-image-placeholder.png" />}
              title={product.name}
              description={product.description}
            />
          </Card>
        )}
        <List
          header={<Title level={4}>Order History</Title>}
          bordered
          dataSource={orders}
          renderItem={order => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="order-history-placeholder.png" />}
                title={`Order ID: ${order.id}`}
                description={`Ordered by: ${order.user?.name || 'Unknown'} on ${dayjs(order.dateCreated).format('YYYY-MM-DD')}`}
              />
              <Text>Price: ${order.totalPrice}</Text>
            </List.Item>
          )}
          style={{ maxWidth: screens.md ? '80%' : '100%' }}
        />
      </Space>
    </div>
  )
}
