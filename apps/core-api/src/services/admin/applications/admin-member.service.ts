import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { AdminRepository } from '../repository/admin.repository';
import { PaginationOptions } from '@libs/utils';
import { AdminResponseDto } from '../controllers/dto';
import { EventHandler, Transactional } from '@libs/decorators';
import { ClientCreatedEvent } from '../../client/domain/events';
import { QueueName } from '@databases';
import { Admin } from '../domain/admin.entity';
import { AdminRoleType } from '@theo-library/shared';

@Injectable()
export class AdminMemberService extends DddService {
  constructor(private readonly adminRepository: AdminRepository) {
    super();
  }

  async list({ searchKey, searchValue }: { searchKey?: string; searchValue?: string }, options?: PaginationOptions) {
    const [admins, total] = await Promise.all([
      this.adminRepository.find({ searchKey, searchValue }, { options }),
      this.adminRepository.count({ searchKey, searchValue }),
    ]);

    return { items: admins.map((admin) => admin.toInstance(AdminResponseDto)), total };
  }

  @Transactional()
  @EventHandler(ClientCreatedEvent, QueueName.ADMIN, {
    description: '도서관이 생성되면 도서관 계정을 Pending 상태로 생성해준다.',
  })
  async handleClientCreatedEvent(event: ClientCreatedEvent) {
    const { clientId, name, subDomain } = event;

    const admin = Admin.of({
      clientId,
      name,
      email: `${subDomain}@theo.com`,
      role: AdminRoleType.LIBRARY,
    });

    await this.adminRepository.save([admin]);
  }
}
