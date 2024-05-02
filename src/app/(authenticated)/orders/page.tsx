'use client'

import React, { useEffect, useState } from 'react'
import { Button, Table, Typography, Modal, Space, Tag } from 'antd'
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { confirm } = Modal
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ManageOrdersPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [orders, setOrders] = useState([])

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
      title: 'Do you want to delete this order?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        try {
          await Api.Order.deleteOne(orderId)
          enqueueSnackbar('Order deleted successfully', { variant: 'success' })
          fetchOrders() // Refresh the list
        } catch (error) {
          enqueueSnackbar('Failed to delete order', { variant: 'error' })
        }
      },
    })
  }

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'completed' ? 'green' : 'volcano'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: totalPrice => `R$${totalPrice?.toFixed(2) ?? "0,00"}`,
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: dateCreated => dayjs(dateCreated).format('DD/MM/YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => router.push(`/orders/${record.id}`)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteOrder(record.id)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Manage Orders</Title>
      <Text>View and manage all customer orders.</Text>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </PageLayout>
  )
}
