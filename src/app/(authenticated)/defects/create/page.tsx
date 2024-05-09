'use client'

import { useEffect, useState } from 'react'
import { Button, Col, Form, Input, InputNumber, Row, Select, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateDefectPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [products, setProducts] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsFound = await Api.Product.findMany()
        setProducts(productsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch products', { variant: 'error' })
      }
    }

    fetchProducts()
  }, [])

  const onFinish = async (values: any) => {
    try {
      const defect = await Api.Defect.createOne({
        status: values.status,
        productId: values.productId,
        description: values.description,
      })
      enqueueSnackbar('Defect created successfully', { variant: 'success' })
      router.push('/defects')
    } catch (error) {
      enqueueSnackbar('Failed to create defect', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={18} md={12}>
          <Title level={2}>Criar novo defeito</Title>
          <Text>
            Crie um novo defeito selecionando o produto e descrevendo o seu defeito.
          </Text>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="productId"
              label="Produto"
              rules={[
                {
                  required: true,
                  message: 'Por favor selecione um produto',
                },
              ]}
            >
              <Select placeholder="Selecione um Produto">
                {products.map((product: any) => (
                  <Option key={product.id} value={product.id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Descrição"
              rules={[
                {
                  required: true,
                  message: 'Por favor insira a descrição do defeito',
                },
              ]}
            >
              <Input placeholder="Insira o defeito" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: 'Por favor insira o status',
                },
              ]}
            >
              <Input placeholder="Insira o status" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Criar Defeito
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}
