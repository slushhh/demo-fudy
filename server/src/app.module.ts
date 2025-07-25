import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { Users } from './entities/users.entity'

import 'dotenv/config'

/**
 * Main module of the app
 *
 * We don't use a controller as we are using
 * a static assets processing module that will
 * return our React application on any requests
 *
 * Note: The React app must be precompiled to
 * work correctly
 */
@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Users],
      synchronize: true, // Remove when in prod
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist'),
    }),
  ],
})
export class AppModule {}
