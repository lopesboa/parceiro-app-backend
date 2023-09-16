import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserUseCase, UserEntity, UserRepository } from '../../domain';
import { Hash } from '@/common/cryptography/adapters/types';

@Injectable()
export class CreateUser implements CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('CryptographAdapter') private readonly cryptographAdapter: Hash,
  ) {}

  async execute(createUserDTO: UserEntity) {
    const hashedPassword = await this.cryptographAdapter.hash(
      createUserDTO.password,
    );

    const checkEmail = await this.userRepository.findOne({
      email: createUserDTO.email,
    });

    if (checkEmail?.email) {
      throw new ConflictException('A user with this email already exists.');
    }

    const user = {
      ...createUserDTO,
      password: hashedPassword,
    };

    await this.userRepository.save(user);
  }
}
