import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CompanyService } from '../service/company.service'
import { CompanyType } from '../graphql/company.type'

@Resolver(() => CompanyType)
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Query(() => [CompanyType], { name: 'companies' })
  async findAll(): Promise<CompanyType[]> {
    return this.companyService.findAll()
  }

  @Query(() => CompanyType, { name: 'company' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<CompanyType> {
    return this.companyService.findOne(id)
  }

  @Mutation(() => CompanyType)
  async createCompany(@Args('name', { type: () => String }) name: string): Promise<CompanyType> {
    return this.companyService.create(name)
  }
}
