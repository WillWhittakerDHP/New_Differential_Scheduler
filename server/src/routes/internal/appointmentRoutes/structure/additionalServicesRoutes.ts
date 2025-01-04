import { Router, Request, Response } from 'express';
import { AdditionalService } from '../../../../models/index.js';

// GET AdditionalServices available to AdditionalServices through the UI
export const getAllVisibleAdditionalServices = async (_req: Request, res: Response) => {
  try {

    const VisibleAdditionalServices = await AdditionalService.findAll({
      order: ['id'],
      where: {
        visibility: true,
      },
      attributes: ['id', 'name', 'visibility', 'description'],
      raw: true,
    });
    res.json(VisibleAdditionalServices);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


// GET /AdditionalServices/AdditionalService:id
export const getAdditionalServicebyId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const AdditionalServiceData = await AdditionalService.findByPk(id,{
      include: [{ 
        // association: 'AdditionalServices',
        order: ['id'],
        where: {
          visibility: true,
        },
        attributes: ['id', 'name', 'description', 'visibility', 'differential_scheduling'],
      }],
    });
    if (AdditionalServiceData) {
      res.json(AdditionalServiceData);
    } else {
      res.status(404).json({ message: 'AdditionalService not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const router = Router();


// GET Visible AdditionalServices
router.get('/visibleAdditionalServices', getAllVisibleAdditionalServices);

// GET a single AdditionalService
router.get('/:id', getAdditionalServicebyId);


export { router as AdditionalServicesRouter };