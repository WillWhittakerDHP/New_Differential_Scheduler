// // import React from 'react';
// import { Router, Request, Response } from 'express';
// import { Service } from '../../../../models/appointmentModels/contentModels/services';
// import { UIDescription } from '../../../../models';

// const router = Router();

// // GET all Services
// router.get('/', async (_req: Request, res: Response) => {
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
// })

// // GET a single Service
// export const getServiceById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const ServiceData = await Service.findByPk(id, {
//       include: [{ model: UIDescription }],
//     });
    
//     if (!ServiceData) {
//       res.status(404).json({ message: 'No Service found with that id!' });
//       return;
//     }
    
//     res.status(200).json(ServiceData);
//     // console.log(ServiceData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // GET Available Services
// export const getAllAvailableServices = async (_req: Request, res: Response) => {
//   try {
//     const AvailableServices = await Service.findAll({
//       // Order by title in ascending order
//       order: ['title'],
//       where: {
//         // Only get that have this boolean set to TRUE
//         can_be_scheduled: true
//       },
//       attributes: {
//         // Don't include these fields in the returned data
//         exclude: ['can_be_scheduled']
//       }
//     });
//     res.json(AvailableServices);
//     // console.log(AvailableServices);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getAllDifferentialServices = async (_req: Request, res: Response) => {
//   try {
//     const DifferentialServices = await Service.findAll({
//       // Order by title in ascending order
//       order: ['title'],
//       where: {
//         // Only get that have this boolean set to TRUE
//         differential_scheduling: true
//       },
//       attributes: {
//         // Don't include these fields in the returned data
//         exclude: ['differential_scheduling']
//       }
//     });
//     res.json(DifferentialServices);
//     // console.log(DifferentialServices);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // GET / - Get all Services
// router.get('/', getAllServices);

// // GET / - Get all AvailableServices
// router.get('/available', getAllAvailableServices);

// // GET / - Get all DifferentialServices
// router.get('/differential', getAllDifferentialServices);

// // GET a single Services
// router.get('/:id', getServiceById);

// router.post('/', createService);

// // PUT /Services/:id - Update a Services by id
// router.put('/:id', updateService);

// // Services/:id - Delete a Services by id
// // router.delete('/:id', deleteService);

// export { router as ServicesRouter };