'use client'

import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Table,
  Typography,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ManageProductsPage() {
  const [products, setProducts] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [form] = Form.useForm()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const productsFound = await Api.Product.findMany()
      setProducts(productsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch products', { variant: 'error' })
    }
  }

  const handleCreateOrUpdateProduct = async values => {
    try {
      if (currentProduct) {
        await Api.Product.updateOne(currentProduct.id, values)
        enqueueSnackbar('Product updated successfully', { variant: 'success' })
      } else {
        await Api.Product.createOne(values)
        enqueueSnackbar('Product created successfully', { variant: 'success' })
      }
      form.resetFields()
      setIsModalVisible(false)
      setCurrentProduct(null)
      fetchProducts()
    } catch (error) {
      enqueueSnackbar('Failed to save product', { variant: 'error' })
    }
  }

  const showEditModal = product => {
    setCurrentProduct(product)
    form.setFieldsValue(product)
    setIsModalVisible(true)
  }

  const handleDeleteProduct = async productId => {
    try {
      await Api.Product.deleteOne(productId)
      enqueueSnackbar('Product deleted successfully', { variant: 'success' })
      fetchProducts()
    } catch (error) {
      enqueueSnackbar('Failed to delete product', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: text => `R$${text}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record.id)}
            danger
          />
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>Manage Products</Title>
          <Text>
            This page is dedicated to the creation, viewing, and management of
            product entries.
          </Text>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{ marginBottom: 16 }}
          >
            Add Product
          </Button>
          <Table dataSource={products} columns={columns} rowKey="id" />
          <Modal
            title={currentProduct ? 'Edit Product' : 'Add Product'}
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleCreateOrUpdateProduct}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: 'Please input the product name!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please input the product price!',
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {currentProduct ? 'Update' : 'Create'}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </PageLayout>
  )
}
