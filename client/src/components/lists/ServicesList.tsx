import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
import { retrieveServicesForUserTypeByID, retrieveBaseServiceByID } from '../../api/internalAPI/appointmentAPI';

import type { ServiceData } from '../../interfaces/apiInterfaces';
import { AppointmentBlock, PartTimes, AppointmentPart, Appointment } from '../../interfaces/appointmentInterfaces';

// Define the props for the component
interface ServicesListProps {
  //   Services: ServiceData[] | null;
  }
  
  const ServicesList: React.FC<ServicesListProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('ServicesList must be used within an AppointmentProvider');
  }

  const { thisUserType, availableServices, thisService, thisAppointment, setThisAppointment, setThisService, setAvailableServices, setAvailableAdditionalServices, setAvailableAvailabilityOptions, setAvailableDwellingAdjustments
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
  const fetchBaseServiceByID = async () => {
      if (thisService !== undefined) {
        try {
          if (thisService) {
            const data = await retrieveBaseServiceByID(thisService.id);
            // Construct newBaseService as an AppointmentPart
            const newBaseService = new AppointmentPart(
              data.name,
              data.base_sq_ft,
              new AppointmentBlock(
                data.data_collection.on_site,
                data.data_collection.base_time,
                data.data_collection.rate_over_base_time,
                data.data_collection.base_fee,
                data.data_collection.rate_over_base_fee
              ),
              new AppointmentBlock(
                data.report_writing.on_site,
                data.report_writing.base_time,
                data.report_writing.rate_over_base_time,
                data.report_writing.base_fee,
                data.report_writing.rate_over_base_fee
              ),
              new AppointmentBlock(
                data.client_presentation.on_site,
                data.client_presentation.base_time,
                data.client_presentation.rate_over_base_time,
                data.client_presentation.base_fee,
                data.client_presentation.rate_over_base_fee
              ),
              new PartTimes(
                0,
                0,
                0,
                0
              )
            );

            // Calculate times for the newBaseService based on home_sq_ft
            const calculatedTimes: PartTimes = newBaseService.calculatePartTimes(
              thisAppointment!.home_sq_ft || 0,
              newBaseService
            );

          // Update the times field in newBaseService
          newBaseService.times = calculatedTimes;

          // Log to verify the calculated times
          console.log("Calculated PartTimes:", calculatedTimes);
          console.log("Updated AppointmentPart:", newBaseService);

            
            // Set additional services, availability options, and dwelling adjustments
            const availableAdditionalServices = data.AdditionalServices;
            if (availableAdditionalServices !== undefined && availableAdditionalServices !== null) {
              setAvailableAdditionalServices(availableAdditionalServices);
            }
            
            const availableAvailabilityOptions = data.AvailabilityOptions;
            if (availableAvailabilityOptions !== undefined && availableAvailabilityOptions !== null) {
              setAvailableAvailabilityOptions(availableAvailabilityOptions);
            }
            
            const availableDwellingAdjustments = data.DwellingAdjustments;
            if (availableDwellingAdjustments !== undefined && availableDwellingAdjustments !== null) {
              setAvailableDwellingAdjustments(availableDwellingAdjustments);
            }
            
            // Update thisAppointment with the new AppointmentPart
            setThisAppointment((prev) => {
              if ( prev !== undefined ){
              const updatedBaseServiceFee = prev.calculatePartFee(newBaseService);
              const updatedAppointment = prev
                ? new Appointment(
                    prev.home_sq_ft,
                    newBaseService,
                    prev.dwelling_type,
                    prev.additional_services,
                    prev.availability_options,
                    prev.data_collection_time,
                    prev.report_writing_time,
                    prev.client_presentation_time,
                    updatedBaseServiceFee,
                    prev.dwelling_type_fee,
                    prev.add_service_fees,
                    prev.avail_option_fees
                  )
                : new Appointment(
                    0, // Provide default values if prev is undefined
                    newBaseService,
                    undefined,
                    undefined,
                    undefined,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                  );
                  updatedAppointment.updateTimes();
              console.log("Updated Appointment:", updatedAppointment);
              return updatedAppointment;
            }});
          } else {
            throw new Error();
          }
        } catch (error) {
          console.error('Error fetching Service types:', error);
        }
      }
    };
    
    useEffect(() => {
      fetchBaseServiceByID();
      console.log(thisAppointment);
    }, [
      thisService,
      setAvailableAdditionalServices,
      setAvailableAvailabilityOptions,
      setAvailableDwellingAdjustments,
    ]);
    

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
