import { Router, Request, Response } from 'express';
import { AvailabilityOption } from '../../../../models/index.js';

// GET AvailabilityOptions available to AvailabilityOptions through the UI
export const getAllVisibleAvailabilityOptions = async (_req: Request, res: Response) => {
  try {

    const VisibleAvailabilityOptions = await AvailabilityOption.findAll({
      order: ['id'],
      where: {
        visibility: true,
      },
      attributes: ['id', 'name', 'visibility', 'description'],
      raw: true,
    });
    res.json(VisibleAvailabilityOptions);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


// GET /AvailabilityOptions/AvailabilityOption:id
export const getAvailabilityOptionbyId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const AvailabilityOptionData = await AvailabilityOption.findByPk(id,{
      include: [{ 
        // association: 'AvailabilityOptions',
        order: ['id'],
        where: {
          visibility: true,
        },
        attributes: ['id', 'name', 'description', 'visibility', 'differential_scheduling'],
      }],
    });
    if (AvailabilityOptionData) {
      res.json(AvailabilityOptionData);
    } else {
      res.status(404).json({ message: 'AvailabilityOption not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const router = Router();


// GET Visible AvailabilityOptions
router.get('/visibleAvailabilityOptions', getAllVisibleAvailabilityOptions);

// GET a single AvailabilityOption
router.get('/:id', getAvailabilityOptionbyId);


export { router as AvailabilityOptionsRouter };