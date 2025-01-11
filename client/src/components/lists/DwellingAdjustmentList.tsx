import React, { useContext, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
// import { retrieveDwellingAdjustmentByID } from '../../api/internalAPI/appointmentAPI';

import type { DwellingAdjustmentData } from '../../interfaces/apiInterfaces';

// Define the props for the component
interface DwellingAdjustmentsProps {
//   DwellingAdjustments: DwellingAdjustmentData[] | null;
}

const DwellingAdjustmentsList: React.FC<DwellingAdjustmentsProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('DwellingAdjustmentsList must be used within an AppointmentProvider');
  }

  const { availableDwellingAdjustments, thisDwellingAdjustment,setThisDwellingAdjustment } = context;

  const handlePropertyTypeSelect = (selectedDwellingAdjustment: DwellingAdjustmentData) => {
    setThisDwellingAdjustment(selectedDwellingAdjustment);
  };

  // // Fetch DwellingAdjustment types
  // const fetchDwellingAdjustmentByID = async () => {
  //   if (thisDwellingAdjustment !== undefined)
  //     try {
  //   if(thisDwellingAdjustment) {
  //     const data = await retrieveDwellingAdjustmentByID(thisDwellingAdjustment.id);
  //     const dwellingAdjustment: DwellingAdjustmentData = JSON.parse(JSON.stringify(data));
  //     console.log('dwellingAdjustment from DwellingAdjustmentsList.tsx', dwellingAdjustment);
  //     if (dwellingAdjustment !== undefined && dwellingAdjustment !== null)
  //     setThisDwellingAdjustment(dwellingAdjustment);
  //       } else {
  //         throw new Error()
  //       }
  //     } catch (error) {
  //       console.error('Error fetching Service types:', error);
  //     }
  //   };
  
  //   useEffect(() => {
  //     fetchDwellingAdjustmentByID();
  //   }, [thisDwellingAdjustment, setThisDwellingAdjustment]);

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Property Type from DwellingAdjustmentstList.tsx</h4>
      <Row>
        {availableDwellingAdjustments && availableDwellingAdjustments.length > 0 ? (
          availableDwellingAdjustments.map((DwellingAdjustment) => (
            <Button
            key={DwellingAdjustment.id}
            onClick={() => handlePropertyTypeSelect(DwellingAdjustment)}
            style={{ cursor: 'pointer' }}
            // variant={thisDwellingAdjustment.includes(type) ? "primary" : "outline-primary"}
            className="m-2">
            {DwellingAdjustment.name}
            </Button>
          ))
        ) : (
          <p>Loading Dwelling Adjustments...</p>
        )}
      </Row>
    </Container>
    );
  };
  
  export default DwellingAdjustmentsList;
