import Collection from "./Collection";

export function SampleCall() {
  const stack: Stack<number> = new Stack(5, true);
  stack.Log();

  stack.Push(2);
  stack.Push(4);
  stack.Push(6);
  stack.Push(8);
  stack.Push(10);

  stack.Log();
  stack.Print();
}
export class Stack<T = number | undefined> extends Collection<T> {
  public topIndex!: number;
  private stack: T[] | undefined[];
  private readonly isDebug: boolean;
  private readonly isDynamic: boolean;

  public constructor(size: number = 0, isDebug: boolean = false) {
    super();
    this.stack = new Array<T>(size);
    this.isDebug = isDebug;
    this.isDynamic = size === 0;
    this.Reset();
  }

  public Push = (newValue: T): void => {
    if (!this.isDynamic && this.IsFull()) {
      this.LogError(
        "Stack",
        "Full",
        "Push",
        this.GetSize(),
        this.topIndex,
        "Top Index"
      );
      return;
    }

    this.stack[++this.topIndex] = newValue;

    if (this.isDebug)
      this.LogSuccess(
        "Stack",
        "Pushed/Added",
        this.stack,
        this.topIndex,
        "Top Index"
      );
  };

  public readonly Pop = (): T | undefined => {
    if (this.IsEmpty()) {
      this.LogError(
        "Stack",
        "Empty",
        "Pop",
        this.GetSize(),
        this.topIndex,
        "Top Index"
      );
      return undefined;
    }

    if (this.isDebug)
      this.LogSuccess(
        "Stack",
        "Removed/Popped",
        this.stack,
        this.topIndex,
        "Top Index"
      );

    const result = this.stack[this.topIndex];
    delete this.stack[this.topIndex--];

    return result;
  };

  public readonly GetStack = (): T[] => this.stack as T[];

  public override readonly GetSize = (): number => this.stack.length - 1;

  public override readonly IsEmpty = (): boolean => this.topIndex <= -1;

  public override readonly IsFull = (): boolean =>
    this.topIndex >= this.GetSize();

  public override readonly Peek = (): T | undefined =>
    this.stack[this.topIndex];

  public override readonly ToString = (): string => this.stack.toString();

  public override readonly Log = (): void =>
    console.log("StackData: " + this.ToString());

  public override readonly Reset = () => (this.topIndex = -1);
}
