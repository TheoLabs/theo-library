import { Injectable, NotFoundException } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { AdminRepository } from '../repository/admin.repository';
import { PaginationOptions } from '@libs/utils';
import { AdminResponseDto } from '../controllers/dto';
import { EventHandler, Transactional } from '@libs/decorators';
import { ClientCreatedEvent } from '../../client/domain/events';
import { QueueName } from '@databases';
import { Admin } from '../domain/admin.entity';
import { AdminRoleType, AdminStatusType } from '@theo-library/shared';

@Injectable()
export class AdminMemberService extends DddService {
  constructor(private readonly adminRepository: AdminRepository) {
    super();
  }

  async list(
    {
      searchKey,
      searchValue,
      clientId,
      roles,
    }: { searchKey?: string; searchValue?: string; clientId?: number; roles?: AdminRoleType[] },
    options?: PaginationOptions
  ) {
    const [admins, total] = await Promise.all([
      this.adminRepository.find({ searchKey, searchValue, clientId, roles }, { options }),
      this.adminRepository.count({ searchKey, searchValue, clientId, roles }),
    ]);

    return { items: admins.map((admin) => admin.toInstance(AdminResponseDto)), total };
  }

  @Transactional()
  async changeStatus({ id, status }: { id: string; status: AdminStatusType }) {
    const [admin] = await this.adminRepository.find({ id });

    if (!admin) {
      throw new NotFoundException('관리자를 찾을 수 없습니다.', { cause: '관리자를 찾을 수 없습니다.' });
    }

    admin.changeStatus(status);

    await this.adminRepository.save([admin]);
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
