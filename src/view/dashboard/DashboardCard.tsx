import { Avatar, Card, Col, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

interface DashboardCardProps {
  value: number
  title: string
  href: string
  icon: React.ReactNode
}

const DashboardCard = ({icon, title, value, href}: DashboardCardProps) => {
  const router = useRouter()
  
  const { Text } = Typography

  return (
    <Col xs={24} sm={12} lg={11}>
      <Card
        title={title}
        bordered={false}
        hoverable
        onClick={() => router.push(href)}
      >
        <Avatar size="large" icon={icon} />
        <Text style={{marginLeft: 4}}>{value} {title}</Text>
      </Card>
    </Col>
  )
}

export default DashboardCard

