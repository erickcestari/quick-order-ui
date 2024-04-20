'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Descriptions, List, Card, Divider, Tag, Space } from 'antd'
import {
  ClockCircleOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function OrderDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const [order, setOrder] = useState<Model.Order | null>(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderDetails = await Api.Order.findOne(params.id, {
          includes: [
            'user',
            'orderProducts.product',
            'productionActivitys.operator',
          ],
        })
        setOrder(orderDetails)
      } catch (error) {
        console.error('Failed to fetch order details:', error)
        enqueueSnackbar('Failed to load order details', { variant: 'error' })
      }
    }

    if (params.id) {
      fetchOrderDetails()
    }
  }, [params.id])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Order Details</Title>
      <Text type="secondary">Here you can find the details of your order.</Text>
      <Divider />
      {order ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={order.status === 'completed' ? 'green' : 'volcano'}>
              {order.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Total Price">
            <Space>
              <DollarOutlined />
              {order.totalPrice?.toFixed(2)}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Order Date">
            <Space>
              <ClockCircleOutlined />
              {dayjs(order.dateCreated).format('DD/MM/YYYY HH:mm')}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Products">
            <List
              dataSource={order.orderProducts}
              renderItem={item => (
                <List.Item>
                  <Card title={item.product?.name}>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.product?.price.toFixed(2)}</p>
                  </Card>
                </List.Item>
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Production Activities">
            <List
              dataSource={order.productionActivitys}
              renderItem={activity => (
                <List.Item>
                  <Space>
                    <InfoCircleOutlined />
                    <Text>
                      {activity.activityType} by {activity.operator?.name} on{' '}
                      {dayjs(activity.timestamp).format('DD/MM/YYYY HH:mm')}
                    </Text>
                  </Space>
                </List.Item>
              )}
            />
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Text>Loading...</Text>
      )}
    </PageLayout>
  )
}
