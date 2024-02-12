import { randomUUID } from "crypto";

export class Id {
  value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }
}
