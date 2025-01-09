import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
import { retrieveServicesForUserTypeByID, retrieveBaseServiceByID } from '../../api/internalAPI/appointmentAPI';

import type { ServiceData } from '../../interfaces/apiInterfaces';

// Define the props for the component
interface ServicesListProps {
  //   Services: ServiceTypeData[] | null;
  }
  
  const ServicesList: React.FC<ServicesListProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('ServicesList must be used within an AppointmentProvider');
  }

  const { thisUserType, availableServices, thisService, thisAppointment, setThisAppointment, setThisService, setAvailableServices, setAvailableAdditionalServices, setAvailableAvailabilityOptions, setDwellingAdjustments
  } = context;

  // Fetch Service types
  const fetchAllAvailableServices = async () => {
    if (thisUserType !== undefined )
    try {
      if(thisUserType) {
        const data = await retrieveServicesForUserTypeByID(thisUserType.id);
        const availableServices: ServiceData[] = JSON.parse(JSON.stringify(data));
        setAvailableServices(availableServices);
      } else {
        throw new Error()
      }
    } catch (error) {
      console.error('Error fetching Service types:', error);
    }
  };

  useEffect(() => {
    fetchAllAvailableServices();
  }, [thisUserType, setAvailableServices]);

  const handleServiceTypeSelect = (selectedService: ServiceData) => {
    setThisService(selectedService);
  };
  
  // Fetch Associated AdditionalServices, AdditionalServices, and DwellingAdjustments
  const fetchServiceByID = async () => {
    if (thisService !== undefined)
      try {
    if(thisService) {
      const data = await retrieveBaseServiceByID(thisService.id);
      const service: ServiceData = JSON.parse(JSON.stringify(data));
      console.log('service from ServicesList.tsx', service)
          const availableAdditionalServices =  service.AdditionalServices;
          if (availableAdditionalServices !== undefined && availableAdditionalServices !== null)
          setAvailableAdditionalServices(availableAdditionalServices);
          const availableAvailabilityOptions =  service.AvailabilityOptions;
          if (availableAvailabilityOptions !== undefined && availableAvailabilityOptions !== null)
          setAvailableAvailabilityOptions(availableAvailabilityOptions);
          const availableDwellingAdjustments =  service.DwellingAdjustments;
          if (availableDwellingAdjustments !== undefined && availableDwellingAdjustments !== null)
          setDwellingAdjustments(availableDwellingAdjustments);
        } else {
          throw new Error()
        }
      } catch (error) {
        console.error('Error fetching Service types:', error);
      }
    };
  
    useEffect(() => {
      fetchServiceByID();
    }, [thisService, setAvailableAdditionalServices, setAvailableAvailabilityOptions, setDwellingAdjustments]);

    // useEffect(() => {
    //   setThisAppointment(
    //     ...thisAppointment,
    //     base_service: thisService
    //   );
    // }, [thisService, setThisAppointment])

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Service from ServicestList.tsx</h4>
      <Row>
        {availableServices && availableServices.length > 0 ? (
          availableServices.map((service) => (
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
          <p>Loading Service types...</p>
        )}
      </Row>
    </Container>
    );
};

export default ServicesList;
