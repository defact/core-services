import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './app';
import { LoggingInterceptor } from './common/interceptors/logging';
import { TransformInterceptor } from './common/interceptors/transform';
import { ValidationPipe } from './common/pipes/validation';
import { ConfigurationService } from './configuration/service';

const config = new ConfigurationService();

(async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(ApplicationModule, server);

  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const options = new DocumentBuilder()
  .setTitle('Core API')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('port'));
})();
