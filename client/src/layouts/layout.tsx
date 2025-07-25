import { useEffect, useReducer, useRef, useState } from 'react'
import { Layout, Space } from 'antd'
import { NavLink, Outlet } from 'react-router'
import { css } from 'styled-components'

import { Notification } from '@/components/notification'
import { SignInDialog } from '@/components/sign-in-dialog'

import { Routes } from '@/data/routes'
import { UserContext, userContext, userReducer } from '@/context'
import * as api from '@/services/api'

import type { MouseEvent } from 'react'

const { Header, Footer, Content } = Layout

/**
 * App layout, aliases: App, Root, and so on
 */
const AppLayout = () => {
  const [signInOpen, setSignInOpen] = useState(false)
  const [notification, setNotification] = useState(false)
  const [userSettings, dispatch] = useReducer(userReducer, userContext)
  const isAuth = !!userSettings.access_token

  const notificationParams = useRef({
    title: '',
    message: '',
    kind: '',
  })

  const signInType = useRef<'signin' | 'signup'>('signin')

  /**
   * When the application starts, we
   * check if there is a stored token
   * in the storage. If yes, it is valid.
   * If yes, login the user.
   *
   * If the token is not valid, clear the
   * storage
   */
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const storage = localStorage.getItem('fudy')

    if (storage) {
      const data = JSON.parse(storage)

      ;(async () => {
        if (data.access_token) {
          try {
            const req = await api.validateToken({ signal })

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            req.status === 401 ? clearUser() : setUser(data)
          } catch (error) {
            console.log(error)
          }
        }
      })()
    }

    return () => controller.abort()
  }, [])

  /**
   * Displays various messages to the user
   */
  const openNotification = (
    title: string,
    message: string,
    kind?: 'success' | 'info' | 'error',
  ) => {
    notificationParams.current = {
      title,
      message,
      kind: kind || 'info',
    }

    setNotification(true)
  }

  /**
   * User login handler
   */
  const onSignIn = (ev: MouseEvent) => {
    ev.preventDefault()
    signInType.current = 'signin'
    setSignInOpen(true)
  }

  /**
   * Account creation handler
   */
  const onSignUp = (ev: MouseEvent) => {
    ev.preventDefault()
    signInType.current = 'signup'
    setSignInOpen(true)
  }

  /**
   * User logout handler
   */
  const onSignOut = () => {
    openNotification('Success', "You've logged out of your account", 'info')
    clearUser()
  }

  /**
   * Adds user data to the context so that
   * it is available to the entire app
   */
  const setUser = (data: any) => {
    dispatch({ type: 'set', payload: data })
    localStorage.setItem('fudy', JSON.stringify(data))
  }

  /**
   * Deletes user data from context and from
   * storage
   */
  const clearUser = () => {
    dispatch({ type: 'clear' })
    localStorage.removeItem('fudy')
  }

  return (
    <UserContext.Provider
      value={{ ...userSettings, setUser, clearUser, isAuth, openNotification }}
    >
      <Layout css={styles.layout}>
        <Header css={styles.header}>
          <Space size='middle'>
            <NavLink to={Routes.Root}>Home</NavLink>

            {isAuth && (
              <>
                <NavLink to={Routes.Profile}>Profile</NavLink>
                <a onClick={onSignOut}>Sign Out</a>
              </>
            )}

            {!isAuth && (
              <>
                <a onClick={onSignUp}>Sign Up</a>
                <a onClick={onSignIn}>Sign In</a>
              </>
            )}
          </Space>
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <Outlet />
        </Content>

        <Footer>
          <Space size='middle'>Fudy</Space>
        </Footer>
      </Layout>

      {signInOpen && (
        <SignInDialog
          type={signInType.current}
          open={signInOpen}
          onClose={() => setSignInOpen(false)}
        />
      )}

      <Notification
        params={notificationParams.current}
        show={notification}
        onClose={() => setNotification(false)}
      />
    </UserContext.Provider>
  )
}

const styles = {
  layout: css`
    height: 100vh;
  `,

  header: css`
    background-color: transparent;
  `,
}

export { AppLayout }
