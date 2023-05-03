import { Map } from "typescript";
import LinkedList, { Node } from "./LinkedList";
import { Quicksort } from "../../algorithms/Sorting";
type EntryLink<K, V> = LinkedList<Entry<K, V>> | undefined;
type EntriesType<K, V> = LinkedList<Entry<K, V>>;

export function FirstNonRepeatingChar(
  text: string,
  isDebug: boolean = false
): string {
  // Remove all spaces and convert to lowercase
  // Convert the new string to list
  // Create a map of Letters(string) as Keys and Frequency(number) as Values
  // if current character exist then convert it to number as the value.
  // else put 0 as the value
  // Loop through the keys of the map and check the first value that is less than or equal 1

  const letters: string = text.toLowerCase();

  let first: string = "";

  let map = new Map<string, number>();

  for (let char of letters) {
    let value = map.get(char);
    let freq: number = value ? (value as number) : 0;
    map.set(char, freq + 1);
  }

  map.forEach((v, k) => (first = v <= 1 && first === "" ? k : first));

  if (isDebug) {
    console.log(first);
    console.log(map);
  }

  return first;
}

export function FirstRepeatedChar(text: string): string | null {
  // Remove all spaces and convert to lowercase and array if necessary
  // Loop through text
  // if set has current character return it
  // else  push the current char to the set

  const letters: string = text.toLowerCase();
  const set = new Set();
  for (let char of letters) {
    if (set.has(char)) return char;
    set.add(char);
  }

  return null;
}

export function CountPairsWithDiffArray(): void {
  const arr: number[] = [1, 7, 5, 9, 2, 12, 3];
  const k: number = 2;
  let count = 0;

  Quicksort(arr);
  // [1, 2, 3, 5, 7, 9, 12]

  const length = arr.length;

  for (let x = 0; x < length; x++) {
    for (let y = x; y < length; y++) {
      if (x === y) continue;

      const diff = Math.abs(arr[x] - arr[y]);

      if (diff !== k) continue;

      console.log(`${arr[x]} - ${arr[y]} = ${diff}`);
      count++;
    }
  }

  console.log("Count = ", count);
}
// Answer
// https://www.geeksforgeeks.org/count-all-distinct-pairs-with-difference-equal-to-k-set-2/
// o(n^2)
export function CountPairsWithDiffMap(): void {
  const arr: number[] = [1, 7, 5, 9, 2, 12, 3];
  const k: number = 2;

  const map: Dictionary<number, number> = new Dictionary<number, number>();
  let count: number = 0;

  const length = arr.length;

  for (let e = 0; e < length; e++) {
    const val = map.Get(arr[e]);

    if (val) {
      map.Put(arr[e], (val.value as number) + 1);
    } else map.Put(arr[e], 1);
  }

  for (let ent of map.EntrySet()) {
    const keySum = (ent.key as number) + k;
    // const valueSum = map.Get(keySum)?.value as number;
    const valueSum = map.Get(keySum);
    if (valueSum) count++;
  }

  console.log(map);
  console.log(map.EntrySet());

  console.log("Count", count);
}

// o(n)
export function MostRepeated(): void {
  const arr: number[] = [1, 2, 2, 3, 3, 3, 4, 5555, 5555, 5555, 5555];
  const map: Dictionary<number, number> = new Dictionary<number, number>();
  console.log("Array", arr);

  arr.forEach((value) => {
    const entry = map.Get(value);
    map.Put(value, entry?.key ? (entry.value as number) + 1 : 1);
  });

  let highest: number = 0;
  for (let x of map.EntrySet()) if (x.value! > highest) highest = x.key!;

  console.log(highest);
  console.log("Entries", map.EntrySet());
}

export function TwoSumArr(): void {
  const arr: number[] = [2, 7, 11, -3];
  const target: number = 9;

  const indices: number[] = [-1, -1];
  const length: number = arr.length;

  for (let x = 0; x < length; x++) {
    for (let y = x + 1; y < length; y++) {
      if (arr[x] > target || arr[x] + arr[y] !== target) continue;
      indices[0] = x;
      indices[1] = y;
    }
  }

  console.log(arr);
  console.log(indices);
}

export function TwoSumMap(): void {
  const arr: number[] = [2, 7, 11, 15];
  const map: Dictionary<number, number> = new Dictionary();

  const target: number = 9;

  const indices: number[] = [-1, -1];
  const length: number = arr.length - 1;

  for (let x = 0; x < length; x++) {
    if (map.HasKey(target - arr[x])) {
      indices[0] = map.Get(target - arr[x])?.value as number;
      indices[1] = x;
    }
    map.Put(arr[x], x);
  }

  console.log(indices);
  console.log(map);
}

