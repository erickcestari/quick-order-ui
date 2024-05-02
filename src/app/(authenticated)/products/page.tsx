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
        enqueueSnackbar('Produto atualizado com sucesso', { variant: 'success' })
      } else {
        await Api.Product.createOne(values)
        enqueueSnackbar('Produto criado com sucesso', { variant: 'success' })
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
      enqueueSnackbar('Produto deletado com sucesso', { variant: 'success' })
      fetchProducts()
    } catch (error) {
      enqueueSnackbar('Falha ao deletar o produto', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
      render: text => `R$${text}`,
    },
    {
      title: 'Ações',
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
          <Title level={2}>Gerenciar Produtos</Title>
          <Text>
            Esta página é dedicada à criação, visualização e gerenciamento de
            entradas de produtos.
          </Text>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{ marginBottom: 16, marginLeft: 16 }}
          >
            Adicionar Produto
          </Button>
          <Table dataSource={products} columns={columns} rowKey="id" />
          <Modal
            title={currentProduct ? 'Editar Produto' : 'Adicionar Produto'}
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
                label="Nome"
                rules={[
                  { required: true, message: 'Por favor insira um nome!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Descrição">
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="price"
                label="Preço"
                rules={[
                  {
                    required: true,
                    message: 'Por favor insira o preço do produto!',
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {currentProduct ? 'Atualizar' : 'Criar'}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </PageLayout>
  )
}
