import {TimePeriod} from "../../../server/src/utils/timeslots";
import {DaysWithRanges} from "../components/calendar"
export const getRandomData = () => {
    const days_keys : Date[] = []
    for(let x = 1; x<=31;x++){
      days_keys.push(new Date(2024, 11, x))
    }
  const values: [TimePeriod[]] = [[]];

  for (let i = 0; i < 31; i++) {
    const periods: TimePeriod[] = [];
    const length = Math.floor(Math.random() * 16); // Random length between 0 and 15

    let currentHours = 0; // Start from midnight
    let currentMinutes = 0;

    for (let j = 0; j < length; j++) {
      const durationHours = Math.floor(Math.random() * 6); // Duration 0–5 hours
      const durationMinutes = Math.floor(Math.random() * 60); // Duration 0–59 minutes

      // Calculate the start time
      const start = { hours: currentHours, minutes: currentMinutes };

      // Calculate the end time
      let endMinutes = currentMinutes + durationMinutes;
      let endHours = currentHours + durationHours;

      if (endMinutes >= 60) {
        endMinutes -= 60;
        endHours += 1;
      }

      if (endHours >= 24) break; // Stop if the end time goes beyond 24 hours

      const end = { hours: endHours, minutes: endMinutes };

      // Add the time period
      periods.push({ start, end });

      // Update current time for the next period
      currentHours = endHours;
      currentMinutes = endMinutes;
    }

    values.push(periods);
    
  }

  const scheduleMap: Map<string, TimePeriod[]> = new Map();
  days_keys.forEach((key, index) => {
    scheduleMap.set(key.toISOString(), values[index]);
  });
  return scheduleMap
}


export const inspectorTimes: DaysWithRanges = {
  daysMap : getRandomData()
};

export const clientTimes: DaysWithRanges = {
  daysMap : getRandomData()
};


