export class Observer {
  static observeChange(object: object, cb: () => void) {
    return new Proxy(object, {
      set(obj, prop, value) {
        cb();
        return (obj[prop] = value);
      }
    });
  }
}
