import React, { useContext, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
import { retrieveDwellingAdjustmentByID } from '../../api/internalAPI/appointmentAPI';

import type { DwellingAdjustmentData } from '../../interfaces/apiInterfaces';
import { AppointmentBlock, PartTimes, AppointmentPart, Appointment } from '../../interfaces/appointmentInterfaces';


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

  const { availableDwellingAdjustments, thisDwellingAdjustment, thisAppointment, setThisDwellingAdjustment, setThisAppointment} = context;

  const handlePropertyTypeSelect = (selectedDwellingAdjustment: DwellingAdjustmentData) => {
    setThisDwellingAdjustment(selectedDwellingAdjustment);
  };


  // Fetch Associated AdditionalServices, AdditionalServices, and DwellingAdjustments
  const fetchDwellingAdjustmentByID = async () => {
    if (thisDwellingAdjustment !== undefined) {
      try {
        if (thisDwellingAdjustment) {
          const data = await retrieveDwellingAdjustmentByID(thisDwellingAdjustment.id);
          // Construct newDwellingAdjustment as an AppointmentPart
          const newDwellingAdjustment = new AppointmentPart(
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

            // Calculate times for the newDwellingAdjustment based on home_sq_ft
            const calculatedTimes: PartTimes = newDwellingAdjustment.calculatePartTimes(
              thisAppointment!.home_sq_ft || 0,
              newDwellingAdjustment
            );

          // Update the times field in newDwellingAdjustment
          newDwellingAdjustment.times = calculatedTimes;

          // Log to verify the calculated times
          console.log("Calculated PartTimes:", calculatedTimes);
          console.log("Updated AppointmentPart:", newDwellingAdjustment);


          
          // Update thisAppointment with the new AppointmentPart
          setThisAppointment((prev) => {
            if ( prev !== undefined ){
            const updatedDwellingAdjustmentFee = prev.calculatePartFee(newDwellingAdjustment);
            console.log(updatedDwellingAdjustmentFee);
            const updatedAppointment = prev
              ? new Appointment(
                  prev.home_sq_ft,
                  prev.base_service,
                  newDwellingAdjustment,
                  prev.additional_services,
                  prev.availability_options,
                  prev.data_collection_time,
                  prev.report_writing_time,
                  prev.client_presentation_time,
                  prev.base_service_fee,
                  updatedDwellingAdjustmentFee,
                  prev.add_service_fees,
                  prev.avail_option_fees
                )
              : new Appointment(
                  0, // Provide default values if prev is undefined
                  undefined,
                  newDwellingAdjustment,
                  undefined,
                  undefined,
                  0,
                  0,
                  0,
                  0,
                  0,
                  [], 
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
    fetchDwellingAdjustmentByID();
    console.log(thisAppointment);
  }, [
    thisDwellingAdjustment,
  ]);

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
