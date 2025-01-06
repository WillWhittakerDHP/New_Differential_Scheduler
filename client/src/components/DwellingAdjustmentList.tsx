import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from './AppointmentContext';
import { retrieveDwellingAdjustmentsForServiceByID } from '../api/internalAPI/appointmentAPI';
import type { DwellingAdjustmentData } from '../interfaces/serviceInterfaces';

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

  const { thisService, availableDwellingAdjustments, setAvailableDwellingAdjustments, setThisDwellingAdjustment } = context;

  // Fetch DwellingAdjustment types
  const fetchAllAvailableDwellingAdjustmentTypes = async () => {
    if (thisService !== undefined )
    try {
      if(thisService) {
        const data = await retrieveDwellingAdjustmentsForServiceByID(thisService.id);
        const availableDwellingAdjustments: DwellingAdjustmentData[] = JSON.parse(JSON.stringify(data));
        setAvailableDwellingAdjustments(availableDwellingAdjustments);
      } else {
        throw new Error()
      }
    } catch (error) {
      console.error('Error fetching Service types:', error);
    }
  };

  useEffect(() => {
    fetchAllAvailableDwellingAdjustmentTypes();
  }, [thisService, setAvailableDwellingAdjustments]);

  const handleDwellingAdjustmentTypeSelect = (selectedDwellingAdjustment: DwellingAdjustmentData) => {
    setThisDwellingAdjustment(selectedDwellingAdjustment);
  };

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Dwelling Adjustment from DwellingAdjustmentstList.tsx</h4>
      <Row>
        {availableDwellingAdjustments && availableDwellingAdjustments.length > 0 ? (
          availableDwellingAdjustments.map((DwellingAdjustment) => (
            <Card
              key={DwellingAdjustment.id}
              onClick={() => handleDwellingAdjustmentTypeSelect(DwellingAdjustment)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Title>{DwellingAdjustment.name}</Card.Title>
            </Card>
          ))
        ) : (
          <p>Loading Dwelling Adjustments...</p>
        )}
      </Row>
    </Container>
    );
};

export default DwellingAdjustmentsList;
