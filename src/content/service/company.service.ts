// src/company/service/company.service.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Company } from '../entity/company.entity'

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find()
  }

  async findOne(id: string): Promise<Company> {
    return this.companyRepository.findOne({ where: { id } })
  }

  async create(name: string): Promise<Company> {
    const company = this.companyRepository.create({ name })
    return this.companyRepository.save(company)
  }
}
