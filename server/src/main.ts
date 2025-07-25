import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import * as compression from 'compression'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  /**
   * Configure Swagger for documentation of our APIs
   */
  const config = new DocumentBuilder()
    .setTitle('Fudy')
    .setDescription('Fudy API specs')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  /**
   * Configuration of validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  /**
   * We use compression to reduce the size of
   * the bundle sent to the client and reduce
   * the load of our application
   */
  app.use(compression())

  await app.listen(5500)
}

bootstrap()
