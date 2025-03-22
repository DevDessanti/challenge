// src/content/content-types/content-type.factory.ts
import { Injectable } from '@nestjs/common'
import {
  ContentTypeStrategy,
  VideoContentType,
  ImageContentType,
  PdfContentType,
  LinkContentType,
  TextContentType,
} from './'

@Injectable()
export class ContentTypeFactory {
  private strategies: Map<string, ContentTypeStrategy> = new Map()

  constructor() {
    this.register(new VideoContentType())
    this.register(new ImageContentType())
    this.register(new PdfContentType())
    this.register(new LinkContentType())
    this.register(new TextContentType())
  }

  private register(strategy: ContentTypeStrategy): void {
    this.strategies.set(strategy.type, strategy)
  }

  getStrategy(type: string): ContentTypeStrategy {
    const strategy = this.strategies.get(type)
    if (!strategy) {
      throw new Error(`Unsupported content type: ${type}`)
    }
    return strategy
  }
}
