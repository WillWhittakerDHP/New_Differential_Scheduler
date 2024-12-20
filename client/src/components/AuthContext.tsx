// // import React from 'react'; 
// import { AuthProvider } from './AuthContext';
// import { useState } from 'react';


// // The AuthProvider component manages the isLoggedIn state for the application.
// export const AuthContext = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // Define a state variable 'isLoggedIn' with an initial value of false.

//   // Function to log in
//   const login = () => {
//     setIsLoggedIn(true);
//   };

//   // Function to log out
//   const logout = () => {
//     setIsLoggedIn(false);
//   };

//   // Provide the isLoggedIn state and functions to the context.
//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext