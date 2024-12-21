import { Router, Request, Response } from 'express';
import { Service } from '../../../../models/appointmentModels/contentModels/ProjectServices';
import { AppointmentBlock } from '../../../../models/appointmentModels/structureModels/ProjectAppointmentBlocks';

export const getAllServices = async (_req: Request, res: Response) => {
  try {
    const Services = await Service.findAll({
      order: ['title'],
    });
    res.status(200).json(Services);
    console.table(Services);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ServiceData = await Service.findByPk(id, {
      include: [{ model: AppointmentBlock }],
    });
    
    if (!ServiceData) {
      res.status(404).json({ message: 'No Service found with that id!' });
      return;
    }
    
    res.status(200).json(ServiceData);
    // console.log(ServiceData);
  } catch (err) {
    res.status(500).json(err);
  }
};


const router = Router();

// GET / - Get all Services
router.get('/', getAllServices);

// GET a single Services
router.get('/service/:id', getServiceById);

export { router as ServicesRouter };
