import { Event } from "src/types";

const EVENTS_KEY = "calendarEvents";

export const EVENTS: Record<Event["date"], Event[]> =
  JSON.parse(localStorage.getItem(EVENTS_KEY) || `{}`) || {};

const persistEvents = () =>
  localStorage.setItem(EVENTS_KEY, JSON.stringify(EVENTS));

const eventPositionIsArray = (date: string) => !!Array.isArray(EVENTS[date]);

export const addEvent = (event: Event) => {
  if (!eventPositionIsArray(event.date)) {
    EVENTS[event.date] = [];
  }

  EVENTS[event.date].push(event);
  EVENTS[event.date] = EVENTS[event.date].sort((eventA, eventB) =>
    eventA.startTime > eventB.startTime ? 1 : -1
  );

  persistEvents();
};

export const updateEvent = (event: Event, eventIndex: number) => {
  if (!eventPositionIsArray(event.date)) {
    return;
  }

  EVENTS[event.date][eventIndex] = event;

  persistEvents();
};

export const removeEvent = (event: Event, eventIndex: number) => {
  if (!eventPositionIsArray(event.date)) {
    return;
  }

  EVENTS[event.date].splice(eventIndex, 1);

  persistEvents();
};

export const removeAllEventsFromDate = (date: string) => {
  if (!eventPositionIsArray(date)) {
    return;
  }

  EVENTS[date] = [];

  persistEvents();
};
