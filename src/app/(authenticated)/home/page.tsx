'use client'
import { PageLayout } from '@web/layouts/Page.layout' // Assuming this can stay the same
import { Divider, Flex, Typography } from 'antd'

const { Title, Text, Paragraph } = Typography

export default function HomePage() {
  return (
    <PageLayout layout="super-narrow">
      <Flex align="center" vertical>
        <Title level={1} style={{ marginBottom: 5 }}>
          Welcome to Marblism 👋
        </Title>
        <Title level={5} style={{ marginTop: 0, marginBottom: 15 }}>
          {' '}
          You can start navigating the app and make it yours.
        </Title>

        <Paragraph style={{ marginTop: 0 }}>
          Prompt the AI to make changes on the fly.
        </Paragraph>
        <Paragraph>
          You can read our{' '}
          <a
            href="https://dev.marblism.com/Get-started/prompt-best-practices#improvements-prompt"
            target="_blank"
          >
            how to prompt guide
          </a>{' '}
          to get the best out of it.
        </Paragraph>
        <Divider />
        <Text type="secondary">
          If you have any problems, join our{' '}
          <a href="https://discord.gg/GScNz7kAEu" target="_blank">
            Discord
          </a>
          . We reply fast!
        </Text>
      </Flex>
    </PageLayout>
  )
}
