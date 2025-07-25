type RequestOptions = {
  signal?: AbortSignal
  body?: any
  method?: RequestInit['method']
  id?: string | number
  headers?: Record<string, any>
}

const APIPort = import.meta.env.VITE_API_PORT

/**
 * Performs a network request
 */
const Request = (url: string, options: RequestOptions): Promise<Response> => {
  let { body } = options
  const { signal, method } = options
  const headers: Record<string, any> = { ...options.headers }
  const userData = localStorage.getItem('fudy')

  if (method === 'POST') {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(body)
  }

  if (userData) {
    const json = JSON.parse(userData)
    const token = json.access_token

    if (token) {
      headers['Authorization'] = 'Bearer ' + token
    }
  }

  // Here we emulate a random network delay
  // of up to two seconds to approximate real
  // conditions
  return new Promise(res => {
    setTimeout(
      () => {
        res(
          fetch(`http://localhost:${APIPort}/${url}`, {
            signal,
            method,
            body,
            headers,
          }),
        )
      },
      Math.round(Math.random() * 2000),
    )
  })
}

/**
 * Sends a request to the server to
 * create a user
 */
export const createUser = async (
  options: RequestOptions,
): Promise<Response> => {
  const { signal, body } = options

  return await Request('user', { signal, body, method: 'POST' })
}

/**
 * Sends a request to the server to
 * log the user in
 */
export const loginUser = async (options: RequestOptions): Promise<Response> => {
  const { signal, body } = options

  return await Request('auth/login', { signal, body, method: 'POST' })
}

/**
 * Sends a request to the server to
 * check if the current token is valid or not
 */
export const validateToken = async (
  options: RequestOptions,
): Promise<Response> => {
  const { signal } = options

  return await Request('auth/token', { signal, method: 'POST' })
}

/**
 * Sends a request to the server to
 * get information about the user
 */
export const getUser = async (options: RequestOptions): Promise<Response> => {
  const { signal, headers } = options

  return await Request('auth/me', { signal, headers })
}
