import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '@services/client/repository/client.repository';
import { LicenseRepository } from '@services/license/repository/license.repository';
import { SeriesRepository } from '@services/series/repository/series.repository';
import { LicenseStatus, SeriesStatus } from '@theo-library/shared';
import { License } from '@services/license/domain/license.entity';

@Injectable()
export class AdminLicenseService extends DddService {
  constructor(
    private readonly licenseRepository: LicenseRepository,
    private readonly seriesRepository: SeriesRepository,
    private readonly clientRepository: ClientRepository
  ) {
    super();
  }

  @Transactional()
  async create({
    clientId,
    seriesId,
    contractCopyCount,
  }: {
    clientId: number;
    seriesId: number;
    contractCopyCount: number;
  }) {
    const [existingLicense] = await this.licenseRepository.find({
      clientId,
      seriesId,
      status: LicenseStatus.ACTIVE,
    });
    if (existingLicense) {
      throw new BadRequestException(`이미 라이센스가 존재합니다.`, { cause: '이미 라이센스가 존재합니다.' });
    }

    const [client] = await this.clientRepository.find({ id: clientId });
    if (!client) {
      throw new NotFoundException(`존재하지 않는 도서관입니다.`, { cause: '존재하지 않는 도서관입니다.' });
    }

    const [series] = await this.seriesRepository.find({ id: seriesId });
    if (!series) {
      throw new NotFoundException(`존재하지 않는 시리즈입니다.`, { cause: '존재하지 않는 시리즈입니다.' });
    }

    const canNotCreateStatus = [SeriesStatus.PENDING, SeriesStatus.SUSPENDED];
    if (canNotCreateStatus.find((status) => status === series.status)) {
      throw new BadRequestException(`연재 중이거나 완결된 작품으로만 라이센스 발급이 가능합니다.`, {
        cause: '연재 중이거나 완결된 작품으로만 라이센스 발급이 가능합니다.',
      });
    }

    const license = License.of({
      clientId,
      seriesId,
      seriesTitle: series.title,
      contractCopyCount,
    });

    await this.licenseRepository.save([license]);
  }
}
