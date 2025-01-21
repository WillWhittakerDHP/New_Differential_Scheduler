import { addMinutes, isBefore } from "date-fns";

// Class Definitions
class JoseTimeSlot {
  constructor(
    public duration: number,
    public slotStart: Date,
    public slotEnd: Date
  ) {}
}

class AppointmentTimeSlot {
  constructor(
    public fullAppointment: JoseTimeSlot | null = null,
    public onSite: JoseTimeSlot | null = null,
    public formalPresentation: JoseTimeSlot | null = null,
    public offSite: JoseTimeSlot | null = null
  ) {}
}

// Helper Function: Create DayBits
function createDayBits(
  startOfDay: Date,
  endOfDay: Date,
  busyPeriods: { start: Date; end: Date }[],
  increment: number
): JoseTimeSlot[] {
  let availableBits: JoseTimeSlot[] = [];
  let currentStart = startOfDay;

  // Iterate through the day, avoiding busy periods
  busyPeriods.forEach((busy) => {
    while (isBefore(currentStart, busy.start)) {
      const slotEnd = addMinutes(currentStart, increment);
      if (isBefore(slotEnd, busy.start)) {
        availableBits.push(
          new JoseTimeSlot(
            increment,
            new Date(currentStart),
            new Date(slotEnd)
          )
        );
      }
      currentStart = slotEnd;
    }
    currentStart = busy.end;
  });

  // Handle any remaining time after the last busy period
  while (isBefore(currentStart, endOfDay)) {
    const slotEnd = addMinutes(currentStart, increment);
    if (isBefore(slotEnd, endOfDay)) {
      availableBits.push(
        new JoseTimeSlot(
          increment,
          new Date(currentStart),
          new Date(slotEnd)
        )
      );
    }
    currentStart = slotEnd;
  }

  return availableBits;
}

// Helper Function: Find Availabilities
function findAvailabilities(
  dayBits: JoseTimeSlot[],
  onSiteDuration: number
): AppointmentTimeSlot[] {
  let availabilities: AppointmentTimeSlot[] = [];
  let contiguousBits: JoseTimeSlot[] = [];

  for (const bit of dayBits) {
    contiguousBits.push(bit);

    // Calculate the total contiguous duration
    const totalDuration = contiguousBits.reduce(
      (sum, slot) => sum + slot.duration,
      0
    );

    if (totalDuration >= onSiteDuration) {
      // Create an availability starting at the first slot in contiguousBits
      const onSiteStart = contiguousBits[0].slotStart;
      const onSiteEnd = addMinutes(onSiteStart, onSiteDuration);

      // Create an AppointmentTimeSlot
      const availability = new AppointmentTimeSlot(
        new JoseTimeSlot(totalDuration, onSiteStart, onSiteEnd), // Full appointment
        new JoseTimeSlot(onSiteDuration, onSiteStart, onSiteEnd), // On-site
        null, // Placeholder for formalPresentation
        null // Placeholder for offSite
      );

      availabilities.push(availability);

      // Remove the first bit to check the next possible start
      contiguousBits.shift();
    }
  }

  return availabilities;
}

// Main Function: Generate Availabilities
function makeAvailabilities(
  startOfDay: Date,
  endOfDay: Date,
  busyPeriods: { start: Date; end: Date }[],
  onSiteDuration: number,
  increment: number = 30
): AppointmentTimeSlot[] {
  // Step 1: Create DayBits
  const dayBits = createDayBits(startOfDay, endOfDay, busyPeriods, increment);

  // Step 2: Find Availabilities
  const availabilities = findAvailabilities(dayBits, onSiteDuration);

  return availabilities;
}

// Example Usage
const startOfDay = new Date(2024, 11, 1, 0, 0);
const endOfDay = new Date(2024, 11, 1, 23, 59);
const busyPeriods = [
  { start: new Date(2024, 11, 1, 0, 0), end: new Date(2024, 11, 1, 7, 0) },
  { start: new Date(2024, 11, 1, 15, 0), end: new Date(2024, 11, 1, 17, 0) },
  { start: new Date(2024, 11, 1, 21, 0), end: new Date(2024, 11, 1, 23, 59) },
];

const onSiteDuration = 170; // 2 hours and 50 minutes
const increment = 30; // 30-minute intervals

const availabilities = makeAvailabilities(
  startOfDay,
  endOfDay,
  busyPeriods,
  onSiteDuration,
  increment
);

console.log(availabilities);
