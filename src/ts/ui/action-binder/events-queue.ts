interface EventHandler {
  param: Event;
  filter?: string;
  handler: (e: Event) => void;
}

export const eventsQueue: Array<EventHandler> = [];

setInterval(() => {
  while (eventsQueue.length) {
    let event = eventsQueue.shift() as EventHandler;

    try {
      event.handler(event.param);
    } catch (e) {
      console.error('Error executing event handler!');
    }
  }
}, 1);
