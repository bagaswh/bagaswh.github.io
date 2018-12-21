import { StringStringObject } from './../interfaces';

export class UtilsUI {
  static $(selector: string, parentElement: Document | HTMLElement = document) {
    return parentElement.querySelector(selector) as HTMLElement;
  }

  static $$(
    selector: string,
    parentElement: Document | HTMLElement = document
  ) {
    let elements = parentElement.querySelectorAll(selector);
    return Array.from(elements || []) as HTMLElement[];
  }

  static createElement(
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
      element.style[style] = styles[style];
    }

    for (let prop in jsProps) {
      element[prop] = jsProps[prop];
    }

    return element;
  }

  static styleElement(element: HTMLElement, styles: StringStringObject = {}) {
    for (let key in styles) {
      element.style[key] = styles[key];
    }
  }
}
