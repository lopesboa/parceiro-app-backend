import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS_NAME } from '@/common/config';

@Injectable()
export class UserTokenCreatedListener {
  constructor(
    @InjectQueue('default')
    private readonly queue: Queue,
  ) {}

  @OnEvent(EVENTS_NAME.USER_CREATED)
  async handle(event) {
    await this.queue.add(EVENTS_NAME.USER_CREATED, event);
  }
}
