import { UtilsArray } from './../utils/utils-array';

// https://gist.github.com/gordonbrander/2230317
function _generateAnimationID() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

const animationCleanupQueue: object[] = [];

setInterval(() => {
  while (animationCleanupQueue.length) {
    let handler = animationCleanupQueue.shift();

    try {
      handler ? handler() : null;
    } catch (e) {
      console.error('error executing handler in queue');
    }
  }
}, 0);

export interface AnimationOptions {
  speed?: string;
  interruptible?: Boolean;
}

export const AnimationManager = {
  Constants: {
    SPEED_FAST: 'fast',
    SPEED_VERY_FAST: 'faster',
    SPEED_SLOW: 'slow',
    SPEED_VERY_SLOW: 'slower'
  },

  animationsOnGoing: [],

  animate(
    element: HTMLElement,
    animationName: string,
    opts: AnimationOptions = {}
  ) {
    let defaultOpts = {
      interruptible: false,
      speed: AnimationManager.Constants.SPEED_FASTER
    };

    opts = { ...defaultOpts, ...opts };

    return new Promise((resolve, reject) => {
      let animationIndex = UtilsArray.findObject(this.animationsOnGoing, {
        element
      });

      if (
        animationIndex > -1 &&
        !this.animationsOnGoing[animationIndex].opts.interruptible
      ) {
        reject('animation is ongoing');
      }

      if (animationIndex > -1) {
        this.cancel(element);
      }

      let _animationName = ['animated', animationName, opts.speed];
      element.classList.add(...(_animationName as string[]));

      element.addEventListener('animationstart', e => {
        if (e.target !== e.currentTarget) return;

        // @ts-ignore
        this.animationsOnGoing.push({
          // @ts-ignore
          element,
          // @ts-ignore
          animationName: _animationName,
          // @ts-ignore
          id: _generateAnimationID(),
          // @ts-ignore
          opts
        });
      });

      element.addEventListener(
        'animationend',
        e => {
          animationCleanupQueue.push(() => {
            element.classList.remove(...(_animationName as string[]));

            let animationIndex = UtilsArray.findObject(
              this.animationsOnGoing,
              // @ts-ignore
              { element }
            );
            this.animationsOnGoing.splice(animationIndex, animationIndex + 1);

            resolve();
          });
        },
        {
          once: true
        }
      );
    });
  },

  cancel(element: HTMLElement) {
    let animationIndex = UtilsArray.findObject(this.animationsOnGoing, {
      element
    });

    if (animationIndex > -1) {
      let object = this.animationsOnGoing[animationIndex];
      // @ts-ignore
      object.element.classList.remove(
        // @ts-ignore
        ...object.animationName
      );
    }
  }
};
