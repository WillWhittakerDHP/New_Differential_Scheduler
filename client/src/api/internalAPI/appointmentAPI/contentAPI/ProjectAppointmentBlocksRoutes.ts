import { Router, Request, Response } from 'express';
import { AppointmentBlock } from '../../../../models/appointmentModels/structureModels/ProjectAppointmentBlocks.js';

export const getAllAppointmentBlocks = async (_req: Request, res: Response) => {
  try {
    const AppointmentBlocks = await AppointmentBlock.findAll();
    res.json(AppointmentBlocks);
    // console.log(AppointmentBlocks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /AppointmentBlocks/:id
export const getAppointmentBlockById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const AppointmentBlockData = await AppointmentBlock.findByPk(id);
    if (AppointmentBlockData) {
      res.json(AppointmentBlockData);
      console.log(AppointmentBlockData);
    } else {
      res.status(404).json({ message: 'AppointmentBlock not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const router = Router();

// GET /AppointmentBlocks - Get all AppointmentBlocks
router.get('/', getAllAppointmentBlocks);

// GET a single AppointmentBlock
router.get('/:id', getAppointmentBlockById);

export { router as AppointmentBlocksRouter };