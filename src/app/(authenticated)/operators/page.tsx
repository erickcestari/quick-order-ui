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
        enqueueSnackbar('Operador atualizado com sucesso', { variant: 'success' })
      } else {
        await Api.Operator.createOne(values)
        enqueueSnackbar('Operador criado com sucesso', { variant: 'success' })
      }
      setIsModalVisible(false)
      fetchOperators()
    } catch (error) {
      enqueueSnackbar('Falhou ao salvar o operador', { variant: 'error' })
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
      enqueueSnackbar('Operator deletado com sucesso', { variant: 'success' })
      fetchOperators()
    } catch (error) {
      enqueueSnackbar('Falhou ao deletar o operador', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ações',
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
      <Title>Gerencie Operadores</Title>
      <Text>
        Visualize, edite e gerencie perfis de operadores no aplicativo.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => router.push('/operators/create')}
        style={{ marginBottom: 16, marginLeft: 16 }}
      >
        Adicionar Operador
      </Button>
      <Table dataSource={operators} columns={columns} rowKey="id" />
      <Modal
        title={currentOperator ? 'Editar' : 'Adicionar Operador'}
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
            label="Nome"
            rules={[
              { required: true, message: 'Por favor insira o nome do operador!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor insira o email do operador!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
