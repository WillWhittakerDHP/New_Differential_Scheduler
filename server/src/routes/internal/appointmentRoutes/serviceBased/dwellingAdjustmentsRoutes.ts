import { Router, Request, Response } from 'express';
import { DwellingAdjustment } from '../../../../models/serviceBasedModels/dwellingAdjustments.js';

// GET DwellingAdjustments available to DwellingAdjustments through the UI
export const getAllVisibleDwellingAdjustments = async (_req: Request, res: Response) => {
  try {

    const VisibleDwellingAdjustments = await DwellingAdjustment.findAll({
      order: ['id'],
      where: {
        visibility: true,
      },
      attributes: ['id', 'name'],
      raw: true,
    });
    res.json(VisibleDwellingAdjustments);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


// GET /DwellingAdjustments/DwellingAdjustment:id
export const getDwellingAdjustmentbyId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const DwellingAdjustmentData = await DwellingAdjustment.findByPk(id,{
      include: [{ 
        association: 'dwelling_adjustments',
        order: ['id'],
        where: {
          visibility: true,
        },
        attributes: ['id', 'name', 'description'],
      }],
    });
    if (DwellingAdjustmentData) {
      res.json(DwellingAdjustmentData);
    } else {
      res.status(404).json({ message: 'DwellingAdjustment not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const router = Router();


// GET Visible DwellingAdjustments
router.get('/visibleDwellingAdjustments', getAllVisibleDwellingAdjustments);

// GET a single DwellingAdjustment
router.get('/:id', getDwellingAdjustmentbyId);


export { router as DwellingAdjustmentsRouter };