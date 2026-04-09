export const ClientStatus = {
  PENDING: "pending",
  ACTIVE: "active",
  SUSPENDED: "suspended",
} as const;
export type ClientStatus = (typeof ClientStatus)[keyof typeof ClientStatus];

export interface IClientResponse {
  id: string;
  name: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
