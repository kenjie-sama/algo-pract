export default abstract class Collection<T> {
  public abstract GetSize: () => number;
  public abstract IsEmpty: () => boolean;
  public abstract IsFull: () => boolean;
  public abstract Peek: () => T | undefined;
  public abstract ToString: () => void;
  public abstract Log: () => void;
  public abstract Reset: () => void;

  public Print = () => console.log(this);

  public LogError = (
    collectionText: string = "Collection",
    status: string = "Full",
    commandText: string = "Add",
    size: number,
    index: number,
    indexText: string = "Index"
  ) =>
    console.error(
      `${collectionText} is ${status}. Cannot ${commandText} Value. Size (${size}) ${indexText} (${index})`
    );

  public LogSuccess = (
    collectionText: string,
    commandText: string = "Add",
    arr: any[],
    index: number,
    indexText: string = "Index"
  ) =>
    console.warn(
      `${arr[index]} is successfully ${commandText} at ${indexText}(${index}) of the ${collectionText}`
    );
}
