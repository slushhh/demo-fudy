import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'

/**
 * User creation API documentation
 */
export const LoginUserApiDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Creates a session for a valid user' }),
    ApiResponse({
      status: 200,
      description: 'Session created',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'number', description: 'User ID' },
              email: { type: 'string', description: 'User email' },
              access_token: { type: 'string', description: 'JWT' },
            },
            example: { id: 1, email: 'user@examle.com', access_token: '...' },
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Error or absence of necessary data in the request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: { type: 'number', description: 'Status code' },
              message: {
                type: 'Array<string>',
                description: 'Server message',
              },
              error: { type: 'string', description: 'Server error message' },
            },
            example: {
              statusCode: 400,
              message: ['The password cannot be empty'],
              error: 'Bad Request',
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Password is incorrect',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: { type: 'number', description: 'Status code' },
              message: {
                type: 'string',
                description: 'Server message',
              },
              error: { type: 'string', description: 'Server error message' },
            },
            example: {
              message: 'Password is incorrect',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'No such user found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: { type: 'number', description: 'Status code' },
              message: {
                type: 'string',
                description: 'Server message',
              },
              error: { type: 'string', description: 'Server error message' },
            },
            example: {
              message: 'No such user found',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      },
    }),
  )
}

/**
 * API token validation documentation
 */
export const ValidateTokenApiDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Checks if the token has expired or not',
      description: `Checks the token for validity. The validation
       token is sent as a standard \`authorization: Bearer ...\`
       header without any payload`,
    }),
    ApiResponse({ status: 200, description: 'The token is valid' }),
    ApiResponse({
      status: 401,
      description: 'The token is invalid',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: { type: 'number', description: 'Status code' },
              message: {
                type: 'string',
                description: 'Server message',
              },
            },
            example: {
              message: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
    }),
    ApiBearerAuth(),
  )
}

/**
 * API token validation documentation
 */
export const GetUserApiDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Returns information about a specific user',
      description: `Returns information about a specific user.
       Pretected API, valid token is required for successful operation`,
    }),
    ApiResponse({
      status: 200,
      description: 'User information returned',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'number', description: 'User ID' },
              email: { type: 'string', description: 'User email' },
            },
            example: {
              id: 1,
              email: 'user@examle.com',
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: { type: 'number', description: 'Status code' },
              message: {
                type: 'string',
                description: 'Server message',
              },
            },
            example: {
              message: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'No such user found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: { type: 'number', description: 'Status code' },
              message: {
                type: 'string',
                description: 'Server message',
              },
              error: { type: 'string', description: 'Server error message' },
            },
            example: {
              message: 'No such user found',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      },
    }),
    ApiHeader({
      name: 'userId',
      description: 'ID of the user whose information we want to retrieve',
    }),
    ApiBearerAuth(),
  )
}
