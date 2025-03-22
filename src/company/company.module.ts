import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './entity/company.entity'
import { CompanyResolver } from '../content/resolver/company.resolver'
import { CompanyService } from '../content/service/company.service'

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyResolver, CompanyService],
})
export class CompanyModule {}
