import { Test, TestingModule } from '@nestjs/testing'
import { suite, test } from '@testdeck/jest'
import { UserRepository } from 'src/user/repository'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from 'src/user/entity'

@suite
export class UserRepositoryUnitTest {
  private userRepository: UserRepository
  private repository: Repository<User>

  private readonly mockUser: User = {
    id: '12345',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'hashed-password',
    company: { id: '6789', name: 'Tech Company' },
  } as User

  async before() {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile()

    this.userRepository = module.get<UserRepository>(UserRepository)
    this.repository = module.get<Repository<User>>(getRepositoryToken(User))
  }

  @test
  async '[findById] Should return user when found'() {
    jest.spyOn(this.repository, 'findOne').mockResolvedValue(this.mockUser)

    const result = await this.userRepository.findById(this.mockUser.id)

    expect(this.repository.findOne).toHaveBeenCalledWith({
      where: { id: this.mockUser.id },
      relations: ['company'],
    })
    expect(result).toStrictEqual(this.mockUser)
  }

  @test
  async '[findById] Should return null if user is not found'() {
    jest.spyOn(this.repository, 'findOne').mockResolvedValue(null)

    const result = await this.userRepository.findById('non-existent-id')

    expect(this.repository.findOne).toHaveBeenCalledWith({
      where: { id: 'non-existent-id' },
      relations: ['company'],
    })
    expect(result).toBeNull()
  }

  @test
  async '[findById] Should throw error if database query fails'() {
    jest.spyOn(this.repository, 'findOne').mockRejectedValue(new Error('Database error'))

    await expect(this.userRepository.findById(this.mockUser.id)).rejects.toThrow('Database error')
  }
}
