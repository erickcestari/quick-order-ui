'use client'

import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Typography,
  Upload,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ManageOperatorsPage() {
  const [operators, setOperators] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentOperator, setCurrentOperator] = useState(null)
  const [form] = Form.useForm()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    fetchOperators()
  }, [])

  const fetchOperators = async () => {
    try {
      const operatorsFound = await Api.Operator.findMany()
      setOperators(operatorsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch operators', { variant: 'error' })
    }
  }

  const handleCreateOrUpdateOperator = async values => {
    try {
      if (currentOperator) {
        await Api.Operator.updateOne(currentOperator.id, values)
        enqueueSnackbar('Operator updated successfully', { variant: 'success' })
      } else {
        await Api.Operator.createOne(values)
        enqueueSnackbar('Operator created successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      fetchOperators()
    } catch (error) {
      enqueueSnackbar('Failed to save operator', { variant: 'error' })
    }
  }

  const showEditModal = operator => {
    setCurrentOperator(operator)
    form.setFieldsValue(operator)
    setIsModalVisible(true)
  }

  const deleteOperator = async operatorId => {
    try {
      await Api.Operator.deleteOne(operatorId)
      enqueueSnackbar('Operator deleted successfully', { variant: 'success' })
      fetchOperators()
    } catch (error) {
      enqueueSnackbar('Failed to delete operator', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Row gutter={16}>
          <Col>
            <Button
              icon={<EditOutlined />}
              onClick={() => showEditModal(record)}
            />
          </Col>
          <Col>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => deleteOperator(record.id)}
              danger
            />
          </Col>
        </Row>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title>Manage Operators</Title>
      <Text>
        View, edit, and manage operator profiles within the application.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setCurrentOperator(null)
          form.resetFields()
          setIsModalVisible(true)
        }}
        style={{ marginBottom: 16 }}
      >
        Add Operator
      </Button>
      <Table dataSource={operators} columns={columns} rowKey="id" />

      <Modal
        title={`${currentOperator ? 'Edit' : 'Add'} Operator`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateOrUpdateOperator}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Please input the operator name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input the operator email!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
