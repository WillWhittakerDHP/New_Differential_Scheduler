import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from './AppointmentContext';
import { retrieveAdditionalServicesForServiceByID } from '../api/internalAPI/appointmentAPI';
import type { ServiceTypeData } from '../interfaces/serviceInterfaces';

// Define the props for the component
interface AdditionalServicesListProps {
//   Services: ServiceTypeData[] | null;
}

const AdditionalServicesList: React.FC<AdditionalServicesListProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('AdditionalServicesList must be used within an AppointmentProvider');
  }

  const { serviceTypes, setServiceTypes, thisServiceType, setThisServiceType } = context;

  // Fetch user types
  useEffect(() => {
    const fetchAllVisibleServiceTypeServices = async () => {
      try {
        if (thisServiceType) {
          const data = await retrieveAdditionalServicesForServiceByID(thisServiceType.id);
          setServiceTypes(data);
        } else {
          throw new Error()
        }
      } catch (error) {
        console.error('Error fetching user types:', error);
      }
    };

    fetchAllVisibleServiceTypeServices();
  }, [setServiceTypes]);

  // State for selected user type
//   const [thisServiceType, setThisServiceType] = useState<ServiceTypeData | undefined>();

  const handleServiceTypeSelect = (selectedServiceType: ServiceTypeData) => {
    setThisServiceType(selectedServiceType);
  };

  return (
    <Container className="mt-4">
      {/* User Type Selection */}
      <h4 className="mt-4">Select Your Role</h4>
      <Row>
        {serviceTypes && serviceTypes.length > 0 ? (
          serviceTypes.map((service) => (
            <Card
              key={service.id}
              onClick={() => handleServiceTypeSelect(service)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Title>{service.name}</Card.Title>
              <Card.Text>{service.description}</Card.Text>
            </Card>
          ))
        ) : (
          <p>Loading service types...</p>
        )}
      </Row>
    </Container>
    );
};

export default AdditionalServicesList;
