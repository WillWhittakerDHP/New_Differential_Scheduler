import React, { useContext, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
import { retrieveAdditionalServiceByID } from '../../api/internalAPI/appointmentAPI';

import type { AdditionalServiceData } from '../../interfaces/apiInterfaces';
import { AppointmentBlock, AppointmentPart, PartTimes, Appointment } from '../../interfaces/appointmentInterfaces';

// Define the props for the component
interface AdditionalServicesProps {
//   AdditionalServices: AdditionalServiceData[] | null;
}

const AdditionalServicesList: React.FC<AdditionalServicesProps> = () => {
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

            // Calculate times for the newAdditionalService based on home_sq_ft
            const calculatedTimes: PartTimes = newAdditionalService.calculatePartTimes(
              thisAppointment!.home_sq_ft || 0,
              newAdditionalService
            );

          // Update the times field in newAdditionalService
          newAdditionalService.times = calculatedTimes;

          // Log to verify the calculated times
          console.log("Calculated PartTimes:", calculatedTimes);
          console.log("Updated AppointmentPart:", newAdditionalService);

            

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
                  prev.data_collection_time,
                  prev.report_writing_time,
                  prev.client_presentation_time,
                  prev.base_service_fee,
                  prev.dwelling_type_fee,
                  updatedAdditionalServiceFees,
                  prev.avail_option_fees,
                )
              : new Appointment(
                  0, // Provide default values if prev is undefined
                  undefined,
                  newAdditionalService,
                  undefined,
                  undefined,
                  0,
                  0,
                  0,
                  0,
                  0,
                  [0],
                  []
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
