import { EventEmitter } from 'events';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { CreateUserInputDTO } from '../dtos';
import { CreateUserUseCase } from '../types';
import { UserRepository } from '../../domain';
import { EVENTS_NAME } from '@/common/config';
import { Hash } from '@/common/cryptography/adapters/types';
import { CreateUserTokenEvent } from '@/modules/auth/application';

@Injectable()
export class CreateUser implements CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('CryptographAdapter') private readonly cryptographAdapter: Hash,
    @Inject('EventEmitter')
    private readonly eventEmitter: EventEmitter,
  ) {}

  async execute(createUserDTO: CreateUserInputDTO) {
    const hashedPassword = await this.cryptographAdapter.hash(
      createUserDTO.password,
    );

    const userExist = await this.userRepository.findOne({
      where: 'email = $1',
      values: [createUserDTO.email],
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

    const newUser = await this.userRepository.save(user);
    this.eventEmitter.emit(
      EVENTS_NAME.USER_CREATED,
      new CreateUserTokenEvent(newUser.user_id, createUserDTO.firstName),
    );
  }
}
