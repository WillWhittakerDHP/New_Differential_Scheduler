import { UserTypeData, ServiceTypeData } from "../../interfaces/serviceInterfaces";
import { TimeContentData } from "../../interfaces/appointmentInterfaces";

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

const retrieveServiceByID = async (id: number | null): Promise<ServiceTypeData> => {
  try {
    const response = await fetch(`/internal/appointment/service/structure/se/${id}`, {
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
    return {} as ServiceTypeData;
  }
};


const retrieveAdditionalServicesForServiceByID = async (id: number | null): Promise<ServiceTypeData> => {
  try {
    const response = await fetch(`/internal/appointment/service/structure/as/${id}`, {
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
    return {} as ServiceTypeData;
  }
}


const retrieveAvailabilityOptionsForServiceByID = async (id: number | null): Promise<ServiceTypeData> => {
  try {
    const response = await fetch(`/internal/appointment/service/structure/ao/${id}`, {
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
    return {} as ServiceTypeData;
  }
}


const retrieveDwellingAdjustmentsForServiceByID = async (id: number | null): Promise<ServiceTypeData> => {
  try {
    const response = await fetch(`/internal/appointment/service/structure/da/${id}`, {
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
    return {} as ServiceTypeData;
  }
}

const retrieveServiceTimeContent = async (id: number | null): Promise<TimeContentData[]> => {
  try {
    const response = await fetch(`/internal/appointment/service/structure/tc/${id}`, {
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
    return {} as TimeContentData[];
  }
}

export { 
  retrieveAllVisibleUserTypes, 
  retrieveServicesForUserTypeByID, 
  retrieveServiceByID, 
  retrieveDwellingAdjustmentsForServiceByID, 
  retrieveAdditionalServicesForServiceByID, 
  retrieveAvailabilityOptionsForServiceByID, 
  retrieveServiceTimeContent,
};