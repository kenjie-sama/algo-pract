import { Tool } from "../Tool";

export class Brush implements Tool {
  public MouseDown(): void {
    console.log("Brush Icon");
  }
  public MouseUp(): void {
    console.log("Draw Line using Brush");
  }
}
