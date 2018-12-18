import { StringStringObject } from './../interfaces';
export const UtilsUI = {
  $(selector: string, parentElement: Document | HTMLElement = document) {
    return parentElement.querySelector(selector) as HTMLElement;
  },

  $$(selector: string, parentElement: Document | HTMLElement = document) {
    let elements = parentElement.querySelectorAll(selector);
    return Array.from(elements || []);
  },

  getSelectorType(selector: string) {
    let selectorPatterns = {
      tag: /^[a-zA-Z]+\w*$/,
      class: /^\.[a-zA-Z_\-]+[\w\-]*$/,
      attribute: /^\[[a-zA-Z\-]+(=\"?[a-zA-Z\-]+\"?)?\]$/
    };

    for (let key in selectorPatterns) {
      if (selector.match((selectorPatterns as any)[key])) {
        return key;
      }
    }

    return null;
  },

  getLastElementOfSelector(
    selector: string,
    parentElement?: HTMLElement
  ): HTMLElement | undefined {
    let selectorType = this.getSelectorType(selector);
    if (!selectorType) return;

    let elements = this.$$(selector, parentElement);
    let lastElement: HTMLElement;

    elements.forEach(element => {
      switch (selectorType) {
        case 'tag': {
          if (element.tagName === selector.toUpperCase()) {
            lastElement = element as HTMLElement;
          }
          break;
        }
        case 'class': {
          if (element.classList.contains(selector.replace('.', ''))) {
            lastElement = element as HTMLElement;
          }
          break;
        }
        case 'attribute': {
          let [name, value] = selector.split('=');
          let elementAttribute = element.getAttribute(name);
          if (elementAttribute && (value && elementAttribute === value)) {
            lastElement = element as HTMLElement;
          }
          break;
        }
      }
    });

    // @ts-ignore
    return lastElement;
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
