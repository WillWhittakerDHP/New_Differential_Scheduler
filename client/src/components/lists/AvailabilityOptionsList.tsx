import React, { useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
// import { retrieveAvailabilityOptionByID } from '../../api/internalAPI/appointmentAPI';

import type { AvailabilityOptionData } from '../../interfaces/serviceInterfaces';

// Define the props for the component
interface AvailabilityOptionsProps {
//   AvailabilityOptions: AvailabilityOptionData[] | null;
}

const AvailabilityOptionsList: React.FC<AvailabilityOptionsProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('AvailabilityOptionsList must be used within an AppointmentProvider');
  }

  const { availableAvailabilityOptions, thisAvailabilityOption,setThisAvailabilityOption } = context;

  const handleAvailabilityOptionTypeSelect = (selectedAvailabilityOption: AvailabilityOptionData) => {
    setThisAvailabilityOption(selectedAvailabilityOption);
  };

  // // Fetch AvailabilityOption types
  // const fetchAvailabilityOptionByID = async () => {
  //   if (thisAvailabilityOption !== undefined)
  //     try {
  //   if(thisAvailabilityOption) {
  //     const data = await retrieveAvailabilityOptionByID(thisAvailabilityOption.id);
  //     const availabilityOption: AvailabilityOptionData = JSON.parse(JSON.stringify(data));
  //     console.log('availabilityOption from AvailabilityOptionsList.tsx', availabilityOption);
  //     if (availabilityOption !== undefined && availabilityOption !== null)
  //     setThisAvailabilityOption(availabilityOption);
  //       } else {
  //         throw new Error()
  //       }
  //     } catch (error) {
  //       console.error('Error fetching Service types:', error);
  //     }
  //   };
  
  //   useEffect(() => {
  //     fetchAvailabilityOptionByID();
  //   }, [thisAvailabilityOption, setThisAvailabilityOption]);

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Availability Option from AvailabilityOptionstList.tsx</h4>
      <Row>
        {availableAvailabilityOptions && availableAvailabilityOptions.length > 0 ? (
          availableAvailabilityOptions.map((DwellingAdjustment) => (
            <Button
            key={DwellingAdjustment.id}
            onClick={() => handleAvailabilityOptionTypeSelect(DwellingAdjustment)}
            style={{ cursor: 'pointer' }}
            // variant={thisDwellingAdjustment.includes(type) ? "primary" : "outline-primary"}
            className="m-2">
            {DwellingAdjustment.name}
            </Button>
          ))
        ) : (
          <p>Loading Availability Options...</p>
        )}
      </Row>
    </Container>
    );
};

export default AvailabilityOptionsList;
