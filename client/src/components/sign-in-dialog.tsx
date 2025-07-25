import { createRef, useContext, useState } from 'react'
import { Modal, Form, Input } from 'antd'

import * as api from '@/services/api'
import { UserContext } from '@/context'

import type { FormInstance } from 'antd'

type FormData = {
  email: string
  password: string
}

type Props = {
  open: boolean
  onClose: () => void
  type: 'signin' | 'signup'
}

/**
 * Dialog for creating or logging
 * in a user
 */
const SignInDialog = (props: Props) => {
  const [open, setOpen] = useState(props.open)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const user = useContext(UserContext)

  const form = createRef<FormInstance>()

  /**
   * Submit form handler
   */
  const onSubmit = async (formData: FormData) => {
    if (!formData) return
    setConfirmLoading(true)

    const apiRequest = props.type === 'signin' ? 'loginUser' : 'createUser'
    const successCode = props.type === 'signin' ? 200 : 201
    const successMessage =
      props.type === 'signin' ? "You're logged in" : 'User created'

    try {
      const req = await api[apiRequest]({ body: formData })
      const data = await req.json()

      // Depending on the result of the request,
      // we show different notifications
      if (req.status !== successCode) {
        user.openNotification('Error', data.message, 'error')
        setConfirmLoading(false)
      } else if (req.status === successCode) {
        user.setUser(data)
        user.openNotification('Success', successMessage, 'success')
        setConfirmLoading(false)
        setOpen(false)
      }
    } catch (error) {
      user.openNotification(
        'Error',
        'Your request could not be completed. Please try again later.',
        'error',
      )

      setConfirmLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      <Modal
        afterClose={() => props.onClose()}
        title={props.type == 'signin' ? 'Login' : 'Create account'}
        open={open}
        onOk={() => form.current?.submit()}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <Form
          ref={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={() => {}}
          autoComplete='off'
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Enter email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Enter password' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export { SignInDialog }
