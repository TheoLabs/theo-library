import { Injectable, NotFoundException } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { ClientRepository } from '../repository/client.repository';
import { PaginationOptions } from '@libs/utils';

@Injectable()
export class AdminClientService extends DddService {
  constructor(private readonly clientRepository: ClientRepository) {
    super();
  }

  async list({ searchKey, searchValue }: { searchKey?: string; searchValue?: string }, options?: PaginationOptions) {
    const [clients, total] = await Promise.all([
      this.clientRepository.find({ searchKey, searchValue }, { options }),
      this.clientRepository.count({ searchKey, searchValue }),
    ]);

    return { items: clients, total };
  }

  async retrieve({ id }: { id: number }) {
    const [client] = await this.clientRepository.find({ id });

    if (!client) {
      throw new NotFoundException('존재하지 않는 고객사입니다.', { cause: '존재하지 않는 고객사입니다.' });
    }

    return client;
  }
}
