export async function fetchCalendarEvents() {
    try {
      const response = await fetch("http://localhost:3001/api/calendar/events");
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.statusText}`);
      }
  
      const events = await response.json();
      console.log(events);
      return events;
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      throw error; // Re-throw the error to handle it in the calling component
    }
  }


  