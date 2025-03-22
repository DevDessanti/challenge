import { Content } from '../entity/content.entity'
import { ProvisionDto } from '../dto/provision.dto'
import { ContentTypeStrategy } from './content-type.interface'

export abstract class BaseContentType implements ContentTypeStrategy {
  constructor(public readonly type: string) {}

  validate(content: Content): void {
    if (content.type !== this.type) {
      throw new Error(`Invalid type: expected ${this.type}, got ${content.type}`)
    }
    if (!content.url) {
      throw new Error('URL is required')
    }
  }

  protected getBytes(content: Content): number {
    // Verifica se a URL é um caminho local (ex.: /uploads/file.pdf)
    if (content.url && !content.url.startsWith('http')) {
      try {
        const filePath = content.url
        return require('fs').existsSync(filePath) ? require('fs').statSync(filePath).size : 0
      } catch (error) {
        return 0
      }
    }
    return 0 // Para URLs externas, não calculamos bytes
  }

  abstract provision(content: Content, signedUrl: string): ProvisionDto
}
