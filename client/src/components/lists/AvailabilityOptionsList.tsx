import React, { useContext, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { AppointmentContext } from '../../constants_and_context/AppointmentContext';
import { retrieveAvailabilityOptionByID } from '../../api/internalAPI/appointmentAPI';

import type { AvailabilityOptionData } from '../../interfaces/apiInterfaces';
import { AppointmentBlock, AppointmentPart, Appointment } from '../../interfaces/appointmentInterfaces';

// Define the props for the component
interface AvailabilityOptionsListProps {
  //   Services: AvailabilityOptionData[] | null;
  }
  
  const AvailabilityOptionsList: React.FC<AvailabilityOptionsListProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('AvailabilityOptionsList must be used within an AppointmentProvider');
  }

  const { availableAvailabilityOptions, thisAvailabilityOption, thisAppointment, setThisAvailabilityOption, setThisAppointment} = context;

  const handleAvailabilityOptionTypeSelect = (selectedAvailabilityOption: AvailabilityOptionData) => {
    setThisAvailabilityOption(selectedAvailabilityOption);
  };


  // Fetch Associated AvailabilityOptions, AvailabilityOptions, and AvailabilityOptions
  const fetchAvailabilityOptionByID = async () => {
    if (thisAvailabilityOption !== undefined) {
      try {
        if (thisAvailabilityOption) {
          const data = await retrieveAvailabilityOptionByID(thisAvailabilityOption.id);
          // Construct newAvailabilityOption as an AppointmentPart
          const newAvailabilityOption = new AppointmentPart(
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
              )
            );

      // Calculate times for the newBaseService based on home_sq_ft
      newAvailabilityOption.calculateTimes(thisAppointment?.home_sq_ft || 0);
  
      // Log to verify the calculated times
      console.log("Updated AppointmentPart with calculated times:", newAvailabilityOption);


            

          // Update thisAppointment with the new AppointmentPart
          setThisAppointment((prev) => {
              if (prev !== undefined) {
                // Calculate the fee for the new additional service
                const newPartFee = prev.calculatePartFee(newAvailabilityOption) ?? 0;
                console.log("New Additional Service Fee:", newPartFee);
            
                // Append the new additional service to the existing array
                const updatedAvailabilityOptions = [...(prev.additional_services ?? []), newAvailabilityOption];
            
                // Append the new fee to the existing fee array
                const updatedAvailabilityOptionFees = [...(prev.add_service_fees ?? []), newPartFee];
            
            
                // Append the new additional service to the existing array
            console.log(updatedAvailabilityOptionFees);
            const updatedAppointment = prev
              ? new Appointment(
                prev.home_sq_ft,
                prev.base_service,
                prev.dwelling_type,
                prev.additional_services,
                updatedAvailabilityOptions,
                prev.data_collection,
                prev.report_writing,
                prev.client_presentation,
                prev.base_service_fee,
                prev.dwelling_type_fee,
                prev.add_service_fees,
                updatedAvailabilityOptionFees,
                )
              : new Appointment(
                  0, // Provide default values if prev is undefined
                  undefined,
                  newAvailabilityOption,
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
    fetchAvailabilityOptionByID();
    console.log(thisAppointment);
  }, [
    thisAvailabilityOption,
  ]);


  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Availability Option from AvailabilityOptionstList.tsx</h4>
      <Row>
        {availableAvailabilityOptions && availableAvailabilityOptions.length > 0 ? (
          availableAvailabilityOptions.map((AvailabilityOption) => (
            <Button
            key={AvailabilityOption.id}
            onClick={() => handleAvailabilityOptionTypeSelect(AvailabilityOption)}
            style={{ cursor: 'pointer' }}
            // variant={thisAvailabilityOption.includes(type) ? "primary" : "outline-primary"}
            className="m-2">
            {AvailabilityOption.name}
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
