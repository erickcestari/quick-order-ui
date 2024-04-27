import { Avatar, Card, Col, ColProps, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

interface DashboardCardProps extends ColProps {
  value: number | string
  title: string
  href: string
  icon: React.ReactNode
  hideLabel?: boolean
}

const DashboardCard = ({icon, title, value, href, hideLabel, ...props}: DashboardCardProps) => {
  const router = useRouter()
  
  const { Text } = Typography

  return (
    <Col xs={24} sm={12} lg={11} {...props}>
      <Card
        title={title}
        bordered={false}
        hoverable
        onClick={() => router.push(href)}
      >
        <Avatar size="large" icon={icon} />
        <Text style={{marginLeft: 4}}>{value} {hideLabel ? "" : title}</Text>
      </Card>
    </Col>
  )
}

export default DashboardCard

