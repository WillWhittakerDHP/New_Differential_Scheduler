import { Router, Request, Response } from 'express';
import { AdditionalService } from '../../../../models/appointmentModels/contentModels/additionalServices.js';
// import { UIDescription } from '../../../../models/index.js';
// import { TimeBlockSet } from '../../../../models/appointmentModels/structureModels/timeBlockSets.js';
// import { AppointmentPart } from '../../../../models/appointmentModels/structureModels/appointmentParts.js';

// GET all AdditionalServices
export const getAllAdditionalServices = async (_req: Request, res: Response) => {
  try {
    const AdditionalServices = await AdditionalService.findAll({
      // include: [{ model: UIDescription }, { model: TimeBlockSet }, { model: AppointmentPart }],
      attributes: [ 'id', 'name', 'visibility', 'description', 'differential_scheduling'
        
      ],
    });
    res.status(200).json(AdditionalServices);
    // console.log(AdditionalServices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single AdditionalService
export const getAdditionalServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const AdditionalServiceData = await AdditionalService.findByPk(id, {
      // include: [{ model: UIDescription }],
    });
    
    if (!AdditionalServiceData) {
      res.status(404).json({ message: 'No AdditionalService found with that id!' });
      return;
    }
    
    res.status(200).json(AdditionalServiceData);
    // console.log(AdditionalServiceData);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const getAllAvailableAdditionalServices = async (_req: Request, res: Response) => {
  try {
    const AvailableAdditionalServices = await AdditionalService.findAll({
      // Order by name in ascending order
      order: ['name'],
      where: {
        // Only get that have this boolean set to TRUE
        visibility: true
      },
      attributes: {
        // Don't include these fields in the returned data
        exclude: ['visibility']
      }
    });
    res.json(AvailableAdditionalServices);
    // console.log(AvailableAdditionalServices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDifferentialAdditionalServices = async (_req: Request, res: Response) => {
  try {
    const DifferentialAdditionalServices = await AdditionalService.findAll({
      // Order by name in ascending order
      order: ['name'],
      where: {
        // Only get that have this boolean set to TRUE
        visibility: true
      },
      attributes: {
        // Don't include these fields in the returned data
        exclude: ['visibility']
      }
    });
    res.json(DifferentialAdditionalServices);
    // console.log(DifferentialAdditionalServices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /
export const createAdditionalService = async (req: Request, res: Response) => {
  const { id, name, visibility, differential_scheduling, description } = req.body;
  try {
    const newAdditionalService = await AdditionalService.create({ id, name, visibility, differential_scheduling, description });
    res.status(201).json(newAdditionalService);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// // PUT //:id
// export const updateAdditionalService = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { id, name, visibility, description } = req.body;
//   try {
//     const updatedAdditionalService = await AdditionalService.findByPk(id);
//     if (updatedAdditionalService) {
//       updatedAdditionalService.id = id;
//       updatedAdditionalService.name = name;
//       updatedAdditionalService.visibility = visibility;
//       updatedAdditionalService.description = description;
//       updatedAdditionalService.appointment_part_1 = appointment_part_1;
//       updatedAdditionalService.appointment_part_2 = appointment_part_2;
//       updatedAdditionalService.appointment_part_3 = appointment_part_3;
//       updatedAdditionalService.appointment_part_4 = appointment_part_4;
//       await updatedAdditionalService.save();
//       res.json(AdditionalService);
//       // console.log(AdditionalService);
//     } else {
//       res.status(404).json({ message: 'AdditionalServices not found' });
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // DELETE a AdditionalService
// router.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     const AdditionalServiceData = await Book.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

  //   if (!AdditionalServiceData) {
  //     res.status(404).json({ message: 'No AdditionalService found with that id!' });
  //     return;
  //   }

  //   res.status(200).json(AdditionalServiceData);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
// }
// );



// // POST //Seed

const router = Router();

// GET / - Get all AdditionalServices
router.get('/', getAllAdditionalServices);

// GET / - Get all AvailableAdditionalServices
router.get('/available', getAllAvailableAdditionalServices);

// GET / - Get all DifferentialAdditionalServices
router.get('/differential', getAllDifferentialAdditionalServices);

// // GET a single AdditionalServices
// router.get('/:id', getAdditionalServiceById);

router.post('/', createAdditionalService);

// // PUT /AdditionalServices/:id - Update a AdditionalServices by id
// router.put('/:id', updateAdditionalService);

// AdditionalServices/:id - Delete a AdditionalServices by id
// router.delete('/:id', deleteAdditionalService);

export { router as AdditionalServicesRouter };