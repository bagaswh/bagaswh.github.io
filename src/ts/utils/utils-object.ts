export const UtilsObject = {
  deepEqual(a: object, b: object) {
    if (a === b) return true;

    if (a == null || typeof a != 'object' || b == null || typeof b != 'object')
      return false;

    let keysA = Object.keys(a),
      keysB = Object.keys(b);

    if (keysA.length != keysB.length) return false;

    for (let key of keysA) {
      if (
        !keysB.includes(key) ||
        !this.deepEqual((a as any)[key], (b as any)[key])
      )
        return false;
    }

    return true;
  },

  deepEqualJSON(a: object, b: object) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
};
