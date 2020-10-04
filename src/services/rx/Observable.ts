import { Subscription } from "./Subscription";

export class Observable<T> {
  private subs: number = 0;
  private last: T;
  private triggers: Map<number, (value: T) => void> = new Map();
  constructor(value: T) {
    this.last = value;
  }
  update(value: T): void {
    this.last = value;
    this.triggers.forEach((cb) => {
      cb(value);
    });
  }
  get(): T {
    return this.last;
  }
  subscribe(cb: (value: T) => void): Subscription {
    const id = this.subs++;
    this.triggers.set(id, cb);
    return {
      dispose: () => {
        this.triggers.delete(id);
      },
    };
  }
}
