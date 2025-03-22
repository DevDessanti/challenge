// src/content/dto/create-content.input.ts
import { InputType, Field } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { IsString, IsOptional, IsIn, IsNotEmpty, IsObject, Matches } from 'class-validator'
import { SUPPORTED_MIME_TYPES } from '../config/content-types'

@InputType()
class MetadataInput {
  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  @IsObject()
  data: Record<string, any>
}

@InputType()
export class CreateContentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsIn(SUPPORTED_MIME_TYPES, {
    message: 'type must be a valid MIME type (e.g., video/mp4, text/plain, image/png)',
  })
  type: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\/static\//, {
    message: 'url must start with /static/',
  })
  url: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cover?: string

  @Field(() => MetadataInput, { nullable: true })
  @IsOptional()
  metadata?: MetadataInput
}
