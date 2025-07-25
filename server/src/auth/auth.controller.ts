import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { UserDto } from 'src/user/user.dto'
import { AuthGuard } from './auth.guard'
import {
  GetUserApiDocs,
  LoginUserApiDocs,
  ValidateTokenApiDocs,
} from './auth.api.docs'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Logs the user in. Returns an error if no
   * user with the required e-mail address is
   * found or if the password is invalid
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @LoginUserApiDocs()
  logUser(@Body() userDto: UserDto) {
    return this.authService.logUser(userDto)
  }

  /**
   * Validates the provided token
   */
  @Post('token')
  @HttpCode(HttpStatus.OK)
  @ValidateTokenApiDocs()
  validateToken(@Headers() headers: any) {
    return this.authService.validateToken(headers)
  }

  /**
   * Returns data about the requested user
   * if such a user is found in the database
   *
   * This API endpoint should be protected
   * by a guard so that only an authorized
   * user can send a request to it.
   */
  @Get('me')
  @UseGuards(AuthGuard)
  @GetUserApiDocs()
  getUser(@Headers() headers: any) {
    return this.authService.getUser(headers)
  }
}
