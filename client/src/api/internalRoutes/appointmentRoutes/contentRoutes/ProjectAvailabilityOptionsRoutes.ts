// import { Router, Request, Response } from 'express';
// import { AvailabilityOption } from '../../../../models/appointmentModels/contentModels/ProjectAvailabilityOptions.js';
// import { AppointmentBlock } from '../../../../models/appointmentModels/structureModels/ProjectAppointmentBlocks.js';
// // GET all AvailabilityOptions
// export const getAllAvailabilityOptions = async (_req: Request, res: Response) => {
//   try {
//     const AvailabilityOptions = await AvailabilityOption.findAll({
//       order: ['title'],
//     });
//     res.status(200).json(AvailabilityOptions);
//     // console.log(AvailabilityOptions);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET a single AvailabilityOption
// export const getAvailabilityOptionById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const AvailabilityOptionData = await AvailabilityOption.findByPk(id, {
//       include: [{ model: AppointmentBlock }],
//     });
    
//     if (!AvailabilityOptionData) {
//       res.status(404).json({ message: 'No AvailabilityOption found with that id!' });
//       return;
//     }
    
//     res.status(200).json(AvailabilityOptionData);
//     // console.log(AvailabilityOptionData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };


// const router = Router();

// // GET / - Get all AvailabilityOptions
// router.get('/', getAllAvailabilityOptions);

// // GET a single AvailabilityOptions
// router.get('/availabilityOption/:id', getAvailabilityOptionById);

// // AvailabilityOptions/:id - Delete a AvailabilityOptions by id
// // router.delete('/:id', deleteAvailabilityOption);

// export { router as AvailabilityOptionsRouter };
