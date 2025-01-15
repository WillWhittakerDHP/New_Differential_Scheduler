import React, { useContext, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { AppointmentContext } from '../../context/AppointmentContext';
import { retrieveAdditionalServiceByID } from '../../api/internalAPI/appointmentAPI';

import type { AdditionalServiceData } from '../../interfaces/apiInterfaces';
import { AppointmentBlock, AppointmentPart, Appointment } from '../../interfaces/appointmentInterfaces';

// Define the props for the component
interface AdditionalServicesListProps {
  //   Services: AdditionalServiceData[] | null;
  }
  
  const AdditionalServicesList: React.FC<AdditionalServicesListProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('AdditionalServicesList must be used within an AppointmentProvider');
  }

  const { availableAdditionalServices, thisAdditionalService, thisAppointment, setThisAdditionalService, setThisAppointment} = context;

  const handleAdditionalServiceTypeSelect = (selectedAdditionalService: AdditionalServiceData) => {
    setThisAdditionalService(selectedAdditionalService);
  };


  // Fetch Associated AdditionalServices, AdditionalServices, and AdditionalServices
  const fetchAdditionalServiceByID = async () => {
    if (thisAdditionalService !== undefined) {
      try {
        if (thisAdditionalService) {
          const data = await retrieveAdditionalServiceByID(thisAdditionalService.id);
          // Construct newAdditionalService as an AppointmentPart
          const newAdditionalService = new AppointmentPart(
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
      newAdditionalService.calculateTimes(thisAppointment?.home_sq_ft || 0);
  
      // Log to verify the calculated times
      console.log("Updated AppointmentPart with calculated times:", newAdditionalService);


            

          // Update thisAppointment with the new AppointmentPart
          setThisAppointment((prev) => {
              if (prev !== undefined) {
                // Calculate the fee for the new additional service
                const newPartFee = prev.calculatePartFee(newAdditionalService) ?? 0;
                console.log("New Additional Service Fee:", newPartFee);
            
                // Append the new additional service to the existing array
                const updatedAdditionalServices = [...(prev.additional_services ?? []), newAdditionalService];
            
                // Append the new fee to the existing fee array
                const updatedAdditionalServiceFees = [...(prev.add_service_fees ?? []), newPartFee];
            
            
                // Append the new additional service to the existing array
            console.log(updatedAdditionalServiceFees);
            const updatedAppointment = prev
              ? new Appointment(
                prev.home_sq_ft,
                prev.base_service,
                prev.dwelling_type,
                updatedAdditionalServices,
                prev.availability_options,
                prev.data_collection,
                prev.report_writing,
                prev.formal_presentation,
                prev.base_service_fee,
                prev.dwelling_type_fee,
                updatedAdditionalServiceFees,
                prev.avail_option_fees
                )
              : new Appointment(
                  0, // Provide default values if prev is undefined
                  undefined,
                  newAdditionalService,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  0,
                  0,
                  [0],
                  [0]
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
    fetchAdditionalServiceByID();
    console.log(thisAppointment);
  }, [
    thisAdditionalService,
  ]);


  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Availability Option from AdditionalServicestList.tsx</h4>
      <Row>
        {availableAdditionalServices && availableAdditionalServices.length > 0 ? (
          availableAdditionalServices.map((AdditionalService) => (
            <Button
            key={AdditionalService.id}
            onClick={() => handleAdditionalServiceTypeSelect(AdditionalService)}
            style={{ cursor: 'pointer' }}
            // variant={thisAdditionalService.includes(type) ? "primary" : "outline-primary"}
            className="m-2">
            {AdditionalService.name}
            </Button>
          ))
        ) : (
          <p>Loading Availability Options...</p>
        )}
      </Row>
    </Container>
    );
};

export default AdditionalServicesList;
