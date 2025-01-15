import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'; 

import { AppointmentContext } from "../context/AppointmentContext";

import DwellingAdjustmentsList from "../components/lists/DwellingAdjustmentList";
// import AddressForm from "../components/forms/addressForm";
// import PropertyInfoForm from "../components/forms/propertyInfoForm";


const PropertyPage: React.FC = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('PropertyPage must be used within an AppointmentProvider');
  }


  const navigate = useNavigate(); // Initialize navigate for navigation
  
  const handlePrevious = () => {
      navigate('/serviceSelection'); 
    };  
    
    const handleNext = () => {
        navigate('/appointmentAvailability'); 
      };  
      
  return (
    <>
    <DwellingAdjustmentsList />
    {/* <AddressForm /> */}
    {/* <PropertyInfoForm /> */}

      <div className="button-container">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
};

export default PropertyPage;