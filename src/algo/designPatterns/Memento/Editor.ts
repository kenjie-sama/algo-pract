import { EditorHistory } from "./History";
import { EditorState } from "./EditorState";
class Editor {
  private content: string = "";
  public getContent(): string {
    return this.content;
  }
  public setContent(content: string): void {
    this.content = content;
  }
  public createState(): EditorState {
    return new EditorState(this.content);
  }
  public restore(state: EditorState): void {
    if (state) this.content = state.getContent();
  }
}
export default function TestEditor() {
  const edit: Editor = new Editor();
  const hist: EditorHistory = new EditorHistory();
  edit.setContent("a");
  hist.push(edit.createState());
  edit.setContent("b");
  hist.push(edit.createState());
  edit.setContent("c");
  hist.push(edit.createState());
  edit.setContent("d");
  console.log(hist);
  console.log(edit.getContent());
  edit.restore(hist.pop());

  console.log(edit.getContent());
}