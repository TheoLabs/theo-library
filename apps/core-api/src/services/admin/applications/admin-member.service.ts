import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { AdminRepository } from '../repository/admin.repository';
import { PaginationOptions } from '@libs/utils';
import { AdminResponseDto } from '../controllers/dto';
import { Transactional } from '@libs/decorators';

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

  // @Transactional()
}
