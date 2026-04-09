import { Module } from '@nestjs/common';
import { AdminClientController } from './controllers/admin-client.controller';
import { AdminClientService } from './applications/admin-client.service';
import { ClientRepository } from './repository/client.repository';

@Module({
  controllers: [AdminClientController],
  providers: [AdminClientService, ClientRepository],
  exports: [ClientRepository],
})
export class AdminClientModule {}
