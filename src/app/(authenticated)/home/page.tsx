'use client'
import { useDesignSystem } from '@web/designSystem'
import { PageLayout } from '@web/layouts/Page.layout' // Assuming this can stay the same
import OperatorsCard from '@web/view/dashboard/cards/OperatorsCard'
import OrdersCard from '@web/view/dashboard/cards/OrdersCard'
import ProductsCard from '@web/view/dashboard/cards/ProductsCard'
import ProfitCard from '@web/view/dashboard/cards/ProfitCard'
import { Divider, Flex, Typography } from 'antd'
import Image from 'next/image'

const { Title, Text, Paragraph } = Typography

export default function HomePage() {
  const { isMobile } = useDesignSystem()

  const logoSize = isMobile ? 120 : 240
  const logoMargin = isMobile ? "auto" : 0

  return (
    <PageLayout layout="narrow">
      <div style={{ display: "flex", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row"}}>
        <Flex vertical>
          <Title level={1} style={{ marginBottom: 5 }}>
            Bem-vindo(a) ao QuickOrder
          </Title>
          <Title level={5} style={{ marginBottom: 5 }}>
            Onde a gestão <span style={{fontWeight:"bold"}}>eficiente</span> encontra a <span style={{fontWeight:"bold"}}>inovação</span>: simplifique a produção, controle a qualidade e visualize seus resultados em um só lugar.          </Title>
        </Flex>
        <div style={{height: logoSize, width: logoSize, display:"flex", marginRight: logoMargin, marginLeft: logoMargin, marginTop: -12 }}>
          <Image style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} src="/quickorder-logo.png" width={1024} height={1024} alt='Logo da QuickOrder' />
        </div>
      </div>
      <Divider />
      <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap: 8}}>
      <ProfitCard />
      <OrdersCard />
      <ProductsCard />
      <OperatorsCard />
      </div>
    </PageLayout>
  )
}
