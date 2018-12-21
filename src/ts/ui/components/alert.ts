import { AnimationOptions } from '../animation-agent';
import { UtilsUI } from './../ui-utils';
import { StringAnyObject } from './../../interfaces';
import { Component } from './component';
import * as Mustache from 'mustache';

type AlertPosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';

interface AlertType {
  color: string;
  icon: string;
}
interface AlertOption {
  type?: AlertType;
  animationInName?: string;
  animationOutName?: string;
  position?: AlertPosition;
  duration?: number;
  confirmation?: StringAnyObject;
  color?: string;
}

export class Alert extends Component {
  private alertOptsKeys: any[];
  private alertTypes: StringAnyObject;
  private defaultOptions: AlertOption;

  static readonly CLASSNAME_COMPONENT = [
    Component.CLASSNAME_PREFIX,
    'alert'
  ].join('__');

  static readonly CLASSNAME_ICON = [Alert.CLASSNAME_COMPONENT, 'icon'].join(
    '__'
  );

  static readonly CLASSNAME_CONFIRMATION = [
    Alert.CLASSNAME_COMPONENT,
    'confirmation'
  ].join('__');

  constructor(
    protected element: HTMLElement = UtilsUI.createElement('div'),
    protected container: HTMLElement = document.body
  ) {
    super(Alert.CLASSNAME_COMPONENT, element, container);

    this.alertOptsKeys = ['type', 'color', 'confirmation', 'position'];
    this.alertTypes = {
      notification: {
        color: '#227093',
        icon: '<i class="fas fa-bell"></i>'
      },
      loading: {
        color: '#182C61',
        icon: '<i class="fas fa-spinner fa-spin"></i>'
      },
      warning: {
        color: '#ffb142',
        icon: '<i class="fas fa-exclamation-triangle"></i>'
      },
      danger: {
        color: '#ff5252',
        icon: '<i class="fas fa-radiation-alt"></i>'
      }
    };

    this.defaultOptions = {
      type: this.alertTypes.notification,
      position: 'top-right' as AlertPosition,
      duration: 3000,
      animationInName: 'fadeInRight',
      animationOutName: 'fadeOutRight',
      confirmation: undefined
    };
  }

  show(text: string, opts: AlertOption = this.defaultOptions) {
    opts = { ...this.defaultOptions, ...opts };

    let template = `
      <div class="row">
        <span class="${Alert.CLASSNAME_ICON}">${opts.type.icon}</span>
        <span>${text}</span>
      </div>
    `;
    let confirmationTemplate = `
      <div class="row row--gap ${Alert.CLASSNAME_CONFIRMATION}">
        <button class="btn btn--white">{{btnYesText}}</button>
        <button class="btn btn--white">{{btnNoText}}</button>
      </div>
    `;

    UtilsUI.styleElement(this.element, { backgroundColor: opts.type.color });

    // @ts-ignore
    let [pos1, pos2] = opts.position.split('-');
    let defaultPositionValue = 10 + 'px';
    UtilsUI.styleElement(this.element, {
      [pos1]: defaultPositionValue,
      [pos2]: defaultPositionValue
    });

    if (opts.confirmation) {
      let { btnYesText, btnNoText } = opts.confirmation;
      template += confirmationTemplate;
      template = Mustache.render(template, {
        btnYesText,
        btnNoText
      });
    }

    this.preventOverlapping();

    // showing component
    this.element.hidden = false;
    this.element.innerHTML = template;

    // confirmation button listener
    let [btnYes, btnNo] = UtilsUI.$$(
      '.' + Alert.CLASSNAME_CONFIRMATION + ' .btn'
    );
    if (btnYes && btnNo) {
      btnYes.addEventListener('click', opts.confirmation.cbYes);
      btnNo.addEventListener('click', opts.confirmation.cbNo);
    }

    this.animate(opts.animationInName).then(done => {
      if (opts.duration !== Infinity) {
        setTimeout(() => {
          this.hide();
        }, opts.duration);
      }
    });
  }

  hide(animationName: string = this.defaultOptions.animationOutName) {
    this.animate(animationName).then(done => {
      this.element.hidden = true;
    });
  }

  private preventOverlapping() {
    let alerts = UtilsUI.$$('.' + Alert.CLASSNAME_COMPONENT);
    if (alerts.length <= 1) return;

    let lastAlert = alerts[alerts.length - 2];

    let lastAlertHeight = lastAlert.offsetHeight;
    let top = 10;
    let margin = 10;

    UtilsUI.styleElement(this.element, {
      top: lastAlertHeight + top + margin + 'px'
    });
  }
}
