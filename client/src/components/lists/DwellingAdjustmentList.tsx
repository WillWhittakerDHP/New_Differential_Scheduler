import React, { useContext, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
import type { DwellingAdjustmentData } from '../../interfaces/serviceInterfaces';

// Define the props for the component
interface DwellingAdjustmentsListProps {
//   DwellingAdjustments: DwellingAdjustmentData[] | null;
}

const DwellingAdjustmentsList: React.FC<DwellingAdjustmentsListProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('DwellingAdjustmentsList must be used within an AppointmentProvider');
  }

  const { dwellingAdjustments, setThisDwellingAdjustment } = context;

  const handlePropertyTypeSelect = (selectedDwellingAdjustment: DwellingAdjustmentData) => {
    setThisDwellingAdjustment(selectedDwellingAdjustment);
  };

  
  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Property Type from DwellingAdjustmentstList.tsx</h4>
      <Row>
        {dwellingAdjustments && dwellingAdjustments.length > 0 ? (
          dwellingAdjustments.map((DwellingAdjustment) => (
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
