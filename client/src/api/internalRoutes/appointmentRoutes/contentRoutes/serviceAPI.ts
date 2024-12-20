import { ServiceData } from "../../../../interfaces/appointmentInterfaces";

// export const getAllServices = async (_req: Request, res: Response) => {
//   try {
//     const Services = await Service.findAll({
//       // include: [{ model: UIDescription }, { model: TimeBlockSet }, { model: AppointmentPart }],
//       attributes: [ 'service_id', 'title', 'can_be_scheduled', 'differential_scheduling','ui_description_set_id', 'appointment_part_1', 'appointment_part_2', 'appointment_part_3', 'appointment_part_4' ],
//       raw: true,
//     });
//     res.status(200).json(Services);
//     console.table(Services);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };



 // This function sends a GET request to the '/api/Services' endpoint to fetch
 // Services data. It handles errors by logging them to the console and returns
 // an empty array if an error occurs.
const retrieveAllServices = async () => {
  try {
    const response = await fetch('/internal/appointment/appointmentContent/services/', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

export { retrieveAllServices };