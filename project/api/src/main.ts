import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe()); // <- Add this line
  app.useGlobalInterceptors(new LogInterceptor());
  await app.listen(8000);
}
bootstrap();
