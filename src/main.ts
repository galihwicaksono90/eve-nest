import { cleanupOpenApiDoc } from 'nestjs-zod';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { env } from '@/utils/config';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.setGlobalPrefix('api', {
    exclude: ['/auth'],
  });

  const config = new DocumentBuilder()
    .setTitle('Eve')
    .setDescription('Eve Salon')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);

  app.use(
    '/api-docs',
    apiReference({
      sources: [
        {
          content: cleanupOpenApiDoc(documentFactory),
          title: 'App',
        },
        {
          url: '/api/auth/open-api/generate-schema',
          title: 'Auth',
        },
      ],
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(env.PORT ?? 3000);
}
bootstrap();
