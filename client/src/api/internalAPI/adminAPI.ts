// import { UserTypeData, ServiceData, AdditionalServiceData, AvailabilityOptionData, DwellingAdjustmentData } from "../../interfaces/apiInterfaces";

// const retrieveServicesForUserTypeByID = async (id: number | null): Promise<UserTypeData> => {
//   try {
//     const response = await fetch(`/internal/admin/serviceTypesid}`, {
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
//     return {} as UserTypeData;
//   }
// }

//  // GET request to the Services endpoint to fetch Services data for the state UserType.
// const retrieveServiceByID = async (id: number | null): Promise<ServiceData> => {
//   try {
//     const response = await fetch(`/internal/admin/serviceTypes/${id}`, {
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
//     return {} as ServiceData;
//   }
// };

// const retrieveDwellingAdjustmentsForServiceByID = async (id: number | null): Promise<ServiceData> => {
//   try {
//     const response = await fetch(`/internal/admin/serviceTypes/${id}`, {
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
//     return {} as ServiceData;
//   }
// }

// const retrieveAdditionalServicesForServiceByID = async (id: number | null): Promise<ServiceData> => {
//   try {
//     const response = await fetch(`/internal/admin/serviceTypes/${id}`, {
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
//     return {} as ServiceData;
//   }
// }

// const retrieveAvailabilityOptionsForServiceByID = async (id: number | null): Promise<ServiceData> => {
//   try {
//     const response = await fetch(`/internal/admin/serviceTypes/${id}`, {
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
//     return {} as ServiceData;
//   }
// }


// export {
//   retrieveServicesForUserTypeByID, 
//   retrieveServiceByID, 
//   retrieveDwellingAdjustmentsForServiceByID, 
//   retrieveAdditionalServicesForServiceByID, 
//   retrieveAvailabilityOptionsForServiceByID, 
// };