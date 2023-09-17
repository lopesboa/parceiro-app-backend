import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS_NAME } from '@/common/config';

@Injectable()
export class RoleCreatedListener {
  constructor(
    @InjectQueue('default')
    private readonly queue: Queue,
  ) {}

  @OnEvent(EVENTS_NAME.REALM_CREATED)
  async handle(event) {
    await this.queue.add(EVENTS_NAME.REALM_CREATED, event);
  }
}
