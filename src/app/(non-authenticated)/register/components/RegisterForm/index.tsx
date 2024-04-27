'use client'

import { MrbPasswordStrength } from '@web/designSystem'
import { Button, Form, Input } from 'antd'

type Props = {
  isLoading: boolean
  onSubmit: (values: any) => void
}

export const RegisterForm = ({ isLoading, onSubmit }: Props) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    onSubmit(values)
  }

  const password = Form.useWatch('password', form)

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      autoComplete="off"
      requiredMark={false}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email é obrigatório' }]}
      >
        <Input type="email" placeholder="Seu email" autoComplete="email" />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Nome é requerido' }]}
        label="Nome"
      >
        <Input placeholder="Seu nome" />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[{ required: true, message: 'Senha é obrigatória' }]}
      >
        <Input.Password
          type="password"
          placeholder="Sua senha"
          autoComplete="current-password"
        />
      </Form.Item>

      <MrbPasswordStrength value={password} className="mb-3" />

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Cadastar
        </Button>
      </Form.Item>
    </Form>
  )
}
