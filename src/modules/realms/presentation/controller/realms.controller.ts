import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateRealmUseCase } from '../../application/types';
import { CreateRealmInputDTO } from '../../application/dtos';

@Controller('realms')
export class RealmsController {
  constructor(
    @Inject('CreateRealmUseCase')
    private readonly creteRealmUseCase: CreateRealmUseCase,
  ) {}

  @Get()
  async getRealms() {}

  @Post()
  async createRealm(@Body() params: CreateRealmInputDTO) {
    await this.creteRealmUseCase.execute(params);
  }
}
