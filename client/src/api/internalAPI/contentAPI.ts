import { ServiceData, AdditionalServiceData, AvailabilityOptionData, DwellingAdjustmentData } from "../../interfaces/appointmentInterfaces";

 // GET request to the Services endpoint to fetch Services data for the state UserType.
const retrieveServiceDataByID = async (id: number | null): Promise<ServiceData> => {
  try {
    const response = await fetch(`/internal/appointment/appointmentContent/services/${id}`, {
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

const retrieveServiceDataByIDForAssociatedAdditionalServices = async (id: number | null): Promise<ServiceData> => {
  try {
    const response = await fetch(`/internal/appointment/appointmentContent/services/as/${id}`, {
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

const retrieveServiceDataByIDForAssociatedAvailabilityOptions = async (id: number | null): Promise<ServiceData> => {
  try {
    const response = await fetch(`/internal/appointment/appointmentContent/services/ao/${id}`, {
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

const retrieveServiceDataByIDForAssociatedDwellingAdjustments = async (id: number | null): Promise<ServiceData> => {
  try {
    const response = await fetch(`/internal/appointment/appointmentContent/services/da/${id}`, {
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

 // GET request to the AdditionalServices endpoint to fetch AdditionalServices data for the state Service.
 const retrieveAdditionalServiceDataByID = async (id: number | null): Promise<AdditionalServiceData> => {
  try {
    const response = await fetch(`/internal/appointment/appointmentContent/additionalServices/${id}`, {
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


 // GET request to the AvailabilityOptions endpoint to fetch AvailabilityOptions data for the state Service.
const retrieveAvailabilityOptionDataByID = async (id: number | null): Promise<AvailabilityOptionData> => {
  try {
    const response = await fetch(`/internal/appointment/appointmentContent/availabilityOptions/${id}`, {
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


 // GET request to the DwellingAdjustments endpoint to fetch DwellingAdjustments data for the state Service.
 const retrieveDwellingAdjustmentDataByID = async (id: number | null): Promise<DwellingAdjustmentData> => {
  try {
    const response = await fetch(`/internal/appointment/appointmentContent/dwellingAdjustments/${id}`, {
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

export { retrieveServiceDataByID, retrieveServiceDataByIDForAssociatedAdditionalServices, retrieveServiceDataByIDForAssociatedAvailabilityOptions, retrieveServiceDataByIDForAssociatedDwellingAdjustments, retrieveAdditionalServiceDataByID, retrieveAvailabilityOptionDataByID, retrieveDwellingAdjustmentDataByID };