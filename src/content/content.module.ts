// src/content/content.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Content } from './entity/content.entity'
import { ContentResolver } from './resolver/content.resolver'
import { ContentService } from './service/content.service'
import { UserModule } from '../user/user.module' // Importe o UserModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    UserModule, // Certifique-se de que é o UserModule aqui
  ],
  providers: [ContentResolver, ContentService],
})
export class ContentModule {}
