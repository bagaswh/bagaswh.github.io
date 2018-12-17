import firebase from 'firebase/app';
import 'firebase/database';

function _isArrayLike(object: object) {
  return object.hasOwnProperty('length') && !Array.isArray(object);
}

function _convertArrayLikeToArray(arrayLike: ArrayLike<any>) {
  return Array.from(arrayLike);
}

function _convertDataToArray(data: object) {
  if (_isArrayLike(data)) {
    data = _convertArrayLikeToArray(data as ArrayLike<any>);
    (data as any[]).forEach((item, index) => {
      if (_isArrayLike(item)) {
        (data as any)[index] = _convertDataToArray(item);
      }
    });
  } else {
    for (let key in data) {
      if (_isArrayLike((data as any)[key])) {
        (data as any)[key] = _convertDataToArray((data as any)[key]);
      }
    }
  }

  return data;
}

export class Database {
  app: firebase.app.App;
  database: firebase.database.Database;

  constructor(config: object) {
    this.app = firebase.initializeApp(config);
    this.database = this.app.database();
  }

  async getData(propName: string) {
    return (await this.database.ref(propName).once('value')).val();
  }

  writeData(propName: string, value: any) {
    return this.database.ref(propName).set(value);
  }
}

export let db = new Database({
  apiKey: 'AIzaSyDSC41XmGgPj41YMnDG8W1WOHvs3SOrwJE',
  authDomain: 'mbcpwebsite.firebaseapp.com',
  databaseURL: 'https://mbcpwebsite.firebaseio.com',
  projectId: 'mbcpwebsite',
  storageBucket: 'mbcpwebsite.appspot.com',
  messagingSenderId: '828198302354'
});
