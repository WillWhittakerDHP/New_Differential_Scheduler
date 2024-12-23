// import React from 'react';
import { Router, Request, Response } from 'express';
import { Service } from '../../../../models/appointmentModels/contentModels/service.js';
// import { UIDescription } from '../../../../models/appointmentModels/structureModels/uIDescriptions.js';
// import { TimeBlockSet } from '../../models/index.js';
// import { AppointmentPart } from '../../models/index.js';

export const getAllServices = async (_req: Request, res: Response) => {
  try {
    const Services = await Service.findAll({
      // include: [{ model: UIDescription }, { model: TimeBlockSet }, { model: AppointmentPart }],
      attributes: [ 'id', 'name', 'can_be_scheduled', 'differential_scheduling'
        // ,'ui_description_set_id', 'appointment_part_1', 'appointment_part_2', 'appointment_part_3', 'appointment_part_4' 
      ],
      raw: true,
    });
    res.status(200).json(Services);
    console.table(Services);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// export const getServiceByUserType = async (req: Request, res: Response) => {
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


export const getAllAvailableServices = async (_req: Request, res: Response) => {
  try {
    const AvailableServices = await Service.findAll({
      // Order by name in ascending order
      order: ['name'],
      where: {
        // Only get that have this boolean set to TRUE
        can_be_scheduled: true
      },
      attributes: {
        // Don't include these fields in the returned data
        exclude: ['can_be_scheduled']
      }
    });
    res.json(AvailableServices);
    // console.log(AvailableServices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDifferentialServices = async (_req: Request, res: Response) => {
  try {
    const DifferentialServices = await Service.findAll({
      // Order by name in ascending order
      order: ['name'],
      where: {
        // Only get that have this boolean set to TRUE
        differential_scheduling: true
      },
      attributes: {
        // Don't include these fields in the returned data
        exclude: ['differential_scheduling']
      }
    });
    res.json(DifferentialServices);
    // console.log(DifferentialServices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /
export const createService = async (req: Request, res: Response) => {
  const { id, name, can_be_scheduled, differential_scheduling
    // , ui_description_set_id, appointment_part_1, appointment_part_2, appointment_part_3, appointment_part_4 
  } = req.body;
  try {
    const newService = await Service.create({ id, name, can_be_scheduled, differential_scheduling
      // , ui_description_set_id, appointment_part_1, appointment_part_2, appointment_part_3, appointment_part_4 
    });
    res.status(201).json(newService);
    // console.log(newService);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// // PUT //:id
// export const updateService = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { id, name, can_be_scheduled, differential_scheduling, ui_description_set_id
//     // , appointment_part_1, appointment_part_2, appointment_part_3, appointment_part_4 
//   } = req.body;
//   try {
//     const updatedService = await Service.findByPk(id);
//     if (updatedService) {
//       updatedService.id = id;
//       updatedService.name = name;
//       updatedService.can_be_scheduled = can_be_scheduled;
//       updatedService.differential_scheduling = differential_scheduling;
//       updatedService.ui_description_set_id = ui_description_set_id;
//       // updatedService.appointment_part_1 = appointment_part_1;
//       // updatedService.appointment_part_2 = appointment_part_2;
//       // updatedService.appointment_part_3 = appointment_part_3;
//       // updatedService.appointment_part_4 = appointment_part_4;
//       await updatedService.save();
//       res.json(Service);
//       // console.log(Service);
//     } else {
//       res.status(404).json({ message: 'Services not found' });
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // DELETE a Service
// router.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     const ServiceData = await Book.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

  //   if (!ServiceData) {
  //     res.status(404).json({ message: 'No Service found with that id!' });
  //     return;
  //   }

  //   res.status(200).json(ServiceData);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
// }
// );


// // POST //Seed

const router = Router();

// GET / - Get all Services
router.get('/', getAllServices);

// GET / - Get all AvailableServices
router.get('/available', getAllAvailableServices);

// GET / - Get all DifferentialServices
router.get('/differential', getAllDifferentialServices);

// // GET a single Services
// router.get('/:id', getServiceByUserType);

router.post('/', createService);

// // PUT /Services/:id - Update a Services by id
// router.put('/:id', updateService);

// Services/:id - Delete a Services by id
// router.delete('/:id', deleteService);

export { router as ServicesRouter };