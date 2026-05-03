export const LicenseStatus = {
  ACTIVE: "active",
  CANCEL: "cancel",
} as const;
export type LicenseStatus = (typeof LicenseStatus)[keyof typeof LicenseStatus];

export interface ILicenseCreateBody {
  clientId: number;
  seriesId: number;
  contractCopyCount: number;
}
