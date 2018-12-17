import { StringAnyObject } from './../../interfaces';
import { AnimationManager, AnimationOptions } from './../animation-manager';

export class Components {
  protected isAnimating: Boolean;

  protected constructor(
    protected readonly className: string,
    protected readonly element: HTMLElement = document.createElement('div'),
    protected readonly container: HTMLElement = document.body,
    protected readonly componentOptions: StringAnyObject = {},
    protected readonly animationOptions: AnimationOptions = {}
  ) {
    this.className = 'component__' + className;
    this.element.classList.add(this.className);
    this.element.hidden = true;
    this.container.prepend(this.element);
    this.isAnimating = false;
  }

  protected setIsAnimating(state: Boolean) {
    this.isAnimating = state;
  }

  protected animate(animationName: string, opts: AnimationOptions = {}) {
    opts = { ...this.animationOptions, ...opts };
    console.log(opts);

    this.setIsAnimating(true);
    return AnimationManager.animate(
      this.element,
      animationName,
      Object.values(opts).length ? opts : undefined
    ).then(done => {
      this.setIsAnimating(false);
    });
  }

  protected cancelAnimation() {
    AnimationManager.cancel(this.element);
    this.setIsAnimating(false);
  }
}
