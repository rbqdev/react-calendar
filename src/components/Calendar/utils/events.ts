import { Event } from "src/types";

const EVENTS_KEY = "calendarEvents";

export const EVENTS: Record<Event["date"], Event[]> =
  JSON.parse(localStorage.getItem(EVENTS_KEY) || `{}`) || {};

const persistEvents = () =>
  localStorage.setItem(EVENTS_KEY, JSON.stringify(EVENTS));

export const addEvent = (event: Event) => {
  if (!Array.isArray(EVENTS[event.date])) {
    EVENTS[event.date] = [];
  }

  EVENTS[event.date].push(event);
  persistEvents();
};

export const removeEvent = (event: Event) => {
  if (!Array.isArray(EVENTS[event.date])) {
    return;
  }

  EVENTS[event.date] = EVENTS[event.date].filter(
    ({ date }) => date !== event.date
  );
  persistEvents();
};
