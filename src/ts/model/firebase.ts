import firebase from 'firebase/app';
import 'firebase/database';

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
