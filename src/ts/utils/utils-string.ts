export class UtilsString {
  static capitalize(string: string) {
    return string
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }
}
