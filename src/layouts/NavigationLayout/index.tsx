import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = [
    {
      key: '/orders',
      label: 'Ordens',
      onClick: () => goTo('/orders'),
    },

    {
      key: '/orders/create',
      label: 'Criar Ordem',
      onClick: () => goTo('/orders/create'),
    },

    {
      key: '/products',
      label: 'Produtos',
      onClick: () => goTo('/products'),
    },

    {
      key: '/products/create',
      label: 'Adicionar Produto',
      onClick: () => goTo('/products/create'),
    },

    {
      key: '/defects',
      label: 'Defeitos',
      onClick: () => goTo('/defects'),
    },

    {
      key: '/defects/create',
      label: 'Adicionar Defeito',
      onClick: () => goTo('/defects/create'),
    },

    {
      key: '/operators',
      label: 'Operadores',
      onClick: () => goTo('/operators'),
    },

    {
      key: '/operators/create',
      label: 'Adicionar Operadores',
      onClick: () => goTo('/operators/create'),
    },

    {
      key: '/dashboard',
      label: 'Dashboard',
      onClick: () => goTo('/dashboard'),
    },

  ]

  const itemsUser = []

  const itemsTopbar = []

  const itemsSubNavigation = [
    {
      key: '/orders',
      label: 'Ordens',
    },

    {
      key: '/orders/create',
      label: 'Criar Ordens',
    },

    {
      key: '/orders/:id',
      label: 'Detalhes Ordem',
    },

    {
      key: '/products',
      label: 'Produtos',
    },

    {
      key: '/products/create',
      label: 'Criar Produto',
    },
    {
      key: '/defects',
      label: 'Defeitos',
    },
    {
      key: '/defects/create',
      label: 'Criar Defeito',
    },
    {
      key: '/products/:id',
      label: 'Detalhes Produto',
    },

    {
      key: '/operators',
      label: 'Operadores',
    },

    {
      key: '/operators/create',
      label: 'Criar Operador',
    },

    {
      key: '/operators/:id',
      label: 'Detalhes Operador',
    },

    {
      key: '/dashboard',
      label: 'Dashboard',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Perfil',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notificação',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
