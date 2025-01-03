import { UserTypeData } from "../../interfaces/appointmentInterfaces";

const retrieveAllVisibleUserTypes = async () => {
  try {
    const response = await fetch('/internal/appointment/service/userTypes/', {
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

const retrieveUserTypeDataByIDForAssociatedServices = async (id: number | null): Promise<UserTypeData> => {
  try {
    const response = await fetch(`internal/participants/userTypes/${id}`, {
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
    return {} as UserTypeData;
  }
}

export { retrieveAllVisibleUserTypes, retrieveUserTypeDataByIDForAssociatedServices };