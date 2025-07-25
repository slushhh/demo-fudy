import { createContext } from 'react'

/**
 * User context
 */
export type UserContext = {
  access_token: string
  id: number | null
  email: string
  setUser: (data: object) => void
  clearUser: () => void
  isAuth: boolean
  openNotification: (
    title: string,
    message: string,
    kind?: 'success' | 'info' | 'error',
  ) => void
}

/**
 * Default values for user context
 */
export const userContext: UserContext = {
  access_token: '',
  id: null,
  email: '',
  setUser: () => null,
  clearUser: () => null,
  isAuth: false,
  openNotification: () => null,
}

/**
 * User context reducer
 */
export const userReducer = (user: any, action: Record<string, any>) => {
  switch (action.type) {
    case 'set': {
      return { ...action.payload }
    }

    case 'clear': {
      return { ...userContext }
    }

    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}

export const UserContext = createContext<UserContext>(userContext)
