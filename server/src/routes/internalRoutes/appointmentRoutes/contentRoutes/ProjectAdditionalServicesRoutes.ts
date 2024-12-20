import { Router, Request, Response } from 'express';
import { AdditionalService } from '../../../../models/appointmentModels/contentModels/ProjectAdditionalServices.js';
import { AppointmentBlock } from '../../../../models/appointmentModels/structureModels/ProjectAppointmentBlocks.js';

// GET all AdditionalServices
export const getAllAdditionalServices = async (_req: Request, res: Response) => {
  try {
    const AdditionalServices = await AdditionalService.findAll({
      order: ['title'],
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
      include: [{ model: AppointmentBlock }],
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


const router = Router();

// GET / - Get all AdditionalServices
router.get('/', getAllAdditionalServices);

// GET / - Get all DifferentialAdditionalServices
router.get('/additionalService/:id', getAdditionalServiceById);


export { router as AdditionalServicesRouter };
