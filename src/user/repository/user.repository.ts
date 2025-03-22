import { Injectable } from '@nestjs/common'
import { User } from 'src/user/entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['company'],
    })
  }
}
