import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Context, ContextKey } from '@common/context';
import { DddAggregate } from '@libs/ddd';

@Injectable()
@EventSubscriber()
export class TxIdSubscriber implements EntitySubscriberInterface<DddAggregate> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly context: Context
  ) {
    this.dataSource.subscribers.push(this);
  }

  // NOTE: DddAggregate를 상속받은 모든 엔티티를 감시
  listenTo() {
    return DddAggregate;
  }

  beforeInsert(event: InsertEvent<DddAggregate>) {
    const txId = this.context.get<string>(ContextKey.TXID);

    // NOTE: cascade로 인해 저장되는 하위 엔티티들도 모두 이 로직을 탑니다.
    if (txId && event.entity) {
      event.entity['createdBy'] = txId;
      event.entity['updatedBy'] = txId;
    }
  }

  beforeUpdate(event: UpdateEvent<DddAggregate>) {
    const txId = this.context.get<string>(ContextKey.TXID);

    if (txId && event.entity) {
      event.entity['updatedBy'] = txId;
    }
  }
}
