import { UserTypeData, ServiceTypeData, AdditionalServiceData, AvailabilityOptionData, DwellingAdjustmentData } from "../../interfaces/serviceInterfaces";

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

 // GET request to the Services endpoint to fetch Services data for the state UserType.
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

//  // GET request to the DwellingAdjustments endpoint to fetch DwellingAdjustments data for the state Service.
// const retrieveDwellingAdjustmentByID = async (id: number | null): Promise<DwellingAdjustmentData> => {
//   try {
//     const response = await fetch(`/internal/appointment/service/structure/da/${id}`, {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error('Invalid user API response, check network tab!');
//     }
//     return data;
//   } catch (err) { 
//     console.log('Error from data retrieval:', err);
//     return {} as DwellingAdjustmentData;
//   }
// };

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

//  // GET request to the AdditionalServices endpoint to fetch AdditionalServices data for the state Service.
// const retrieveAdditionalServiceDataByID = async (id: number | null): Promise<AdditionalServiceData> => {
//   try {
//     const response = await fetch(`/internal/appointment/service/as/structure/as/${id}`, {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error('Invalid user API response, check network tab!');
//     }
//     return data;
//   } catch (err) { 
//     console.log('Error from data retrieval:', err);
//     return {} as AdditionalServiceData;
//   }
// };

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

//  // GET request to the AvailabilityOptions endpoint to fetch AvailabilityOptions data for the state Service.
// const retrieveAvailabilityOptionDataByID = async (id: number | null): Promise<AvailabilityOptionData> => {
//   try {
//     const response = await fetch(`/internal/appointment/service/structure/ao/${id}`, {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error('Invalid user API response, check network tab!');
//     }
//     return data;
//   } catch (err) { 
//     console.log('Error from data retrieval:', err);
//     return {} as AvailabilityOptionData;
//   }
// };

export { 
  retrieveAllVisibleUserTypes, 
  retrieveServicesForUserTypeByID, 
  retrieveServiceByID, 
  retrieveDwellingAdjustmentsForServiceByID, 
  // retrieveDwellingAdjustmentByID, 
  retrieveAdditionalServicesForServiceByID, 
  // retrieveAdditionalServiceDataByID, 
  retrieveAvailabilityOptionsForServiceByID, 
  // retrieveAvailabilityOptionDataByID 
};