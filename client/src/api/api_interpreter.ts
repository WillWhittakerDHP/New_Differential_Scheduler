// import { ClockTime, TimePeriod } from '../utils/availability/timeslots';
// import { fetchCalendarEvents } from './calendarCalls';


// const startDateArray: string[] = [];
// const endDateArray: string[] = [];
// const eventArray: TimePeriod[] = [];

// const eventData = await fetchCalendarEvents();

// interface CalendarEvent {
//     kind: string;
//     etag: string;
//     id: string;
//     status: string;
//     htmlLink: string;
//     created: string;
//     updated: string;
//     summary?: string;
//     creator: {
//       email: string;
//       self: boolean;
//     };
//     organizer: {
//       email: string;
//       self: boolean;
//     };
//     start?: {
//       dateTime?: string; // Events with specific times
//       date?: string;     // All-day events
//       timeZone?: string;
//     };
//     end?: {
//       dateTime?: string; // Events with specific times
//       date?: string;     // All-day events
//       timeZone?: string;
//     };
//     iCalUID: string;
//     sequence: number;
//     reminders: {
//       useDefault: boolean;
//     };
//     eventType: string;
//   }
  

// eventData.forEach((event: CalendarEvent) => {

// let startTime = event.start?.dateTime;
// let endTime = event.end?.dateTime;

// let startTimeDate = startTime?.slice(0,10);
// let startTimeHr= startTime?.slice(11, 13) as unknown as number;
// let startTimeMin = startTime?.slice(14,16) as unknown as number;
// let endTimeDate = endTime?.slice(0,10);
// let endTimeHr = endTime?.slice(11,13) as unknown as number;
// let endTimeMin = endTime?.slice(14,16) as unknown as number;

// let startTimeConvert: ClockTime =  { hours: startTimeHr, minutes: startTimeMin }
// let endTimeConvert: ClockTime =  { hours: endTimeHr, minutes: endTimeMin }

// let eventPeriod: TimePeriod = {start: startTimeConvert, end: endTimeConvert}

// startDateArray.push(startTimeDate || '');
// endDateArray.push(endTimeDate || '');
// eventArray.push(eventPeriod);
// })

// export { startDateArray, endDateArray, eventArray };




// console.log({ startDateArray, endDateArray, eventArray });
// console.log(eventArray[0],eventArray[1]);
