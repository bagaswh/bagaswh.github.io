import { Observer } from './../utils/object-observer';
import { isEqual } from 'underscore';
import { UtilsObject } from './../utils/utils-object';
import { UIState } from './ui-state';
import { db } from './../model/firebase';
import { UtilsUI } from './ui-utils';
import { ElementContent, ContentRenderer } from './content-renderer';
import { content } from './../../../content';
import { AnimationManager } from './animation-manager';
import { LocalStorage } from '../model/localstorage';
import { ActionBinder } from './action-binder/action-binder';

function _getLocalContent() {
  return LocalStorage.getItem('content');
}

async function _getOnlineContent() {
  return await db.getData('mainContent');
}

async function _makePreContentView(element: HTMLElement) {
  let preContentSVG = UtilsUI.$('.pre-content').innerHTML;
  element.innerHTML = preContentSVG;
  await AnimationManager.animate(element, 'fadeIn', {
    speed: 'faster'
  });
}

async function _clearPreContentView(element: HTMLElement) {
  await AnimationManager.animate(element, 'fadeOut', {
    speed: 'faster'
  });
  element.innerHTML = '';
}

export const UI = {
  async init() {
    UIState.init();
    await this.populateContent(UtilsUI.$('.content'));
    ActionBinder.bindAction();
  },

  async populateContent(element: HTMLElement) {
    let localContent = _getLocalContent();
    let onlineContent = await db.getData('mainContent');
    if (localContent) {
      AnimationManager.animate(element, 'fadeIn', {
        speed: 'faster'
      });
      ContentRenderer.render(element, localContent, true);
    }

    if (!localContent) {
      await _makePreContentView(element);
      onlineContent = await _getOnlineContent();
      await _clearPreContentView(element);
      ContentRenderer.render(element, onlineContent);
      AnimationManager.animate(element, 'fadeIn', {
        speed: 'faster'
      });
      LocalStorage.setItem('content', onlineContent);
    } else {
      onlineContent = await _getOnlineContent();
      localContent = _getLocalContent();
      if (!isEqual(localContent, onlineContent)) {
        console.log('Data sama');
      }
    }
  }
};
