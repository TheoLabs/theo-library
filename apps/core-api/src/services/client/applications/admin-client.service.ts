import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { ClientRepository } from '../repository/client.repository';
import { PaginationOptions } from '@libs/utils';
import { Transactional } from '@libs/decorators';
import { Client } from '../domain/client.model';

@Injectable()
export class AdminClientService extends DddService {
  constructor(private readonly clientRepository: ClientRepository) {
    super();
  }

  @Transactional()
  async create({
    name,
    subDomain,
    contactNumber,
    address,
  }: {
    name: string;
    subDomain: string;
    contactNumber: string;
    address: string;
  }) {
    const [existingClient] = await this.clientRepository.find({ subDomain });

    if (existingClient) {
      throw new BadRequestException(`${subDomain}의 도메인은 이미 사용중입니다.`, {
        cause: `해당 서브도메인은 이미 사용중입니다.`,
      });
    }

    const client = Client.of({ name, subDomain, contactNumber, address });

    await this.clientRepository.save([client]);
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
