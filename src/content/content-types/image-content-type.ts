import { BaseContentType } from './base-content-type'
import { Content } from '../entity/content.entity'
import { ProvisionDto } from '../dto/provision.dto'

export class ImageContentType extends BaseContentType {
  constructor() {
    super('image')
  }

  validate(content: Content): void {
    super.validate(content)
    if (!content.url.match(/\.(jpg|jpeg|png|gif)$/)) {
      throw new Error('Image URL must point to a valid image file')
    }
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
      type: 'image',
      url: signedUrl,
      allow_download: true,
      is_embeddable: true,
      format:
        require('path')
          .extname(content.url || '')
          .slice(1) || 'jpg',
      bytes,
      metadata: {
        resolution: content.metadata?.resolution || '1920x1080',
        aspect_ratio: content.metadata?.aspect_ratio || '16:9',
      },
    }
  }
}
