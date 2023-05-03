type NodeType<T> = Node<T> | undefined;

export class Node<T = number> {
  public static Empty = (): undefined => undefined;

  public constructor(
    private item: T | undefined,
    private next: NodeType<T> = undefined
  ) {}

  public Destroy() {
    this.item = undefined;
    this.next = undefined;
  }

  public IsEmpty(): boolean {
    return this === undefined;
  }

  public SetNext(node: NodeType<T>): void {
    this.next = node;
  }

  public GetNext(): NodeType<T> {
    return this.next;
  }

  public SetItem(item: T): void {
    this.item = item;
  }

  public GetItem(): T | undefined {
    return this.item;
  }

  public ToString(): string {
    return this.next
      ? `[${this.item}] -> ${this.next.ToString()}`
      : `[${this.item}]`;
  }
}

export default class LinkedList<T = number> {
  public head: NodeType<T>;
  public tail: NodeType<T>;
  private count: number = 0;

  public IsEmpty = (): boolean => this.head === undefined;

  public AddTail(item: T): void {
    if (item === undefined) throw new Error(`Cant Add "UNDEFINED" value!`);

    let node: NodeType<T> = new Node<T>(item);

    this.count++;

    if (this.IsEmpty()) {
      this.head = this.tail = node;
      return;
    }

    this.tail?.SetNext(node);
    this.tail = node;
  }

  // Iterator
  public *[Symbol.iterator](): IterableIterator<Node<T>> {
    let current: Node<T> = this.head as Node<T>;
    let counter: number = 0;
    while (counter < this.count) {
      current = counter <= 0 ? current : (current.GetNext() as Node<T>);
      counter++;
      yield current;
    }
  }

  public AddHead(item: T): void {
    if (item === undefined) throw new Error(`Cant Add "UNDEFINED" value!`);

    let node: NodeType<T> = new Node(item, undefined);

    this.count++;

    if (this.IsEmpty()) {
      this.head = this.tail = node;
      return;
    }

    node.SetNext(this.head);

    this.head = node;
  }

  public Insert(item: T, index: number) {
    if (index < 0)
      throw new RangeError(`Index(${index}) should not be less than 0`);

    let target: NodeType<T> = new Node<T>(item);
    let curr: NodeType<T> = this.head;
    let prev: NodeType<T> = undefined;
    let count: number = 0;

    if (index === 0) {
      this.AddHead(item);
      return;
    }
    if (index >= this.count) {
      this.AddTail(item);
      return;
    }

    while (curr) {
      if (count === index) {
        target?.SetNext(curr);
        prev?.SetNext(target);
        this.count++;
        console.log("Inserted the " + target.GetItem() + " at " + index);
        return;
      }
      prev = curr;
      curr = curr?.GetNext();
      count++;
    }
  }

  public IndexOf(item: T): number {
    let index: number = 0;
    let node: NodeType<T> = this.head;

    while (node) {
      if (node?.GetItem() === item) return index;
      node = node.GetNext();
      index++;
    }

    return -1;
  }

  public Has(item: T): boolean {
    return this.IndexOf(item) !== -1;
  }

  public GetCount(): number {
    return this.count;
  }

  public Clear(): void {
    this.count = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  public RemoveHead(): void {
    if (this.IsEmpty())
      throw new Error(
        `Cant Delete on the HEAD index because the LinkedList is empty`
      );

    if (this.head === this.tail) {
      this.head = this.tail = undefined;
      this.count = 0;
      return;
    }

    let node: NodeType<T> = this.head?.GetNext();
    this.head?.SetNext(Node.Empty());
    this.head = node;
    this.count--;
  }

  public RemoveTail(): void {
    if (this.IsEmpty())
      throw new Error(
        `Cant Delete on the TAIL index because the LinkedList is empty`
      );

    if (this.head === this.tail) {
      this.head = this.tail = undefined;
      this.count = 0;
      return;
    }

    let prev: NodeType<T> = this.GetPreviousNode(this.tail);

    if (!prev) return;

    this.tail = prev;
    this.tail?.SetNext(Node.Empty());

    this.count--;
  }

  public RemoveAt(index: number): void {
    if (this.IsEmpty())
      throw new Error(
        `Cant Delete on the TAIL because the LinkedList is empty`
      );

    if (index < 0)
      throw new RangeError(`Index(${index}) should not be less than 0`);

    let curr: NodeType<T> = this.head;
    let prev: NodeType<T> = curr;
    let count: number = 0;

    if (index === 0) {
      this.RemoveHead();
      return;
    }
    if (index >= this.count - 1) {
      this.RemoveTail();
      return;
    }

    while (curr) {
      if (count === index) {
        prev?.SetNext(curr.GetNext());
        curr.SetNext(undefined);
        curr = undefined;
        this.count--;
        return;
      }
      prev = curr;
      curr = curr?.GetNext();
      count++;
    }
  }

  public GetPreviousNode(
    target: NodeType<T>,
    start: NodeType<T> = this.head
  ): NodeType<T> {
    let current: NodeType<T> = start;

    while (current) {
      if (current.GetNext() === target) return current;
      current = current?.GetNext();
    }

    return undefined;
  }

  public ToArray(): T[] {
    const list: T[] = [];
    let node: NodeType<T> = this.head;

    while (node) {
      list.push(node?.GetItem() as T);
      node = node?.GetNext();
    }

    return list;
  }

  public ToString(): string {
    let node: NodeType<T> = this.head;
    let text: string = "";

    while (node) {
      text =
        node?.GetNext() === undefined
          ? text + `[${node.GetItem()}]`
          : text + `[${node.GetItem()}] -> `;
      node = node?.GetNext();
    }

    return text;
  }

  public Reverse(): void {
    let current: NodeType<T> = this.head;
    let next: NodeType<T>;
    let prev: NodeType<T> = undefined;
    while (current) {
      next = current?.GetNext();
      current.SetNext(prev === undefined ? Node.Empty() : prev);
      prev = current;
      current = next;
    }

    [this.tail, this.head] = [this.head, this.tail];
  }

  public GetTailAt(k: number, isErrorMode: boolean = true): NodeType<T> {
    if (k <= 0)
      throw new RangeError(
        "K(" + k + ") should not be less than or equal to 0."
      );

    if (isErrorMode && k > this.count)
      throw new RangeError(
        `K(${k}) Index is greater than the actual size or count(${this.count}) of the Linked List`
      );

    let count: number = 0;
    let first: NodeType<T> = this.head;
    let second: NodeType<T> = first;

    if (k === this.count) return first;

    while (second !== this.tail) {
      if (count >= k - 1) first = first?.GetNext();

      second = second?.GetNext();
      count++;
    }

    return first;
  }
}
