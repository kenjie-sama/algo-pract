import { Tool } from "../Tool";

export class Selection implements Tool {
  public MouseDown(): void {
    console.log("Selection Icon");
  }
  public MouseUp(): void {
    console.log("Draw a dashed rectangle using Select tool");
  }
}
