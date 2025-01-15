import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from '../../context/AppointmentContext';
import { retrieveServicesForUserTypeByID, retrieveBaseServiceByID } from '../../api/internalAPI/appointmentAPI';

import type { ServiceData } from '../../interfaces/apiInterfaces';
import { AppointmentBlock, AppointmentPart, Appointment } from '../../interfaces/appointmentInterfaces';

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
    if (!thisService) return;
  
    try {
      const data = await retrieveBaseServiceByID(thisService.id);
  
      // Construct the newBaseService as an AppointmentPart
      const newBaseService = new AppointmentPart(
        data.name,
        data.base_sq_ft,
            new AppointmentBlock(
              data.data_collection.on_site,
              data.data_collection.client_present,
              data.data_collection.base_time,
              data.data_collection.rate_over_base_time,
              data.data_collection.base_fee,
              data.data_collection.rate_over_base_fee
            ),
            new AppointmentBlock(
              data.report_writing.on_site,
              data.report_writing.client_present,
              data.report_writing.base_time,
              data.report_writing.rate_over_base_time,
              data.report_writing.base_fee,
              data.report_writing.rate_over_base_fee
            ),
            new AppointmentBlock(
              data.formal_presentation.on_site,
              data.formal_presentation.client_present,
              data.formal_presentation.base_time,
              data.formal_presentation.rate_over_base_time,
              data.formal_presentation.base_fee,
              data.formal_presentation.rate_over_base_fee
              )
      );
  
      // Calculate times for the newBaseService based on home_sq_ft
      newBaseService.calculateTimes(thisAppointment?.home_sq_ft || 0);
  
      // Log to verify the calculated times
      console.log("Updated AppointmentPart with calculated times:", newBaseService);
  
      // Update the available additional services
      if (data.AdditionalServices) {
        setAvailableAdditionalServices(data.AdditionalServices);
      }
  
      // Update the available availability options
      if (data.AvailabilityOptions) {
        setAvailableAvailabilityOptions(data.AvailabilityOptions);
      }
  
      // Update the available dwelling adjustments
      if (data.DwellingAdjustments) {
        setAvailableDwellingAdjustments(data.DwellingAdjustments);
      }
  
      // Update thisAppointment with the new base service
      setThisAppointment((prev) => {
        if (!prev) return;
  
        const updatedBaseServiceFee = prev.calculatePartFee(newBaseService);
  
        const updatedAppointment = new Appointment(
          prev.home_sq_ft,
          newBaseService,
          prev.dwelling_type,
          prev.additional_services,
          prev.availability_options,
          prev.data_collection,
          prev.report_writing,
          prev.formal_presentation,
          updatedBaseServiceFee,
          prev.dwelling_type_fee,
          prev.add_service_fees,
          prev.avail_option_fees
        );
  
        // Update aggregated times in the appointment
        updatedAppointment.updateTimes();
  
        console.log("Updated Appointment:", updatedAppointment);
        return updatedAppointment;
      });
    } catch (error) {
      console.error("Error fetching Service types:", error);
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
