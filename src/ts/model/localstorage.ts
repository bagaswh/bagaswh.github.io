export class LocalStorage {
  static getItem(key: string) {
    let item = localStorage.getItem(key);

    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        return Number(item) || item;
      }
    }

    return null;
  }

  static setItem(key: string, value: any) {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  static clear() {
    localStorage.clear();
  }

  static getLength() {
    return localStorage.length;
  }
}
