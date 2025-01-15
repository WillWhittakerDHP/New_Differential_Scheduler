import { UserTypeData, ServiceData, AvailabilityOptionData, AdditionalServiceData, DwellingAdjustmentData 
} from "../../interfaces/apiInterfaces";

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
    // console.log('data on appointmentAPI.ts', data)
    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }
    return data;
  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return {} as ServiceData;
  }
};

const retrieveAdditionalServiceByID = async (id: number | null): Promise<AdditionalServiceData> => {
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
    return {} as AdditionalServiceData;
  }
};

const retrieveAvailabilityOptionByID = async (id: number | null): Promise<AvailabilityOptionData> => {
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
    return {} as AvailabilityOptionData;
  }
};

const retrieveDwellingAdjustmentByID = async (id: number | null): Promise<DwellingAdjustmentData> => {
  try {
    const response = await fetch(`internal/appointment/da/${id}`, {
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
    return {} as DwellingAdjustmentData;
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