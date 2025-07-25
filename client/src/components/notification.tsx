import { useEffect, createContext } from 'react'
import { notification } from 'antd'

import type { NotificationPlacement } from 'antd/es/notification/interface'

type Props = {
  show: boolean
  onClose: () => void
  params: {
    title: string
    message: string
    kind: 'success' | 'info' | 'error'
  }
}

const Context = createContext(null)

/**
 * Notification component
 */
const Notification = (props: Props) => {
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    if (props.show) openNotification('topRight')
  }, [props.show])

  const openNotification = (placement: NotificationPlacement) => {
    api[props.params.kind || 'info']({
      message: props.params.title || 'Placeholder title',
      description: props.params.message || 'Placeholder message',
      placement,
      onClose: () => props.onClose(),
    })
  }

  return <Context.Provider value={null}>{contextHolder}</Context.Provider>
}

export { Notification }
