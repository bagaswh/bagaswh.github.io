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
    let onlineUsersData = await db.getData('usersData');

    let targetContent = (e.target as HTMLAnchorElement).textContent;

    let clickedLinks = (onlineUsersData as any)[userName].clickedLinks;
    if (!clickedLinks || !clickedLinks.length) {
      (onlineUsersData as any)[userName].clickedLinks = [];
      clickedLinks = (onlineUsersData as any)[userName].clickedLinks;
    }
    let clickedLinksIndex = clickedLinks.indexOf(targetContent);
    if (clickedLinksIndex === -1) {
      clickedLinks.push(targetContent, 1);
    } else {
      ++clickedLinks[clickedLinksIndex + 1];
    }

    db.writeData('usersData', onlineUsersData);
  }
};
