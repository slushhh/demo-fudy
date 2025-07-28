/**
 * The user data structure expected from
 * the server
 */
type User = {
  /** User ID */
  id?: number | null

  /** User email */
  email?: string

  /** User token */
  access_token?: string
}

/**
 * Route error data structure
 */
type RouteError = {
  /** Error code */
  status: number

  /** Status text */
  statusText: string

  /** Error message */
  message: string
}
