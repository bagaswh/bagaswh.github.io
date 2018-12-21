import { StringNumberObject, StringAnyObject } from './../interfaces';
import { db } from './firebase';

export interface UsersData {
  [index: string]: UserData;
}

export interface UserData {
  analytics: StringAnalyticsObject;
}

export interface StringAnalyticsObject {
  [index: string]: Analytics;
}

export interface Analytics {
  count: number;
  duration: number;
  clickedLinks: StringNumberObject;
  timeLoggedIn: string[];
}

export class Data {
  static async getMainContent() {
    return await db.getData('mainContent');
  }

  static async getUsersData() {
    return await db.getData('usersData');
  }

  static getUserData(usersData: UsersData, userName: string) {
    if (!usersData[userName] || !usersData[userName].analytics) {
      usersData[userName] = {
        analytics: {}
      };
    }

    return usersData[userName];
  }

  static getAnalytics(userData: UserData) {
    let dateString = new Date().toDateString();

    if (!userData.analytics[dateString]) {
      userData.analytics[dateString] = {
        count: 0,
        duration: 0,
        clickedLinks: {},
        timeLoggedIn: []
      };
    }

    return userData.analytics[dateString];
  }
}
