import { DddEvent } from '@libs/ddd';

export class ClientCreatedEvent extends DddEvent {
  public readonly clientId: number;

  public readonly subDomain: string;

  constructor(args: { clientId: number; subDomain: string }) {
    super();

    this.clientId = args.clientId;
    this.subDomain = args.subDomain;
  }
}
