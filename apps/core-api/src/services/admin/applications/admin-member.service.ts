import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { AdminRepository } from '../repository/admin.repository';
import { PaginationOptions } from '@libs/utils';

@Injectable()
export class AdminMemberService extends DddService {
  constructor(private readonly adminRepository: AdminRepository) {
    super();
  }

  async list({}, options?: PaginationOptions) {
    const [admins, total] = await Promise.all([this.adminRepository.find({}, options), this.adminRepository.count({})]);

    return { items: admins, total };
  }
}
