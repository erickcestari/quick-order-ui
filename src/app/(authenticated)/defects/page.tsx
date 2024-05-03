'use client'

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import Tag from '@web/core/components/Tag'
import { Api } from '@web/domain'
import { Defect } from '@web/domain/defect'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Button, Form, Input, Modal, Select, Space, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { statusOrderColorMap } from '@web/view/orderColorMap'
import { Option } from 'antd/es/mentions'
const { Title, Text } = Typography
const { confirm } = Modal

export default function ManageDefectsPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [defects, setDefects] = useState<Defect[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentDefect, setCurrentDefect] = useState(null)
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

  const handleCreateOrUpdateDefect = async values => {
    try {
      if (currentDefect) {
        await Api.Defect.updateOne(currentDefect.id, values)
        enqueueSnackbar('Defeito atualizado com sucesso', { variant: 'success' })
      } else {
        await Api.Defect.createOne(values)
        enqueueSnackbar('Defeito criado com sucesso', { variant: 'success' })
      }
      setIsModalVisible(false)
      fetchDefects()
    } catch (error) {
      enqueueSnackbar('Falhou ao salvar o defeito', { variant: 'error' })
    }
  }

  const showEditModal = defect => {
    setCurrentDefect(defect)
    form.setFieldsValue(defect)
    setIsModalVisible(true)
  }

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not authenticated', { variant: 'error' })
      return
    }
    fetchDefects()
  }, [userId])

  const fetchDefects = async () => {
    try {
      const defectsFound = await Api.Defect.findMany()
      setDefects(defectsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch defects', { variant: 'error' })
    }
  }

  const deleteDefect = async defectId => {
    confirm({
      title: 'Tem certeza que deseha deletar?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        try {
          await Api.Defect.deleteOne(defectId)
          enqueueSnackbar('Defeito deletado com sucesso', { variant: 'success' })
          fetchDefects() // Refresh the list
        } catch (error) {
          enqueueSnackbar('Failed to delete defect', { variant: 'error' })
        }
      },
    })
  }

  const columns = [
    {
      title: 'ID do defeito',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={statusOrderColorMap.get(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Data de Criação',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: dateCreated => dayjs(dateCreated).format('DD/MM/YYYY'),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Editar
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteDefect(record.id)}
            danger
          >
            Deletar
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Gerencie os Defeitos</Title>
      <Text>Veja e gerencie todas os defeitos de produção.</Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => router.push('/defects/create')}
        style={{ marginBottom: 16, marginLeft: 16 }}
      >
        Adicionar Defeito
      </Button>
      <Table dataSource={defects} columns={columns} rowKey="id" />
      <Modal
        title={currentDefect ? 'Editar' : 'Adicionar Operador'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateOrUpdateDefect}
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
              Editar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
