// import React, { useState } from 'react';
// import dotenv from 'dotenv';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

// dotenv.config({ path: '../../../../server/.env' }); // Load environment variables from a .env file into process.env

// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;

// const AddressForm: React.FC = () => {
//   const [address, setAddress] = useState('');

//   const handleSelect = (place) => {
//     setAddress(place.formatted_address);
//     // Optionally, extract more details from the place object
//   };

//   return (
//     <div>
//       <GooglePlacesAutocomplete 
//         apiKey={GOOGLE_API_KEY}
//         selectProps={{
//           value: address,
//           onChange: setAddress,
//         }}
//         autocompletionRequest={{
//           // Optional: Customize search options
//           componentRestrictions: { country: 'us' }
//         }}
//       />
//     </div>
//   );
// };

// export default AddressForm;

// TODO: Google Places Autocomplete API