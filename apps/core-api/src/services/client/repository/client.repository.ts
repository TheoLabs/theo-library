import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Client } from '../domain/client.model';

@Injectable()
export class ClientRepository extends DddRepository<Client> {
  entityClass = Client;
}
