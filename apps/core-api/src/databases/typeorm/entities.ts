import { DddEvent } from '@libs/ddd';
import { Admin } from '@services/admin/domain/admin.entity';
import { Client } from '@services/client/domain/client.model';
import { Contract } from '@services/contract/domain/contract.entity';
import { Category } from '@services/category/domain/category.entity';

export default [DddEvent, Admin, Client, Contract, Category];
