import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class CompanyType {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  created_at: Date

  @Field()
  updated_at: Date

  @Field({ nullable: true })
  deleted_at?: Date
}
