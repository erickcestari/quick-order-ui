'use client'

import { useEffect, useState } from 'react'
import { Button, Col, Form, InputNumber, Row, Select, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateOrderPage() {
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
      const order = await Api.Order.createOneByUserId(userId, {
        status: 'pending',
      })
      await Promise.all(
        values.products.map((product: any) =>
          Api.OrderProduct.createOneByOrderId(order.id, {
            quantity: product.quantity,
            productId: product.productId,
          }),
        ),
      )
      enqueueSnackbar('Order created successfully', { variant: 'success' })
      router.push('/orders')
    } catch (error) {
      enqueueSnackbar('Failed to create order', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={18} md={12}>
          <Title level={2}>Criar nova Ordem</Title>
          <Text>
            Crie uma nova ordem selecionando os produtos e sua quantidade.
          </Text>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.List name="products">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16} align="bottom">
                      <Col flex="auto">
                        <Form.Item
                          {...restField}
                          name={[name, 'productId']}
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
                      </Col>
                      <Col flex="100px">
                        <Form.Item
                          {...restField}
                          name={[name, 'quantity']}
                          label="Quantidade"
                          rules={[
                            {
                              required: true,
                              message: 'Por favor insira a quantidade',
                            },
                          ]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                      </Col>
                      <Col flex="none">
                        <Button
                          onClick={() => remove(name)}
                          type="primary"
                          danger
                          icon={<PlusOutlined rotate={45} />}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Adicionar Produto
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Criar Ordem
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}
