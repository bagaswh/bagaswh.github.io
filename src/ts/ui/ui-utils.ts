import { StringStringObject } from './../interfaces';
export const UtilsUI = {
  $(selector: string) {
    return document.querySelector(selector) as HTMLElement;
  },

  $$(selector: string) {
    let elements = document.querySelectorAll(selector);
    return Array.from(elements || []);
  },

  createElement(
    tag: string,
    attributes: StringStringObject = {},
    styles: StringStringObject = {},
    jsProps: StringStringObject = {}
  ) {
    let element = document.createElement(tag);

    for (let attr in attributes) {
      element.setAttribute(attr, attributes[attr]);
    }

    for (let style in styles) {
      // @ts-ignore
      element.style[style] = styles[style];
    }

    for (let prop in jsProps) {
      // @ts-ignore
      element[prop] = jsProps[prop];
    }

    return element;
  },

  styleElement(element: HTMLElement, styles: StringStringObject = {}) {
    for (let key in styles) {
      (element.style as any)[key] = styles[key];
    }
  }
};
