// src/content/entity/content.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm'
import { Company } from 'src/company/entity'

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn('uuid') // Certifique-se de que este decorador está presente
  id: string

  @Column()
  title: string

  @Column()
  type: string

  @Column({ nullable: true })
  description?: string

  @Column()
  url: string

  @Column({ nullable: true })
  cover?: string

  @Column({ type: 'int' })
  total_likes: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date | null

  @Column()
  company_id: string

  @ManyToOne(() => Company, (company) => company.contents)
  @JoinColumn({ name: 'company_id' })
  company: Company

  @Column({ type: 'jsonb', default: '{}' })
  metadata: Record<string, any>
}
