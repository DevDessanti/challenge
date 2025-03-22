import { BaseContentType } from './base-content-type'
import { Content } from '../entity/content.entity'
import { ProvisionDto } from '../dto/provision.dto'

export class LinkContentType extends BaseContentType {
  constructor() {
    super('link')
  }

  validate(content: Content): void {
    super.validate(content)
    if (!content.url.match(/^https?:\/\//)) {
      throw new Error('URL must be a valid HTTP/HTTPS link')
    }
  }

  provision(content: Content, signedUrl: string): ProvisionDto {
    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description,
      total_likes: content.total_likes,
      type: 'link',
      url: content.url, // Links não precisam de URL assinada
      allow_download: false,
      is_embeddable: true,
      format: null,
      bytes: 0,
      metadata: {
        trusted: content.metadata?.trusted || content.url?.includes('https') || false,
      },
    }
  }
}
