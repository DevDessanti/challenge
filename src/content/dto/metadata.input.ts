// src/content/dto/metadata.input.ts
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class MetadataInput {
  @Field(() => Object)
  data: Record<string, any>
}
