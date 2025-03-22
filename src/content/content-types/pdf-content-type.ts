import { BaseContentType } from './base-content-type'
import { Content } from '../entity/content.entity'
import { ProvisionDto } from '../dto/provision.dto'

export class PdfContentType extends BaseContentType {
  constructor() {
    super('pdf')
  }

  validate(content: Content): void {
    super.validate(content)
    if (!content.url.match(/\.(pdf)$/)) {
      throw new Error('URL must point to a valid PDF file')
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
      type: 'pdf',
      url: signedUrl,
      allow_download: true,
      is_embeddable: false,
      format: 'pdf',
      bytes,
      metadata: {
        author: content.metadata?.author || 'Unknown',
        pages: content.metadata?.pages || Math.floor(bytes / 50000) || 1,
        encrypted: content.metadata?.encrypted || false,
      },
    }
  }
}
