'use client'

import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddProductPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const handleSubmit = async (values: {
    name: string
    description?: string
    price: number
  }) => {
    try {
      await Api.Product.createOne(values)
      enqueueSnackbar('Produto adicionado com sucesso', { variant: 'success' })
      router.push('/products')
    } catch (error) {
      enqueueSnackbar('Falha ao adicionar o produto', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2}>
          <PlusCircleOutlined /> Criar novo Produto
        </Title>
        <Paragraph>
          Preencha os detalhes abaixo para adicionar um novo produto ao aplicativo.
        </Paragraph>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Nome do Produto"
            name="name"
            rules={[
              { required: true, message: 'Por favor insira um nome!' },
            ]}
          >
            <Input placeholder="Insira o nome do produto" />
          </Form.Item>
          <Form.Item label="Descrição" name="description">
            <Input.TextArea rows={4} placeholder="Digite uma descrição" />
          </Form.Item>
          <Form.Item
            label="Preço"
            name="price"
            rules={[
              { required: true, message: 'Por favor insira o preço do produto!' },
            ]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="Digite o preço do produto"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar Produto
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
