export class Numbers {
  static threshold = 5;
  static thousand = 1000;
  static million = 1000 * Numbers.thousand;
  static billion = 1000 * Numbers.million;
  static trillion = 1000 * Numbers.billion;
  static chooseArrayDivisor(values: number[]) {
    const min = Math.min.apply(Math, values);
    const max = Math.max.apply(Math, values);
    if (min < -Numbers.threshold * Numbers.trillion) {
      return Numbers.trillion;
    } else if (max > Numbers.threshold * Numbers.trillion) {
      return Numbers.trillion;
    } else if (min < -Numbers.threshold * Numbers.billion) {
      return Numbers.billion;
    } else if (max > Numbers.threshold * Numbers.billion) {
      return Numbers.billion;
    } else if (min < -Numbers.threshold * Numbers.million) {
      return Numbers.million;
    } else if (max > Numbers.threshold * Numbers.million) {
      return Numbers.million;
    } else if (min < -Numbers.threshold * Numbers.thousand) {
      return Numbers.thousand;
    } else if (max > Numbers.threshold * Numbers.thousand) {
      return Numbers.thousand;
    } else {
      return 1;
    }
  }
}
