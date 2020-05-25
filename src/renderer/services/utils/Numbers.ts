export class Numbers {
  static thousand = 1000;
  static million = 1000 * Numbers.thousand;
  static billion = 1000 * Numbers.million;
  static trillion = 1000 * Numbers.billion;
  static chooseDivisor(values: number[]) {
    const min = Math.min.apply(Math, values);
    const max = Math.max.apply(Math, values);
    if (min < -10 * Numbers.trillion) {
      return Numbers.trillion;
    } else if (max > 10 * Numbers.trillion) {
      return Numbers.trillion;
    } else if (min < -10 * Numbers.billion) {
      return Numbers.billion;
    } else if (max > 10 * Numbers.billion) {
      return Numbers.billion;
    } else if (min < -10 * Numbers.million) {
      return Numbers.million;
    } else if (max > 10 * Numbers.million) {
      return Numbers.million;
    } else if (min < -10 * Numbers.thousand) {
      return Numbers.thousand;
    } else if (max > 10 * Numbers.thousand) {
      return Numbers.thousand;
    } else {
      return 1;
    }
  }
}
