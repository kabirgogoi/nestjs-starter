import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // App port
  const port = configService.get('PORT', 8000);

  // Global config
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // Configure redis store
  const RedisStore = createRedisStore(session);
  const redisClient = createClient({
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
  });

  // Configure cors
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    credentials: true,
  });

  // Setup express-session
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: 'strict',
        path: '/',
        maxAge: 365 * 24 * 60 * 60 * 1000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);
}
bootstrap();
