export class UtilsArray {
  static findObject(array: object[], props: object): number {
    let i = -1;
    array.forEach((item, index) => {
      for (let key in props) {
        if (item[key] && item[key] === props[key]) {
          i = index;
        }
      }
    });

    return i;
  }
}
