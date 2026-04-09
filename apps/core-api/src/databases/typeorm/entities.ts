import { DddEvent } from '@libs/ddd';
import { Admin } from '../../services/admin/domain/admin.entity';
import { Client } from '../../services/client/domain/client.model';

export default [DddEvent, Admin, Client];
