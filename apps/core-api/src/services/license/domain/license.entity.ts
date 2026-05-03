import { DddAggregate } from '@libs/ddd';
import { Series } from '@services/series/domain/series.entity';
import { LicenseStatus } from '@theo-library/shared';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

type Ctor = {
  clientId: number;
  seriesId: number;
  seriesTitle: string;
  contractCopyCount: number;
};

@Entity()
@Index('idx_license_client_id', ['clientId'])
export class License extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'Client ID' })
  clientId: number;

  @Column({ comment: 'Series ID' })
  seriesId: number;

  @Column({ comment: '시리즈명(조회용)' })
  seriesTitle: string;

  @Column({ comment: '계약 수량' })
  contractCopyCount: number;

  @Column({ comment: '대출 가능 수량' })
  availableCopyCount: number;

  @Column({ type: 'enum', enum: LicenseStatus, comment: '라이센스 상태' })
  status: LicenseStatus;

  @ManyToOne(() => Series, (series) => series.licenses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seriesId' })
  series: Series;

  private constructor(args: Ctor) {
    super();

    if (args) {
      this.clientId = args.clientId;
      this.seriesId = args.seriesId;
      this.seriesTitle = args.seriesTitle;
      this.contractCopyCount = args.contractCopyCount;
      this.availableCopyCount = args.contractCopyCount;

      // NOTE: 초기화
      this.status = LicenseStatus.ACTIVE;
    }
  }

  static of(args: Ctor) {
    if (args.contractCopyCount <= 0) {
      throw new BadRequestException(`계약 수량은 0보다 커야 합니다.`, { cause: '계약 수량은 0보다 커야 합니다.' });
    }

    return new License(args);
  }
}
