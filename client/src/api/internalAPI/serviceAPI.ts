import { ServiceData } from "../../interfaces/appointmentInterfaces";

 // This function sends a GET request to the '/api/Services' endpoint to fetch Services data. It handles errors by logging them to the console and returns an empty array if an error occurs.
const retrieveAllServices = async () => {
  try {
    const response = await fetch('/internal/appointment/appointmentContent/services/', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

 // GET request to the Services endpoint to fetch Services data for the state UserType.
const retrieveServiceByID = async (id: number | null): Promise<ServiceData> => {
  try {
    const response = await fetch(`/internal/appointment/appointmentContent/services/get:${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return {} as ServiceData;
  }
}

export { retrieveAllServices, retrieveServiceByID };