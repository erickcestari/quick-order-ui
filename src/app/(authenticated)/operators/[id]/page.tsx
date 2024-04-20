'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Avatar, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function OperatorDetailsPage() {
  const { enqueueSnackbar } = useSnackbar()
  const params = useParams<any>()
  const [operator, setOperator] = useState<any>(null)

  useEffect(() => {
    const fetchOperatorDetails = async () => {
      try {
        const operatorDetails = await Api.Operator.findOne(params.id, {
          includes: ['productionActivitys'],
        })
        setOperator(operatorDetails)
      } catch (error) {
        enqueueSnackbar('Failed to fetch operator details', {
          variant: 'error',
        })
      }
    }

    if (params.id) {
      fetchOperatorDetails()
    }
  }, [params.id])

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Title level={2}>Operator Details</Title>
            <Card>
              {operator ? (
                <>
                  <Space
                    direction="vertical"
                    size="small"
                    style={{ width: '100%' }}
                  >
                    <Avatar
                      size={64}
                      icon={<UserOutlined />}
                      src={operator.pictureUrl}
                    />
                    <Text strong>Name: </Text>
                    <Text>{operator.name}</Text>
                    <Text strong>Email: </Text>
                    <Text>{operator.email}</Text>
                    <Title level={4}>Production Activities</Title>
                    {operator.productionActivitys?.map((activity: any) => (
                      <Card
                        key={activity.id}
                        type="inner"
                        title={`Activity: ${activity.activityType}`}
                      >
                        <Text>
                          Date:{' '}
                          {dayjs(activity.timestamp).format('DD/MM/YYYY HH:mm')}
                        </Text>
                      </Card>
                    ))}
                  </Space>
                </>
              ) : (
                <Text>Loading...</Text>
              )}
            </Card>
          </Space>
        </Col>
      </Row>
    </PageLayout>
  )
}
