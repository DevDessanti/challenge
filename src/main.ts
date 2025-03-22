// src/main.ts
import * as express from 'express'
import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configurar o ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas no DTO
      transform: true, // Transforma automaticamente os payloads em instâncias do DTO
      transformOptions: { enableImplicitConversion: true }, // Permite conversão implícita
    }),
  )

  // Servir arquivos estáticos do diretório 'static' na rota '/uploads'
  app.use('/uploads', express.static(join(__dirname, '..', 'static')))

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
