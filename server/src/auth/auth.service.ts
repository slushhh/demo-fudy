import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Users } from 'src/entities/users.entity'
import { UserDto } from 'src/user/user.dto'

import 'dotenv/config'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly usersRepo: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Logs the user in. Returns an error if no
   * user with the required e-mail address is
   * found or if the password is invalid
   */
  async logUser(userDto: UserDto) {
    const { email, password } = userDto

    const user = await this.usersRepo.findOne({ where: { email } })

    if (user) {
      const isPwdValid = await bcrypt.compare(password, user.password)
      if (!isPwdValid) throw new UnauthorizedException('Password is incorrect')

      return {
        id: user.id,
        email: user.email,
        access_token: await this.jwtService.signAsync({
          id: user.id,
          email: user.email,
        }),
      }
    } else {
      throw new NotFoundException('No such user found')
    }
  }

  /**
   * Returns data about the requested user
   * if such a user is found in the database
   */
  async getUser(headers: Record<string, string>) {
    const userId = headers.userid

    if (userId) {
      const user = await this.usersRepo.findOne({ where: { id: +userId } })

      if (user) {
        return {
          id: user.id,
          email: user.email,
        }
      }
    }

    throw new NotFoundException('No such user found')
  }

  /**
   * Validates the provided token
   */
  async validateToken(headers: Record<string, string>) {
    const [type, token] = headers.authorization?.split(' ') ?? []

    if (type === 'Bearer' && token) {
      try {
        await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        })
      } catch {
        throw new UnauthorizedException()
      }
    }
  }
}
