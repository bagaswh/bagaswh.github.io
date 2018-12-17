export const UtilsArray = {
  findObject(array: object[], props: object): number {
    let i = -1;
    array.forEach((item, index) => {
      for (let key in props) {
        if (!(item as any)[key]) {
          return -1;
        }
      }
      i = index;
    });

    return i;
  }
};
