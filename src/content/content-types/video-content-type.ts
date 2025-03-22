import { BaseContentType } from './'
import { Content } from '../entity/content.entity'
import { ProvisionDto } from '../dto/provision.dto'

export class VideoContentType extends BaseContentType {
  constructor() {
    super('video')
  }

  validate(content: Content): void {
    super.validate(content)
    if (!content.url.includes('youtube') && !content.url.includes('vimeo')) {
      throw new Error('Video URL must be from YouTube or Vimeo')
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
      type: 'video',
      url: signedUrl,
      allow_download: false,
      is_embeddable: true,
      format:
        require('path')
          .extname(content.url || '')
          .slice(1) || 'mp4',
      bytes,
      metadata: {
        duration: content.metadata?.duration || Math.floor(bytes / 100000) || 10,
        resolution: content.metadata?.resolution || '1080p',
      },
    }
  }
}
