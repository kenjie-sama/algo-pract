import { EditorState } from "./EditorState";
export class EditorHistory {
  private static states: Array<EditorState>;
  public constructor() {
    if (!EditorHistory.states) EditorHistory.states = new Array<EditorState>();
  }
  public push(state: EditorState): void {
    EditorHistory.states.push(state);
  }
  public pop(): EditorState {
    return EditorHistory.states.pop() as EditorState;
  }
  public getStates(): Array<EditorState> {
    return EditorHistory.states;
  }
}
