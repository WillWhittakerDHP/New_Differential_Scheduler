import { UIDescriptionsData } from '../../../../interfaces/appointmentInterfaces';

 // This function sends a GET request to the '/api/UIDescriptions' endpoint to fetch
 // UIDescriptions data. It handles errors by logging them to the console and returns
 // an empty array if an error occurs.
const retrieveAllUIDescriptions = async () => {
  try {
    const response = await fetch('internal/appointment/structure/uiDescriptions/getall', {
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

const retrieveUIDescriptionByID = async (id: number | null): Promise<UIDescriptionsData> => {
  try {
    const response = await fetch(`internal/appointment/structure/uiDescriptions/get:id${id}`, {
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
    return {} as UIDescriptionsData;
  }
}
export { retrieveAllUIDescriptions, retrieveUIDescriptionByID };