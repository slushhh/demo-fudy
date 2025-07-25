import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

/**
 * Here we define in what format we expect
 * to receive data from the client and validate it
 *
 * `message` in the validator, this is what will be
 * sent to the client in case of a failed validation
 */
export class UserDto {
  @IsEmail({}, { message: 'Email format is incorrect' })
  @IsNotEmpty({ message: 'The email cannot be empty' })
  @ApiProperty({
    name: 'email',
    type: 'string',
    description: 'User email',
    example: 'user@examle.com',
  })
  email: string

  @IsString()
  @IsNotEmpty({ message: 'The password cannot be empty' })
  @ApiProperty({
    name: 'password',
    type: 'string',
    description: 'User password',
    example: 'E/C0dr<r(j',
  })
  password: string
}