export function TestHashmap() {
  const map: Dictionary<number, string> = new Dictionary<number, string>();
  map.Put(1, "AAAAAAAAAA");
  map.Put(2, "BBBBBBBBBB");
  map.Put(12, "CCCCCCCCCC");
  map.Put(116, "DDDDDDDDD");
  map.Put(101, "FFFFFFFFF");

  console.log(map);
  map.Remove(12);
  map.Remove(1);
  map.Remove(101);
}

class Entry<K, V> {
  public constructor(public key?: K, public value?: V) {}

  public ToString(): string {
    return `(K=${this.key}, V=${this.value})`;
  }

  public Destroy() {
    this.key = undefined;
    this.value = undefined;
  }
}
export class Dictionary<K, V> {
  // array [ LL<Entry(K,V) => Entry(K,V) => Entry(K,V)>, LL<Entry(K,V)>, LL<Entry(K,V)>]
  private array: Array<EntryLink<K, V>> = [];

  public constructor(private size: number = 100) {
    this.array.length = size;
  }

  public Put(key: K, value: V): void {
    // Add or Update the Key and Value
    const index: number = this.Hash(key as number);
    const currentLink = this.array[index];

    // Create a new Chain
    // Check if it has value
    // true: Add to the tail of the linkedList
    // false: Create new Chain of LinkedList
    if (!currentLink) {
      this.array[index] = this.CreateLink(key, value);
      return;
    }

    // Update the entry
    for (let node of currentLink) {
      const current: Entry<K, V> = node.GetItem() as Entry<K, V>;
      if (current.key === key) {
        current.value = value;
        return;
      }
    }

    // Append to the current chain
    currentLink.AddTail(new Entry(key, value));
  }

  private CreateLink(key: K, value: V): EntryLink<K, V> {
    const list = new LinkedList<Entry<K, V>>();
    list.AddTail(new Entry(key, value));
    return list;
  }

  *[Symbol.iterator](): IterableIterator<EntryLink<K, V>> {
    for (let x of this.array) {
      if (x) yield x;
      else continue;
    }
  }

  public Hash(key: any): number {
    switch (typeof key) {
      case "number":
        return Math.abs(key as number) % this.size;
      case "string":
        let sum: number = 0;
        for (let char of key as string) sum += char.charCodeAt(0);
        return sum % this.size;
      default:
        throw new Error("Argument Type is not valid");
    }
  }

  /**
   * @param key Search for the Key
   * @return An Entery which is a Key Value pair
   */
  public Get(key: number): Entry<K, V> | undefined {
    const index: number = this.Hash(key);
    const entries: EntriesType<K, V> = this.array[index] as EntriesType<K, V>;
    if (!entries) return undefined;

    for (let node of entries) {
      const _entry: Entry<K, V> = node.GetItem() as Entry<K, V>;
      const _key: K = _entry.key as K;
      if (_key === key) return _entry;
    }

    return undefined;
  }

  public Remove(key: number): void {
    // Delete the key and value using the key
    const index = this.Hash(key);
    const entries: EntriesType<K, V> = this.array[index] as EntriesType<K, V>;

    if (entries === undefined)
      throw Error(`Cannot remove on the Key(${key}). Key is not found. `);

    if (entries.IsEmpty())
      throw Error(`Cannot remove on the Key(${key}). Entry is Empty. `);

    let x = 0;
    for (let entry of entries) {
      const _key: K = entry.GetItem()?.key as K;

      if (_key !== key) {
        x++;
        continue;
      }

      entries.RemoveAt(x);

      if (entries.IsEmpty()) this.array[index] = undefined;
      return;
    }

    throw Error(`Cannot remove on the Key(${key}). Key is not found. `);
  }

  public KeySet(): Array<K> {
    // Return all the Keys
    let set: Array<K> = new Array<K>();
    for (let link of this.array) {
      if (!link) continue;
      for (let entry of link!) set.push(entry.GetItem()?.key!);
    }

    return set;
  }

  public ValueSet(): Array<V> {
    // Return all the Keys
    let set: Array<V> = new Array<V>();
    for (let link of this.array) {
      if (!link) continue;
      for (let entry of link!) set.push(entry.GetItem()?.value!);
    }

    return set;
  }

  public EntrySet() {
    // Return all the Keys and Values
    let set: Array<Entry<K, V>> = new Array<Entry<K, V>>();
    for (let link of this.array) {
      if (!link) continue;
      for (let entry of link!) set.push(entry.GetItem()!);
    }

    return set;
  }

  public HasKey(key: number): boolean {
    //return true if key
    return this.Get(key)?.key === key;
  }
  public HasValue() {
    //
  }
}
