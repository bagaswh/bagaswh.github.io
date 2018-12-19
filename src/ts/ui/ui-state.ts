import { StringAnyObject } from './../interfaces';

interface UIState {
  Constants: StringAnyObject;

  init: () => void;
  setCurrentBreakpoint: () => void;

  Breakpoint: string;
}

// @ts-ignore
export const UIState: UIState = {
  Constants: {
    MOBILE_BREAKPOINTS: ['mobile-s', 'mobile-m', 'mobile-l', 'tablet']
  },

  init() {
    // breakpoint changes
    this.setCurrentBreakpoint();

    window.addEventListener('resize', e => {
      let previousBreakpoint = this.Breakpoint;
      this.setCurrentBreakpoint();
      if (previousBreakpoint !== this.Breakpoint) {
        window.dispatchEvent(
          new CustomEvent('breakpointchange', { detail: this.Breakpoint })
        );
      }
    });
  },

  setCurrentBreakpoint() {
    if (window.innerWidth >= 1440) {
      this.Breakpoint = 'laptop-l';
    } else if (window.innerWidth >= 1024) {
      this.Breakpoint = 'laptop';
    } else if (window.innerWidth >= 768) {
      this.Breakpoint = 'tablet';
    } else if (window.innerWidth >= 425) {
      this.Breakpoint = 'mobile-l';
    } else if (window.innerWidth >= 375) {
      this.Breakpoint = 'mobile-m';
    } else if (window.innerWidth >= 320) {
      this.Breakpoint = 'mobile-s';
    }
  }
};

UIState.Breakpoint = '';
