// import React, { useContext, useEffect, useState } from 'react';
// import { Appointment } from '../interfaces/appointmentInterfaces.js'; 
// import { AppointmentContext } from './AppointmentContext.js';

// const AppointmentCalculator: React.FC = () => {

//     const context = useContext(AppointmentContext);
//     if (!context) {
//       throw new Error('AdditionalServicesList must be used within an AppointmentProvider');
//     }
  
//     const { appointment, setAppointment, thisService, thisDwellingAdjustment, thisAdditionalService, thisAvailabilityOption } = context;

//   const [homeSqFt, setHomeSqFt] = useState<number>(2000); // Example value
//   const [fees, setFees] = useState<any>(null);
//   const [times, setTimes] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Create Appointment instance
//         const appointment = new Appointment(
//           home_sq_ft,
//           data_collection,
//           data_collection_time,
//           report_writing,
//           report_writing_time,
//           client_presentation,
//           client_presentation_time,
//           base_service,
//           base_service_fee,
//           dwelling_type,
//           dwelling_type_fee,
//           add_services,
//           add_service_fees,
//           avail_options,
//           avail_option_fees,
//         );
//         const service: TimeContent[] = []; // Populate with fetched data if needed
//         const additionalService: TimeContent[] = []; // Populate with fetched data if needed
//         const availabilityOption: TimeContent[] = []; // Populate with fetched data if needed
//         const dwellingAdjustment: TimeContent[] = []; // Populate with fetched data if needed


//         // Perform calculations
//         const calculatedFees = appointment.calculateAllPartFees();
//         const calculatedTimes = appointment.calculateAllPartTimes();

//         // Update state
//         setAppointment(appointment);
//         setFees(calculatedFees);
//         setTimes(calculatedTimes);
//       } catch (error) {
//         console.error('Error fetching data or constructing appointment:', error);
//       }
//     };

//     fetchData();
//   }, [thisService, thisDwellingAdjustment, thisAdditionalService, thisAvailabilityOption]);

//   if (!appointment) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Appointment Calculator</h1>
//       <h2>Fees</h2>
//       <pre>{JSON.stringify(fees, null, 2)}</pre>
//       <h2>Times</h2>
//       <pre>{JSON.stringify(times, null, 2)}</pre>
//     </div>
//   );
// };

// export default AppointmentCalculator;
