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
      enqueueSnackbar('Product added successfully', { variant: 'success' })
      router.push('/products')
    } catch (error) {
      enqueueSnackbar('Failed to add product', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2}>
          <PlusCircleOutlined /> Add New Product
        </Title>
        <Paragraph>
          Fill in the details below to add a new product to the application.
        </Paragraph>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              { required: true, message: 'Please input the product name!' },
            ]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: 'Please input the product price!' },
            ]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="Enter product price"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
