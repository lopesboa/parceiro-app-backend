import { UserRepository } from '@/modules/users/domain';
import { Inject, NotFoundException } from '@nestjs/common';
import { UsersToRolesRepository } from '../../domain/repositories';

export class AddRoleToUserImplementation {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('UsersToRolesRepository')
    private readonly usersToRolesRepository: UsersToRolesRepository,
  ) {}

  async execute(params) {
    try {
      const user = await this.userRepository.findOne(params.userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      this.usersToRolesRepository.save({
        user_id: params.userId,
        role_id: params.roleId,
        application_id: params.applicationId,
      });

      // await this.usersToRolesRepository.update(
      //   'token_id = $1, last_access = now()',
      //   [userToken.token_id, job.data.userId],
      //   'user_id = $2',
      // );
    } catch (error) {}
  }
}
