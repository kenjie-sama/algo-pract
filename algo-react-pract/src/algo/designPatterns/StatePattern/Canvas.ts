import { Tool } from "./Tool";
import { Brush } from "./Tools/Brush";
import { Eraser } from "./Tools/Eraser";
import { Selection } from "./Tools/Selection";

export class Canvas {
  private tool: Tool | undefined = undefined;

  //#region Tool GetterSetter
  public GetTool(): Tool | undefined {
    return this.tool;
  }
  public SetTool(tool: Tool): void {
    this.tool = tool as Tool;
  }
  //#endregion

  public MouseDown(): void {
    this.tool?.MouseDown();
  }
  public MouseUp(): void {
    this.tool?.MouseUp();
  }
}

export default function CanvasTest() {
  const canvas: Canvas = new Canvas();
  canvas.SetTool(new Eraser());
  canvas.MouseDown();
  canvas.MouseUp();
  console.log(canvas.GetTool());
}
