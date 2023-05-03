import Collection from "./Collection";

type QueuePos = {
  front: number;
  rear: number;
};

export interface IQueue<T = number | undefined> {
  Enqueue: (newValue: T) => void;
  Dequeue: () => T | undefined;
}
export abstract class Queue<T = number | undefined>
  extends Collection<T>
  implements IQueue<T>
{
  protected collectionName: string;
  protected isDebug: boolean = false;

  protected queue: T[] | undefined[] = [];

  protected frontIndex: number = -1;
  protected rearIndex: number = -1;
  protected readonly size: number = -1;

  public constructor(
    size: number,
    collectionName: string,
    isDebug: boolean = false
  ) {
    super();
    this.size = size;
    this.isDebug = isDebug;
    this.queue.length = size;
    this.collectionName = collectionName;
    this.Reset();
  }

  public abstract readonly Enqueue: (newValue: T) => void;

  public abstract readonly Dequeue: () => T | undefined;

  public readonly IsFrontEnded = (): boolean =>
    this.frontIndex > this.rearIndex;

  public readonly IsRearEnded = (): boolean => this.rearIndex >= this.GetSize();

  public readonly IsNextEmpty = (index: number): boolean => {
    console.log(
      `this.queue[${index + 1}](${this.queue[index + 1]}) === undefined = ${
        this.queue[index + 1] === undefined
      } `
    );
    return this.queue[index + 1] === undefined;
  };

  public readonly GetFront = (): number | undefined => this.frontIndex;

  public readonly GetRear = (): number | undefined => this.rearIndex;

  public readonly GetQueue = (): T[] => this.queue as T[];

  public readonly GetIndices = (): QueuePos => {
    return { front: this.frontIndex, rear: this.rearIndex };
  };

  public override readonly GetSize = (): number => this.queue.length - 1;

  public override readonly IsEmpty = (): boolean => this.frontIndex === -1;

  public override readonly IsFull = (): boolean =>
    this.frontIndex === 0 && this.IsRearEnded();

  public override readonly Peek = (): T | undefined =>
    this.queue[this.frontIndex];

  public override readonly ToString = (): string => this.queue.toString();

  public override readonly Log = (): void => {
    console.log(this.collectionName + ": ");
    console.log(this.queue);
  };

  public override readonly Reset = (): void => {
    if (this.isDebug) console.log(this.collectionName + " is reset");
    this.frontIndex = -1;
    this.rearIndex = -1;
  };
}

export class LinearQueue<T = number | undefined> extends Queue<T> {
  public constructor(size: number, isDebug: boolean = false) {
    super(size, "LinearQueue", isDebug);
  }

  public override readonly Enqueue = (newValue: T): void => {
    if (this.IsFull()) {
      this.LogError(
        this.collectionName,
        "Full",
        "Added/Enqueued",
        this.GetSize(),
        this.rearIndex,
        "Rear Index"
      );
      return;
    }

    if (this.IsEmpty()) this.frontIndex = 0;

    this.queue[++this.rearIndex] = newValue;

    if (this.isDebug) {
      this.Log();
      this.LogSuccess(
        this.collectionName,
        "Added/Enqueued",
        this.queue,
        this.rearIndex,
        "Rear index"
      );
    }
  };

  public Dequeue = (): T | undefined => {
    if (this.IsEmpty()) {
      this.LogError(
        this.collectionName,
        "Empty",
        "Dequeue",
        this.size,
        this.frontIndex,
        "Front Index"
      );
      return undefined;
    }

    if (this.isDebug) {
      this.Log();
      this.LogSuccess(
        this.collectionName,
        "Removed/Dequeued",
        this.queue,
        this.frontIndex,
        "Front index"
      );
    }
    const result: T | undefined = this.queue[this.frontIndex];
    this.queue[this.frontIndex++] = undefined;

    if (this.IsFrontEnded()) this.Reset();

    return result;
  };
}
