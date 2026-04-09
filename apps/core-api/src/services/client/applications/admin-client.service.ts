import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { ClientRepository } from '../repository/client.repository';

@Injectable()
export class AdminClientService extends DddService {
  constructor(private readonly clientRepository: ClientRepository) {
    super();
  }
}
