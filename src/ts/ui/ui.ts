import { isEqual } from 'underscore';
import { UIState } from './ui-state';
import { db } from './../model/firebase';
import { UtilsUI } from './ui-utils';
import { ContentRenderer, ElementContent } from './content-renderer';
import { AnimationAgent } from './animation-agent';
import { LocalStorage } from '../model/localstorage';
import { ActionBinder } from './action-binder/action-binder';
import { Alert } from './components/alert';

function _getLocalContent() {
  return LocalStorage.getItem('content') as ElementContent[];
}

async function _getOnlineContent() {
  return (await db.getData('mainContent')) as ElementContent[];
}

async function _makePreContentView(element: HTMLElement) {
  let preContentSVG = UtilsUI.$('.pre-content').innerHTML;
  element.innerHTML = preContentSVG;
  await AnimationAgent.animate(element, 'fadeIn', {
    speed: 'faster'
  });
}

async function _clearPreContentView(element: HTMLElement) {
  await AnimationAgent.animate(element, 'fadeOut', {
    speed: 'faster'
  });
  element.innerHTML = '';
}

export class UI {
  static async init() {
    UIState.init();
    await this.populateContent(UtilsUI.$('.content'));
    ActionBinder.bindAction();
  }

  static async populateContent(element: HTMLElement) {
    let localContent = _getLocalContent();
    if (localContent) {
      AnimationAgent.animate(element, 'fadeIn', {
        speed: 'faster'
      });
      ContentRenderer.render(element, localContent, true);
    }

    let onlineContent;
    if (!localContent) {
      await _makePreContentView(element);
      onlineContent = await _getOnlineContent();
      await _clearPreContentView(element);
      ContentRenderer.render(element, onlineContent);
      AnimationAgent.animate(element, 'fadeIn', {
        speed: 'faster'
      });
      LocalStorage.setItem('content', onlineContent);
    } else {
      onlineContent = await _getOnlineContent();
      localContent = _getLocalContent();
      if (!isEqual(localContent, onlineContent)) {
        new Alert().show('Tidak ada update!');
      }
    }
  }
}
