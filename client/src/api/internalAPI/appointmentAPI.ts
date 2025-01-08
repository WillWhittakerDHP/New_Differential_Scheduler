import { UserTypeData, ServiceData } from "../../interfaces/serviceInterfaces";

const retrieveAllVisibleUserTypes = async () => {
  try {
    const response = await fetch('/internal/appointment/service/structure/', {
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

const retrieveServicesForUserTypeByID = async (id: number | null): Promise<UserTypeData> => {
  try {
    const response = await fetch(`/internal/appointment/service/structure/${id}`, {
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

const retrieveServiceByID = async (id: number | null): Promise<ServiceData> => {
  try {
    const response = await fetch(`internal/appointment/service/admin/serviceTypes/all/${id}`, {
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
};

export { 
  retrieveAllVisibleUserTypes, 
  retrieveServicesForUserTypeByID, 
  retrieveServiceByID
};