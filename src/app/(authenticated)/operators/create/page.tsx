'use client'

import React, { useState } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddOperatorPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const handleSubmit = async (values: { name: string; email: string }) => {
    try {
      await Api.Operator.createOne(values)
      enqueueSnackbar('Operador adicionado com sucesso', { variant: 'success' })
      router.push('/operators')
    } catch (error) {
      enqueueSnackbar('Failed to add operator', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2}>
          <UserAddOutlined /> Criar novo Operador
        </Title>
        <Paragraph>
          Utilize o formulário abaixo para adicionar um novo perfil de operador ao sistema.
        </Paragraph>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[
              { required: true, message: 'Por favor insira o nome do operador!' },
            ]}
          >
            <Input placeholder="Insira o nome do operador" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Por favor insira operator email!' },
              { type: 'email', message: 'E-mail inválido!' },
            ]}
          >
            <Input placeholder="Insira o email do operador" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Criar Operador
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
