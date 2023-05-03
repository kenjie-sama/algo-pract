export class EditorState {
  private readonly content: string;

  public constructor(content: string) {
    this.content = content;
  }

  public getContent(): string {
    return this.content;
  }
}
