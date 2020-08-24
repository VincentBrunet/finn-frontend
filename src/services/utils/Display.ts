import { Observable } from "../rx/Observable";

export enum DisplaySize {
  Xs = 0,
  Sm = 1,
  Md = 2,
  Lg = 3,
  Xl = 4,
  Hd = 5,
}

export class Display {
  public static readonly size = new Observable<DisplaySize>(DisplaySize.Xs);
}

function onResize() {
  let width = typeof window !== "undefined" ? window.innerWidth : 0;
  if (width > 2100) {
    Display.size.update(DisplaySize.Hd);
  } else if (width > 1700) {
    Display.size.update(DisplaySize.Xl);
  } else if (width > 1300) {
    Display.size.update(DisplaySize.Lg);
  } else if (width > 700) {
    Display.size.update(DisplaySize.Md);
  } else if (width > 400) {
    Display.size.update(DisplaySize.Sm);
  } else {
    Display.size.update(DisplaySize.Xs);
  }
}
onResize();
let timeout: NodeJS.Timeout | undefined;
window.addEventListener("resize", () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    onResize();
  }, 100);
});
