import { useContext, useEffect, useState } from 'react'
import { Spin, Space } from 'antd'
import { useNavigate } from 'react-router'

import * as api from '@/services/api'
import { UserContext } from '@/context'
import { Routes } from '@/data/routes'

/**
 * User information page
 */
const Profile = () => {
  const user = useContext(UserContext)
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    // The page should only be accessible to
    // the logged in user. We check if the user
    // has the right to be on it.
    if (user.isAuth) {
      ;(async () => {
        try {
          const req = await api.getUser({
            headers: { userId: user.id },
            signal,
          })
          const data = await req.json()

          // If the session has expired, show the
          // message and redirect the user to the
          // main page
          if (req.status === 401) {
            user.clearUser()
            user.openNotification(
              'Session expired',
              'Your session expired',
              'info',
            )
            navigate(Routes.Root)
          } else {
            setUserInfo(data)
          }
        } catch (error) {
          // Do nothing, it will fallback to error boundary
        }
      })()
    } else {
      navigate(Routes.Root)
    }

    ;() => controller.abort()
  }, [user])

  return (
    (user.isAuth && userInfo && (
      <>
        <Space
          direction='vertical'
          size='small'
        >
          <span>Your Id: {userInfo.id}</span>
          <span>Your email: {userInfo.email}</span>
        </Space>
      </>
    )) || (
      <>
        <Spin
          size='large'
          style={{ position: 'relative', top: '5px', left: '5px' }}
        />
      </>
    )
  )
}

export { Profile }
