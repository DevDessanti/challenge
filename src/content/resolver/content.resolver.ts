import { Logger, UseGuards, UnauthorizedException } from '@nestjs/common'
import { Resolver, Args, Context, Query, Mutation } from '@nestjs/graphql'
import { ContentService } from '../service/content.service'
import { ProvisionDto } from '../dto/provision.dto'
import { CreateContentInput } from '../dto/create-content.input'
import { AuthGuard } from 'src/user/guard'
import { ContentType } from '../graphql/contenty.type'
import { Content } from '../entity/content.entity'

@Resolver(() => ContentType)
export class ContentResolver {
  private readonly logger = new Logger(ContentResolver.name)

  constructor(private readonly contentService: ContentService) {}

  @UseGuards(AuthGuard)
  @Query(() => ProvisionDto)
  async provision(
    @Args('content_id') contentId: string,
    @Context('req') req,
  ): Promise<ProvisionDto> {
    this.logger.log(`Provisioning content=${contentId} to user=${req.user.id}`)
    return this.contentService.provision(contentId, req.user)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ContentType)
  async createContent(
    @Args('input') input: CreateContentInput,
    @Context('req') req,
  ): Promise<ContentType> {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('Only admins can create content')
    }

    const content: Partial<Content> = {
      title: input.title,
      type: input.type,
      url: input.url,
      description: input.description || null, // Garantir que description seja null se não fornecido
      cover: input.cover || null, // Garantir que cover seja null se não fornecido
      metadata: input.metadata?.data || {},
      company_id: req.user.company.id,
      total_likes: 0,
    }

    const createdContent = await this.contentService.createContent(content)
    return {
      ...createdContent,
      description: createdContent.description || undefined, // Converter null para undefined para compatibilidade com ContentType
      cover: createdContent.cover || undefined, // Converter null para undefined para compatibilidade com ContentType
      deleted_at: createdContent.deleted_at || undefined, // Converter null para undefined para compatibilidade com ContentType
      metadata: createdContent.metadata || undefined, // Converter null para undefined para compatibilidade com ContentType
    }
  }
}
