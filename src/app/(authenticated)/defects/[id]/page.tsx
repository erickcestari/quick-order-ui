'use client'

import {
  ClockCircleOutlined
} from '@ant-design/icons'
import Tag from '@web/core/components/Tag'
import { Api } from '@web/domain'
import { Defect } from '@web/domain/defect'
import { PageLayout } from '@web/layouts/Page.layout'
import { statusOrderColorMap } from '@web/view/orderColorMap'
import { Card, Descriptions, Divider, List, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography

export default function DefectDetailsPage() {
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const [defect, setDefect] = useState<Defect | null>(null)

  useEffect(() => {
    const fetchDefectDetails = async () => {
      try {
        const defectDetails = await Api.Defect.findOne(params.id)
        setDefect(defectDetails)
      } catch (error) {
        console.error('Failed to fetch defect details:', error)
        enqueueSnackbar('Failed to load defect details', { variant: 'error' })
      }
    }

    if (params.id) {
      fetchDefectDetails()
    }
  }, [params.id])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Detalhes da Ordem</Title>
      <Text type="secondary">Aqui você encontra os detalhes do defeito do seu produto.</Text>
      <Divider />
      {defect ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID da ordem">{defect.id}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={statusOrderColorMap.get(defect.status)} style={{ maxWidth: "118px" }}>
              {defect.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Descrição">
            <Space>
              {defect.description}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Data de Criação">
            <Space>
              <ClockCircleOutlined />
              {dayjs(defect.dateCreated).format('DD/MM/YYYY HH:mm')}
            </Space>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Text>Carregando...</Text>
      )}
    </PageLayout>
  )
}
