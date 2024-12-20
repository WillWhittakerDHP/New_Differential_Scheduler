// import { Service, AppointmentBlock } from './index.js';

// export class Appointment {

//     public dataCollectionTimes = Service.findOne({ where: { title: 'Buyers Inspection' },
//       include: [
//         {
//           model: AppointmentBlock,
//           // as: 'dataCollectionValues',
//           attributes: ['base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
//         },
//       ],
//     });

//     public calculateTime = async () => {
//       const dataCollectionTimes = await this.dataCollectionTimes;
//       console.log(JSON.stringify(dataCollectionTimes));
//     }

//     constructor(

//     ){

//     }
//   };


//   const newAppointment = new Appointment(); 

//   newAppointment.calculateTime();


