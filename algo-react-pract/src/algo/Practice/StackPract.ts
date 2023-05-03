import { Stack } from "../datastructures/Linear/Stack";
import { Range } from "../algorithms/Utils";

export function TestStr() {
  // console.log(StringUtil.ReverseString("abcdefghi"))
  console.log(Util.IsBalance("(1 + 1)") ? "Balance" : "Not Balance");
  // console.log(Util.prot)
  // Proxy
}

function Either<T = string>(target: T, ...vals: T[]): boolean {
  for (let x of vals) if (x === target) return true;
  return false;
}

export class Util<T = number> {
  public stack: T[] = [];

  public static openChar: string[] = ["[", "(", "<", "{"];
  public static closeChar: string[] = ["]", ")", ">", "}"];

  public constructor() {}

  public static IsBalance(str: string): boolean {
    const stack: Stack<string> = new Stack<string>();
    const chars: string[] = str.split("");

    let open: number = -1;
    let close: number = -1;

    for (let ch of chars) {
      open = this.openChar.indexOf(stack.Peek() as string);
      close = this.closeChar.indexOf(ch);

      if (this.openChar.includes(ch)) {
        console.log("Pushed: " + ch);
        stack.Push(ch);
        console.log(stack.GetStack());
        continue;
      }

      if (open === close && !stack.IsEmpty()) {
        console.log("POPPED: " + stack.Pop());
        console.log(stack.GetStack());
        continue;
      }

      if (this.closeChar.includes(ch) && stack.IsEmpty()) return false;
    }

    return stack.IsEmpty();
  }
  public static prot = Object.getPrototypeOf(this);

  public static ReverseString(str: string) {
    let result: string = "";

    for (let c: number = str.length - 1; c >= 0; c--) result += " " + str[c];

    return result;
  }
}
