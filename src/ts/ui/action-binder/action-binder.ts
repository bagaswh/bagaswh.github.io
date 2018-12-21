import { eventsQueue } from './events-queue';
import { EventHandlers } from './event-handlers';
import { UtilsUI } from '../ui-utils';

// non-global functions
function _isValidFilter(filter: string) {
  let isValidSelector;

  try {
    isValidSelector = !!UtilsUI.$$(filter).length;
  } catch {
    isValidSelector = false;
  }

  return isValidSelector;
}

function _filterHandler(filter: string, e: Event, cb: (e: Event) => void) {
  // filter is a selector
  return function() {
    let filteredElements = UtilsUI.$$(filter);
    if (filteredElements.includes(e.target as HTMLElement)) {
      cb(e);
    }
  };
}

export class ActionBinder {
  // binds all elements with `data-action` attribute
  static bindAction() {
    let elements = UtilsUI.$$('[data-action]');

    elements.forEach(element => {
      let attr = (element as HTMLElement).dataset.action as string;
      let pairs = attr.split(';');

      pairs.forEach(pair => {
        let splits = pair.split(':');

        let event = '',
          filter = '',
          namespace = '',
          handler = '',
          options: string[] | string = '';

        // event:namespace:handler:...options or
        // event:filter:namespace:handler:...options
        [event, filter, namespace, handler, options] = splits;
        if (!_isValidFilter(filter)) {
          // shifting value
          [namespace, handler, options] = [filter, namespace, handler];
          filter = '';
        }

        if (!options) {
          options = '';
        } else {
          options = (options as string).split(',');
        }

        if (!filter) {
          filter = '';
        }

        let availableInObjectOptions = ['preventDefault'];

        element.addEventListener(
          event,
          e => {
            let _handler: (e: Event) => void =
              EventHandlers[namespace][handler];
            if (!_handler) return;

            if (options.length) {
              for (let option of options) {
                if (option === 'queueEvents') {
                  eventsQueue.push({
                    param: e,
                    handler: filter
                      ? _filterHandler(filter, e, _handler)
                      : _handler
                  });
                  return;
                }

                if (availableInObjectOptions.includes(option)) {
                  (e as any)[option]();
                }
              }
            }

            if (filter) {
              _filterHandler(filter, e, _handler)();
            } else {
              _handler(e);
            }
          },
          {}
        );
      });
    });
  }
}
