import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const port: number = Number(process.env.PORT);
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Aurora May')
    .setDescription('Aurora May')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  app.enableCors();
  await app.listen(port);
  Logger.log('info', `Server running on http://localhost:${port}`);
}
bootstrap();
