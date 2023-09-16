import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';

import { CreateRealmInputDTO } from '../../application/dtos';
import { CreateRealmUseCase, ListRealmUseCase } from '../../application/types';

@Controller('realms')
export class RealmsController {
  constructor(
    @Inject('CreateRealmUseCase')
    private readonly creteRealmUseCase: CreateRealmUseCase,
    @Inject('ListRealmUseCase')
    private readonly listRealmUseCase: ListRealmUseCase,
  ) {}

  @Get()
  async getRealms(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.listRealmUseCase.execute({
      limit,
      offset,
    });
  }

  @Post()
  async createRealm(@Body() params: CreateRealmInputDTO) {
    await this.creteRealmUseCase.execute(params);
  }
}
