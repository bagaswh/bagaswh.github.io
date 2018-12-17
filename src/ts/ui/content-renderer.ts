import { StringStringObject } from './../interfaces';
import { UtilsUI } from './ui-utils';

// interfaces
interface Content {
  textContent: string;
}

interface HTMLAttribute {
  target?: string;
  class?: string;
}

export interface ElementContent {
  tag: string;
  content?: Content;
  attributes?: HTMLAttribute;
  styles?: StringStringObject;
  jsProps?: StringStringObject;
  children?: ElementContent[];
}

// non-global functions
function _renderContent(element: HTMLElement, contentData: ElementContent) {
  if (contentData.tag === 'a') {
    (contentData.attributes as HTMLAttribute).target = '_blank';
  }

  let itemElement = UtilsUI.createElement(
    contentData.tag,
    (contentData.attributes || {}) as StringStringObject,
    contentData.styles || {},
    contentData.jsProps || {}
  );

  // content adding
  for (let key in contentData.content) {
    (itemElement as any)[key] = (contentData.content as any)[key];
  }

  // appending to element
  element.appendChild(itemElement);

  if (contentData.children) {
    for (let child of contentData.children) {
      _renderContent(itemElement, child);
    }
  }
}

export const ContentRenderer = {
  // render content provided in content.ts
  render(
    element: HTMLElement,
    contentData: ElementContent[],
    clearContainerBeforeRender: Boolean
  ): void {
    if (clearContainerBeforeRender) {
      element.innerHTML = '';
    }

    for (let item of contentData) {
      _renderContent(element, item);
    }
  }
};
