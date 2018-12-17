import { UIState } from './../ui-state';
import { AnimationManager, AnimationOptions } from './../animation-manager';
import { UtilsUI } from './../ui-utils';
import {
  StringStringObject,
  StringBooleanObject,
  StringAnyObject
} from './../../interfaces';
import { Components } from './components';

export class Alert extends Components {
  static readonly Constants = {
    TYPE_NORMAL: {
      backgroundColor: '#218c74',
      icon: '<i class="fas fa-check"></i>'
    },
    TYPE_WARNING: {
      backgroundColor: '#cd6133',
      icon: '<i class="fas fa-exclamation-triangle"></i>'
    },
    TYPE_DANGER: {
      backgroundColor: '#ff5252',
      icon: '<i class="fas fa-times"></i>'
    },
    TYPE_LOADING: {
      backgroundColor: '#227093',
      icon: '<i class="fas fa-spinner fa-spin"></i>'
    }
  };

  constructor(
    element?: HTMLElement,
    container?: HTMLElement,
    // @ts-ignore
    readonly animationNames?: StringStringObject,
    readonly componentOptions?: StringAnyObject,
    readonly animationOptions?: AnimationOptions
  ) {
    super('alert', element || undefined, container || undefined);

    let defaultComponentOptions = {
      type: Alert.Constants.TYPE_NORMAL
    };
    let defaultAnimationNames = {
      animationInName: 'fadeInRight',
      animationOutName: 'fadeOutRight'
    };
    this.componentOptions = { ...defaultComponentOptions, ...componentOptions };
    this.animationNames = { ...defaultAnimationNames, ...animationNames };

    // set animationName
    this.setAnimationName();

    // listen for breakpoint change to change animationName
    window.addEventListener('breakpointchange', e => {
      this.setAnimationName();
    });
  }

  setAnimationName() {
    let mobileBreakpoints = ['mobile-s', 'mobile-m', 'mobile-l', 'tablet'];
    if (mobileBreakpoints.includes(UIState.Breakpoint)) {
      this.animationNames.animationInName = 'fadeInUp';
      this.animationNames.animationOutName = 'fadeOutUp';
    }
  }

  show(
    text: string,
    duration = 1000,
    //animationName = 'fadeInRight',
    overrideOptions: StringStringObject | undefined = this
      .componentOptions as StringStringObject,
    overrideAnimationOptions: AnimationOptions | undefined = this
      .animationOptions
  ) {
    UtilsUI.styleElement(this.element, {
      backgroundColor: overrideOptions.type.backgroundColor
    });

    let iconElement = UtilsUI.createElement(
      'span',
      {},
      {},
      {
        innerHTML: overrideOptions.type.icon
      }
    );

    this.element.hidden = false;
    this.element.textContent = text;
    this.element.prepend(iconElement);
    return this.animate(
      (this.animationNames as StringStringObject).animationInName as string,
      overrideAnimationOptions
    ).then(done => {
      if (duration !== Infinity) {
        setTimeout(() => {
          this.hide();
        }, duration);
      }
    });
  }

  hide(
    /* animationName = 'fadeOutRight' */ overrideAnimationOptions:
      | AnimationOptions
      | undefined = this.animationOptions
  ) {
    return this.animate(
      (this.animationNames as StringStringObject).animationOutName as string,
      overrideAnimationOptions
    ).then(() => {
      this.element.hidden = true;
    });
  }
}
