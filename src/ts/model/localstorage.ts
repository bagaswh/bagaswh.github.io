export const LocalStorage = {
  getItem(key: string) {
    let item = localStorage.getItem(key);

    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        return Number(item) || item;
      }
    }

    return null;
  },

  setItem(key: string, value: any) {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },

  clear() {
    localStorage.clear();
  },

  getLength() {
    return localStorage.length;
  }
};
