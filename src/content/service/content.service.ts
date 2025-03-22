// src/content/service/content.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Content } from '../entity/content.entity'
import { ProvisionDto } from '../dto/provision.dto'
import { statSync } from 'fs'
import { join, normalize, sep } from 'path'
import { Logger } from '@nestjs/common'
import { CONTENT_TYPES } from '../config/content-types'

@Injectable()
export class ContentService {
  private readonly logger = new Logger(ContentService.name)

  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async createContent(content: Partial<Content>): Promise<Content> {
    const newContent = this.contentRepository.create(content)
    return this.contentRepository.save(newContent)
  }

  async provision(contentId: string, user: any): Promise<ProvisionDto> {
    const content = await this.contentRepository.findOne({ where: { id: contentId } })
    if (!content) {
      throw new NotFoundException(`Content with ID ${contentId} not found`)
    }

    const format = this.getFormatFromType(content.type)
    const bytes = this.getFileSize(content.url)
    const { allow_download, is_embeddable } = this.getContentPermissions(content.type, bytes)

    return {
      id: content.id,
      title: content.title,
      type: content.type,
      description: content.description,
      cover: content.cover,
      url: content.url,
      created_at: content.created_at,
      allow_download,
      is_embeddable,
      format,
      bytes,
      total_likes: content.total_likes,
      metadata: content.metadata,
    }
  }

  private getFormatFromType(type: string): string {
    if (!type || !type.includes('/')) {
      this.logger.warn(`Invalid content type: ${type}, defaulting to 'unknown'`)
      return 'unknown'
    }

    const format = type.split('/')[1].toLowerCase()
    const contentTypeConfig = CONTENT_TYPES[type as keyof typeof CONTENT_TYPES]
    const finalFormat = contentTypeConfig?.format || format
    this.logger.log(`Extracted format: ${finalFormat} from type: ${type}`)
    return finalFormat
  }

  private getFileSize(url: string): number {
    try {
      const basePath = join(process.cwd(), 'static')
      // Sanitizar o caminho para evitar path traversal
      const sanitizedPath = normalize(url.replace(/^\/static\//, '')).replace(/\\/g, '/')
      // Verificar se o caminho contém ".." para evitar acesso a diretórios superiores
      if (sanitizedPath.includes('..')) {
        throw new Error('Invalid file path: Path traversal detected')
      }
      const filePath = join(basePath, sanitizedPath)
      const stats = statSync(filePath)
      const fileSize = stats.size
      this.logger.log(`File size for ${url}: ${fileSize} bytes`)
      return fileSize
    } catch (error) {
      this.logger.error(`Failed to get file size for ${url}: ${error.message}`)
      return 0
    }
  }

  private getContentPermissions(
    type: string,
    bytes: number,
  ): { allow_download: boolean; is_embeddable: boolean } {
    const contentTypeConfig = CONTENT_TYPES[type as keyof typeof CONTENT_TYPES]
    const is_embeddable = contentTypeConfig?.is_embeddable ?? false
    let allow_download = contentTypeConfig?.allow_download ?? false

    const maxDownloadSize = 100 * 1024 * 1024 // 100 MB em bytes
    if (bytes > maxDownloadSize) {
      allow_download = false
      this.logger.log(
        `File size (${bytes} bytes) exceeds max download size (${maxDownloadSize} bytes), disabling download`,
      )
    }

    return { allow_download, is_embeddable }
  }
}
