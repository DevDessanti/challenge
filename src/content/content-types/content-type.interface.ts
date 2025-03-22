import { ProvisionDto } from '../dto/provision.dto'
import { Content } from '../entity/content.entity'

export interface ContentTypeStrategy {
  type: string
  validate(content: Content): void
  provision(content: Content, signedUrl: string): ProvisionDto
}
