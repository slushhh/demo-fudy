import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserDto } from './user.dto'
import { UserService } from './user.service'
import { CreateUserApiDocs } from './user.api.docs'

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * When requesting an endpoint creates a user,
   * while checking if a record with similar data
   * exists, and if so, returns an error
   */
  @Post()
  @CreateUserApiDocs()
  createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto)
  }
}
