export const UtilsArray = {
  findObject(array: object[], props: object): number {
    let i = -1;
    array.forEach((item, index) => {
      for (let key in props) {
        if ((item as any)[key] && (item as any)[key] === props[key]) {
          i = index;
        }
      }
    });

    return i;
  }
};
