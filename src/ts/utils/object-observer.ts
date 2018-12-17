export const Observer = {
  observeChange(object: object, cb: () => void) {
    return new Proxy(object, {
      set(obj, prop, value) {
        cb();
        return ((obj as any)[prop] = value);
      }
    });
  }
};
