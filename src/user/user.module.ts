// src/user/user.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entity'
import { AuthGuard } from './guard'
import { UserRepository } from './repository'
import { AuthService } from './service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthGuard, UserRepository, AuthService],
  exports: [AuthGuard, AuthService],
})
export class UserModule {}
