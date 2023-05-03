import { Tool } from "../Tool";

export class Eraser implements Tool {
  public MouseDown(): void {
    console.log("Erase Icon");
  }
  public MouseUp(): void {
    console.log("Erase drawing using Eraser");
  }
}
