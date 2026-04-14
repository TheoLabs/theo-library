import { DddEvent } from '@libs/ddd';

export class ClientCreatedEvent extends DddEvent {
  public readonly clientId: number;

  public readonly name: string;

  public readonly subDomain: string;

  constructor(args: { clientId: number; name: string; subDomain: string }) {
    super();

    if (args) {
      this.clientId = args.clientId;
      this.name = args.name;
      this.subDomain = args.subDomain;
    }
  }
}
