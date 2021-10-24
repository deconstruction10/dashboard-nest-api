import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import * as csurf from 'csurf';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(csurf());
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
      .setTitle('Users')
      .setDescription('The Users API')
      .setVersion('1.0')
      .addTag('users')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
