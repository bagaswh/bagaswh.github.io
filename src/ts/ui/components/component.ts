import { AnimationManager } from './../animation-manager';
import { StringAnyObject } from './../../interfaces';

export class Component {
  protected static readonly CLASSNAME_PREFIX = 'component';

  constructor(
    protected readonly className: string,
    protected readonly element: HTMLElement = document.createElement('div'),
    protected readonly container: HTMLElement = document.body
  ) {
    this.container.appendChild(element);
    this.element.classList.add(...[className]);
  }

  animate(animationName: string, opts?: StringAnyObject) {
    let animOptsKeys = ['interruptible', 'speed'];

    let defaultOptions = {
      interruptible: false,
      speed: 'fast'
    };
    opts = { ...defaultOptions, ...opts };

    return AnimationManager.animate(this.element, animationName, opts);
  }

  cancelAnimation() {
    AnimationManager.cancel(this.element);
  }
}
