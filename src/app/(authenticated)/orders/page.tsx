'use client'

import React, { useEffect, useState } from 'react'
import { Button, Table, Typography, Modal, Space } from 'antd'
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { confirm } = Modal
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { statusOrderColorMap } from '@web/view/orderColorMap'
import Tag from '@web/core/components/Tag'
import { Order } from '@web/domain/order'

export default function ManageOrdersPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not authenticated', { variant: 'error' })
      return
    }
    fetchOrders()
  }, [userId])

  const fetchOrders = async () => {
    try {
      const ordersFound = await Api.Order.findMany({
        includes: ['user', 'orderProducts', 'orderProducts.product'],
      })
      setOrders(ordersFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch orders', { variant: 'error' })
    }
  }

  const deleteOrder = async orderId => {
    confirm({
      title: 'Tem certeza que deseha deletar?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        try {
          await Api.Order.deleteOne(orderId)
          enqueueSnackbar('Ordem deletado com sucesso', { variant: 'success' })
          fetchOrders() // Refresh the list
        } catch (error) {
          enqueueSnackbar('Failed to delete order', { variant: 'error' })
        }
      },
    })
  }

  const columns = [
    {
      title: 'ID da ordem',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={statusOrderColorMap.get(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Preço Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: totalPrice => `R$${totalPrice?.toFixed(2) ?? "0,00"}`,
    },
    {
      title: 'Data de Criação',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: dateCreated => dayjs(dateCreated).format('DD/MM/YYYY'),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => router.push(`/orders/${record.id}`)}
          >
            Editar
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteOrder(record.id)}
            danger
          >
            Deletar
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Gerencie as Ordens</Title>
      <Text>Veja e gerencie todas as ordens de produção.</Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => router.push('/orders/create')}
        style={{ marginBottom: 16, marginLeft: 16 }}
      >
        Adicionar Ordem
      </Button>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </PageLayout>
  )
}
