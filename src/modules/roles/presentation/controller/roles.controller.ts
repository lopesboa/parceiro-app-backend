import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RolesService } from '../../application/types';
import { CreateRoleInputDTO } from '../../application/dtos';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject('RolesService')
    private readonly rolesService: RolesService,
  ) {}

  @Post()
  signUp(@Body() data: CreateRoleInputDTO) {
    return this.rolesService.createRoleHandler(data);
  }
}
