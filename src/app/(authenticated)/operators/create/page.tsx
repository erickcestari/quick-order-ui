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
      enqueueSnackbar('Operator added successfully', { variant: 'success' })
      router.push('/operators')
    } catch (error) {
      enqueueSnackbar('Failed to add operator', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2}>
          <UserAddOutlined /> Add New Operator
        </Title>
        <Paragraph>
          Use the form below to add a new operator profile into the system.
        </Paragraph>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input the operator name!' },
            ]}
          >
            <Input placeholder="Enter operator name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input the operator email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input placeholder="Enter operator email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Operator
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
