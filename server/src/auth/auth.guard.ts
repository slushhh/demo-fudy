import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import 'dotenv/config'

/**
 * A guard that checks the validity of the
 * token with each request, and determines
 * whether the client is authorized to request
 * the resource or not.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest()
    const [type, token] = req.headers.authorization?.split(' ') ?? []

    if (type === 'Bearer' && token) {
      try {
        await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        })

        return true
      } catch {
        throw new UnauthorizedException()
      }
    }

    throw new UnauthorizedException()
  }
}
