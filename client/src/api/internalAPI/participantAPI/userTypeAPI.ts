import { UserTypeData } from "../../../interfaces/appointmentInterfaces";

 // This function sends a GET request to the '/api/UserTypes' endpoint to fetch
 // UserTypes data. It handles errors by logging them to the console and returns
 // an empty array if an error occurs.
// const retrieveAllUserTypes = async () => {
//   try {
//     const response = await fetch('internal/participants/userTypes/getall', {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     console.log(response);
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error('Invalid user API response, check network tab!');
//     }

//     return data;

//   } catch (err) { 
//     console.log('Error from data retrieval:', err);
//     return [];
//   }
// }

const retrieveAllVisibleUserTypes = async () => {
  try {
    const response = await fetch('internal/participants/userTypes/visibleUsers', {
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

// const retrieveUserTypeByID = async (id: number | null): Promise<UserTypeData> => {
//   try {
//     const response = await fetch(`internal/participants/userTypes/get:id${id}`, {
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

export { 
  // retrieveAllUserTypes, 
  retrieveAllVisibleUserTypes
  // , retrieveUserTypeByID 
};