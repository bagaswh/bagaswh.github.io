import { Data } from './../../model/database';
import { db } from './../../model/firebase';
import { LocalStorage } from '../../model/localstorage';

interface EventHandlersNamespace {
  [index: string]: (e: any) => any;
}

interface EventHandlersList {
  Global: EventHandlersNamespace;
  CategoryLinks: EventHandlersNamespace;

  [index: string]: EventHandlersNamespace;
}

// @ts-ignore
export const EventHandlers: EventHandlersList = {};

/**
 * Category Links Event Handlers
 */
EventHandlers.CategoryLinks = {
  async sendClickData(e: MouseEvent) {
    if (e.which === 3) {
      return;
    }

    let userName = LocalStorage.getItem('userData').name;
    let usersData = await Data.getUsersData();
    let userData = Data.getUserData(usersData, userName);
    let todayAnalytics = Data.getAnalytics(userData);

    let targetContent = (e.target as HTMLElement).textContent;
    if (!todayAnalytics.clickedLinks) {
      todayAnalytics.clickedLinks = {};
    }
    if (!todayAnalytics.clickedLinks[targetContent]) {
      todayAnalytics.clickedLinks[targetContent] = 1;
    } else {
      ++todayAnalytics.clickedLinks[targetContent];
    }

    db.writeData('usersData', usersData);
  }
};
