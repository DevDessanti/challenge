import { BaseContentType } from './base-content-type'
import { Content } from '../entity/content.entity'
import { ProvisionDto } from '../dto/provision.dto'

export class TextContentType extends BaseContentType {
  constructor() {
    super('text')
  }

  validate(content: Content): void {
    super.validate(content)
  }

  provision(content: Content, signedUrl: string): ProvisionDto {
    const bytes = this.getBytes(content)
    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description,
      total_likes: content.total_likes,
      type: 'text',
      url: signedUrl,
      allow_download: true,
      is_embeddable: false,
      format: 'txt',
      bytes,
      metadata: {
        wordCount: content.metadata?.wordCount || content.description?.split(' ').length || 0,
        language: content.metadata?.language || 'en',
      },
    }
  }
}
