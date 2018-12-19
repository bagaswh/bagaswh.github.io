import { Alert } from './ui/components/alert';
import { UtilsString } from './utils/utils-string';
import { db } from './model/firebase';
import { StringRegExpObject } from './interfaces';
import { LocalStorage } from './model/localstorage';
import { UI } from './ui/ui';
import { setupServiceWorker } from './sw';

document.addEventListener('DOMContentLoaded', () => {
  // clear previous storage
  if (
    !LocalStorage.getItem('hasBeenNotifiedNewVersion') &&
    LocalStorage.getLength()
  ) {
    LocalStorage.clear();
    LocalStorage.setItem('hasBeenNotifiedNewVersion', true);
  } else {
    LocalStorage.setItem('hasBeenNotifiedNewVersion', true);
  }

  // setup service worker
  (function() {
    setupServiceWorker().then(success => {
      new Alert().show('Website dapat dimuat secara offline!');
    });
  })();

  UI.init();

  // ask for name if not exists
  (async function() {
    let possibleNames: StringRegExpObject = {
      'Bagas Wahyu Hidayah': /(bagas|bagas wahyu|bagas wahyu hidayah|wahyu hidayah|bagas hidayah|bg|bgwh|bege)/i,
      'Bagus Anggara Putra': /(baugs|bagus anggara|bagus anggara putra|bgz|anggara|anggara putra|bagus putra)/i,
      'Seto Aji Rinengkuh': /(seto|seto aji|seto aji rinengkuh|aji|rinengkuh|seto ?warren|seto ?got ?hit(s|z)?)/i,
      'Mufida Salma': /(mufida|mufida salma|upid|salma)/i,
      'Nur Zuzzaifa': /(nur|nur zuzzaifa|zuzzaifa|zuz+|ju(s+|z+))/i,
      'Alifia Kania Ramadhani': /(alif(ia)?|alifia kania|alifia kania ramadhani|kania|alifia ramadhani|kania ramadhani|oli(ve|p+))/i
    };

    let hasInputBagas = false;
    function validateName(name: string) {
      let hasMatch = false;
      let realName = name;
      for (let nameRegex in possibleNames) {
        let match = name.match(possibleNames[nameRegex]);
        let bagasPlatforms = ['Linux x86_64', 'iPhone'];
        if (
          match &&
          nameRegex === 'Bagas Wahyu Hidayah' &&
          !bagasPlatforms.includes(navigator.platform)
        ) {
          hasInputBagas = true;
          alert('Anda bukan Bagas Wahyu Hidayah!');
          return requestName();
        } else if (match) {
          hasMatch = true;
          realName = nameRegex;
          alert('Hai, ' + nameRegex);
        }
      }

      if (!hasMatch) {
        alert('Sepertinya Anda memasukkan nama ngawur. Entahlah :/');
      }

      return realName;
    }

    function requestName() {
      let userData = LocalStorage.getItem('userData');
      if (userData && userData.name) return;

      let name = prompt(
        hasInputBagas
          ? 'Masukkan nama pls (jangan Bagas lagi ya, kamu itu bukan Bagas)'
          : 'Masukkan nama pls'
      );
      while (!name) {
        name = prompt('Tak paksa!');
      }
      name = UtilsString.capitalize(validateName(name) as string);

      return name;
    }

    async function storeName(name: string) {
      LocalStorage.setItem('userData', { name });
      let onlineUsersData = await db.getData('usersData');
      if (!(onlineUsersData as any)[name]) {
        (onlineUsersData as any)[name] = {
          loginTrack: {
            count: 1,
            duration: 0,
            lastTimeLoggedIn: new Date().toLocaleString()
          },

          clickedLinks: []
        };
      }

      db.writeData('usersData', onlineUsersData);
    }

    let name = requestName();
    if (name) {
      storeName(name);
    }
  })();

  // track login data
  (async function() {
    let userName = LocalStorage.getItem('userData').name;
    let loginData = (await db.getData('usersData')) as any;
    loginData[
      userName
    ].loginTrack.lastTimeLoggedIn = new Date().toLocaleString();
    ++loginData[userName].loginTrack.count;
    db.writeData('usersData', loginData);

    // track duration
    let start = new Date().getTime();
    setInterval(async () => {
      let loginData = (await db.getData('usersData')) as any;
      loginData[userName].loginTrack.duration = new Date().getTime() - start;
      db.writeData('usersData', loginData);
    }, 10000);
  })();
});
