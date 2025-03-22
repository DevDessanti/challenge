// import { DataSource } from 'typeorm'
// import { Injectable } from '@nestjs/common'
// import { Content } from 'src/content/entity'

// @Injectable()
// export class ContentRepository {
//   constructor(private readonly dataSource: DataSource) {}

//   async findOne(contentId: string): Promise<Content | null> {
//     const [content] = await this.dataSource.query<Content[]>(
//       `SELECT * FROM contents WHERE id = '${contentId}' AND deleted_at IS NULL LIMIT 1`,       ///VULNERAVEL A SQL INJECTION
//     )

//     return content || null
//   }
// }

// src/content/repository/content.repository.ts
// src/content/repository/content.repository.ts
// src/content/repository/content.repository.ts
// src/content/repository/content.repository.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Content } from '../entity/content.entity'

@Injectable()
export class ContentRepository {
  constructor(
    @InjectRepository(Content)
    private readonly repository: Repository<Content>,
  ) {}

  async findOne(contentId: string): Promise<Content | null> {
    return this.repository
      .createQueryBuilder('content')
      .leftJoinAndSelect('content.company', 'company')
      .where('content.id = :id', { id: contentId })
      .andWhere('content.deleted_at IS NULL')
      .getOne()
  }

  async save(content: Content): Promise<Content> {
    return this.repository.save(content)
  }
}
