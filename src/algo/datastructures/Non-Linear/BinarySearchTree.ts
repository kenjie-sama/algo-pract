import { LinearQueue } from "../Linear/Queue";
export function TestBST() {
  const bst = new BinarySearchTree(10);
  const arr = [5, 15, 6, 1, 8, 12, 18, 17];

  console.log(bst);
  console.log(arr);

  // bst.Insert(5);
  // bst.Insert(4);
  // bst.Insert(6);

  // bst.Insert(15);
  // bst.Insert(6);

  // bst.Insert(18);
  // bst.Insert(17);

  for (let x of arr) bst.Insert(x);
  console.log(bst.Find(1));

  // for (let x of arr) bst.Find(x);
  // for (let x of arr) bst.GetNode();
}

export function TestBFS() {
  const tree = new BinarySearchTree(20);
  const arr: number[] = [10, 30, 6, 14, 24, 3, 8, 26, 2, 1];

  for (let x of arr) tree.Insert(x);

  console.log(tree);
  console.log("Breadth First Search");
  console.log(tree.BreadthFirstSearch());
}

export class Node {
  public constructor(
    public item: number,
    public left: Node | undefined = undefined,
    public right: Node | undefined = undefined
  ) {}

  public Destroy(): void {
    this.left = undefined;
    this.right = undefined;
    this.item = 0;
  }

  public SetItem(value: number) {
    this.item = value;
  }

  public ToString(): string {
    return `${this.left?.item} <- ${this.item} -> ${this.right?.item}`;
  }

  public static Empty(): Node {
    return new Node(-1);
  }
}

export class BinarySearchTree {
  public root: Node;
  public size: number = 0;
  public constructor(rootValue: number) {
    this.root = new Node(rootValue);
    this.size++;
  }

  public Insert(value: number): void {
    let current: Node = this.GetLeafNode(value);
    this.size++;
    this.CreateChild(value, current);
  }

  public Find(value: number, start: Node = this.root): boolean {
    let next: Node | undefined = start;
    let isFound = false;
    while (next) {
      isFound = next.item === value;
      if (isFound) return isFound;
      next = this.GetNext(value, next);
    }
    return isFound;
  }

  public Remove(value: number): void {
    if (!this.Find(value)) {
      console.log("Cannot Remove");
      return;
    }
    console.log("Removing");
  }

  public GetLeafNode(value: number, current: Node = this.root): Node {
    const next: Node | undefined = this.GetNext(value, current);
    if (next) return this.GetLeafNode(value, next);
    return current;
  }

  private GetNext(value: number, node: Node): Node | undefined {
    if (value < node.item) return node.left;
    return node.right;
  }

  private CreateChild(value: number, current: Node): void {
    let other: Node = new Node(value);
    if (value < current.item) current.left = other;
    else current.right = other;
  }

  // EXTRAS

  public BreadthFirstSearch(current: Node = this.root): number[] {
    const arr: number[] = [];
    const queue: LinearQueue<Node> = new LinearQueue<Node>(this.size);
    queue.Enqueue(current);
    console.log(queue);

    while (!queue.IsEmpty()) {
      current = queue.Dequeue() as Node;
      arr.push(current.item);
      if (current.left) queue.Enqueue(current.left);
      if (current.right) queue.Enqueue(current.right);
    }
    return arr;
  }
}
