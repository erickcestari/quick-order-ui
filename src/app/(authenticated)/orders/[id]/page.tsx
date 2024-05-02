'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Descriptions, List, Card, Divider, Space } from 'antd'
import {
  ClockCircleOutlined,
  DollarOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import Tag from '@web/core/components/Tag'
import { statusOrderColorMap } from '@web/view/orderColorMap'

export default function OrderDetailsPage() {
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
      <Title level={2}>Detalhes da Ordem</Title>
      <Text type="secondary">Aqui você encontra os detalhes da sua ordem.</Text>
      <Divider />
      {order ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID da ordem">{order.id}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={ statusOrderColorMap.get(order.status) } style={{maxWidth: "118px"}}>
              {order.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Preço Total">
            <Space>
              R${order.totalPrice?.toFixed(2)}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Data de Criação">
            <Space>
              <ClockCircleOutlined />
              {dayjs(order.dateCreated).format('DD/MM/YYYY HH:mm')}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Produtos">
            <List
              dataSource={order.orderProducts}
              renderItem={item => (
                <List.Item>
                  <Card title={item.product?.name}>
                    <p>Quantidade: {item.quantity}</p>
                    <p>Preço: ${item.product?.price.toFixed(2)}</p>
                  </Card>
                </List.Item>
              )}
            />
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Text>Carregando...</Text>
      )}
    </PageLayout>
  )
}
