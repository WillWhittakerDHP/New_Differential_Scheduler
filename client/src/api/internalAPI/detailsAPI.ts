// import { DescriptionsData } from "../../interfaces/detailInterfaces"

// const retrieveDescriptionForUserTypeByID = async (id: number | null): Promise<DescriptionsData> => {
//   try {
//     const response = await fetch(`/internal/appointment/details/descriptions/${id}`, {
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
//     return {} as DescriptionsData;
//   }
// }

// export {
//   retrieveDescriptionForUserTypeByID
// }