import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { User } from 'src/user/entity'
import { Content } from 'src/content/entity'

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @OneToMany(() => User, (user) => user.company)
  users: User[]

  @OneToMany(() => Content, (content) => content.company)
  contents: Content[]
}
