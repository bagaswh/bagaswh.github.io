import { UIState } from './ui-state';
import { db } from './../model/firebase';
import { UtilsUI } from './ui-utils';
import { ElementContent, ContentRenderer } from './content-renderer';
import { content } from './../../../content';
import { AnimationManager } from './animation-manager';
import { LocalStorage } from '../model/localstorage';
import { ActionBinder } from './action-binder/action-binder';
import { Alert } from './components/alert';
import { isEqual } from 'underscore';

function _getLocalContent() {
  return LocalStorage.getItem('content');
}

async function _getOnlineContent() {
  return await db.getData('mainContent');
}

export const UI = {
  init() {
    UIState.init();
    this.populateContent(UtilsUI.$('.content'));
    ActionBinder.bindAction();
  },

  async populateContent(element: HTMLElement) {
    let localContent = _getLocalContent();
    if (localContent) {
      ContentRenderer.render(element, localContent, true);
      AnimationManager.animate(element, 'slideInUp', {
        interruptible: false,
        speed: 'fast'
      });
    }

    let uiAlert = new Alert(
      undefined,
      undefined,
      undefined,
      {
        type: Alert.Constants.TYPE_LOADING
      },
      {
        interruptible: true
      }
    );
    uiAlert.show('Memuat konten online...');
    let onlineContent = await _getOnlineContent();
    if (!isEqual(content, localContent)) {
      uiAlert.hide().then(
        done => {
          // @ts-ignore
          // @ts-ignore
          uiAlert.show('Tidak ada update.', undefined, {
            type: Alert.Constants.TYPE_NORMAL
          });
        },
        error => {
          console.log(error);
        }
      );
    } else {
      ContentRenderer.render(element, onlineContent, true);
      uiAlert.hide();
    }

    LocalStorage.setItem('content', content);
  }
};
