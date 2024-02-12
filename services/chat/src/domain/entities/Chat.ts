import { Id } from "../values/Id";

export class Chat {
  id: Id;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: Id, name: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
