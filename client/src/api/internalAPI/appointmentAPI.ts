import { UserTypeData, ServiceData } from "../../interfaces/apiInterfaces";

const retrieveVisibleUserTypes = async () => {
  try {
    const response = await fetch('/internal/appointment/', {
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
    const response = await fetch(`/internal/appointment/${id}`, {
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

const retrieveBaseServiceByID = async (id: number | null): Promise<ServiceData> => {
  try {
    const response = await fetch(`internal/appointment/bs/${id}`, {
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

const retrieveAdditionalServiceByID = async (id: number | null): Promise<ServiceData> => {
  try {
    const response = await fetch(`internal/appointment/as/${id}`, {
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

const retrieveAvailabilityOptionByID = async (id: number | null): Promise<ServiceData> => {
  try {
    const response = await fetch(`internal/appointment/ao/${id}`, {
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

const retrieveDwellingAdjustmentByID = async (id: number | null): Promise<ServiceData> => {
  try {
    const response = await fetch(`internal/appointment/ad/${id}`, {
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
  retrieveVisibleUserTypes, 
  retrieveServicesForUserTypeByID, 
  retrieveBaseServiceByID,
  retrieveAdditionalServiceByID,
  retrieveAvailabilityOptionByID,
  retrieveDwellingAdjustmentByID
};