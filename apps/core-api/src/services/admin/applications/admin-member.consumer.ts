import { Processor } from '@nestjs/bullmq';
import { QueueName } from '@databases';
import { CommonConsumer } from '@common/event-box';
import { AdminMemberService } from './admin-member.service';
import { ClientCreatedEvent } from '../../client/domain/events';

@Processor(QueueName.ADMIN)
export class AdminMemberConsumer extends CommonConsumer {
  constructor(private readonly adminMemberService: AdminMemberService) {
    super();

    this.methodHandlerMap.set(
      ClientCreatedEvent.name,
      this.adminMemberService.handleClientCreatedEvent.bind(this.adminMemberService)
    );
  }
}
