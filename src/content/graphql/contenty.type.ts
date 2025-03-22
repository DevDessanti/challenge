import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@ObjectType()
export class ContentType {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field()
  type: string

  @Field({ nullable: true })
  description?: string

  @Field()
  url: string

  @Field({ nullable: true })
  cover?: string

  @Field(() => Int)
  total_likes: number

  @Field()
  created_at: Date

  @Field()
  updated_at: Date

  @Field({ nullable: true })
  deleted_at?: Date

  @Field()
  company_id: string

  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, any>
}
