import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { CreateUserInputDTO } from '../dtos';
import { CreateUserUseCase } from '../types';
import { UserRepository } from '../../domain';
import { Hash } from '@/common/cryptography/adapters/types';

@Injectable()
export class CreateUser implements CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('CryptographAdapter') private readonly cryptographAdapter: Hash,
  ) {}

  async execute(createUserDTO: CreateUserInputDTO) {
    const hashedPassword = await this.cryptographAdapter.hash(
      createUserDTO.password,
    );

    const userExist = await this.userRepository.findOne({
      email: createUserDTO.email,
    });

    if (userExist?.email) {
      throw new ConflictException('A user with this email already exists.');
    }

    const user = {
      first_name: createUserDTO.firstName,
      last_name: createUserDTO.lastName,
      email: createUserDTO.email,
      application_id: createUserDTO.applicationId,
      password: hashedPassword,
    };

    await this.userRepository.save(user);
  }
}
