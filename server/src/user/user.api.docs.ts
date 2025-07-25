import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

/**
 * User creation API documentation
 */
export const CreateUserApiDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Creates a new user' }),
    ApiResponse({
      status: 201,
      description: 'User has been created',
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
      status: 202,
      description: 'Such a user already exists',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: { type: 'number', description: 'Status code' },
              message: { type: 'string', description: 'Server message' },
            },
            example: { statusCode: 202, message: 'User already exists' },
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
  )
}
