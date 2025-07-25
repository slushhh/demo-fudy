import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { UserDto } from './user.dto'
import { Users } from 'src/entities/users.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly usersRepo: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Creates a user in the database, while checking
   * if a record with similar data exists, and if so,
   * returns an error
   */
  async createUser(userDto: UserDto) {
    const { email } = userDto
    const isUserExists = await this.usersRepo.findOne({ where: { email } })

    if (!isUserExists) {
      const record = this.usersRepo.create(userDto)
      const user = await this.usersRepo.save(record)

      return {
        id: user.id,
        email: user.email,
        access_token: await this.jwtService.signAsync({
          id: user.id,
          email: user.email,
        }),
      }
    }

    throw new HttpException('User already exists', 202)
  }
}
