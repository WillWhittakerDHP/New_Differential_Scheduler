import { Router, Request, Response } from 'express';
import { Service } from '../../../../models/serviceBasedModels/services.js';

// GET Services available to Services through the UI
export const getAllVisibleServices = async (_req: Request, res: Response) => {
  try {

    const VisibleServices = await Service.findAll({
      order: ['id'],
      where: {
        visibility: true,
      },
      attributes: ['id', 'name', 'icon', 'description'],
      raw: true,
    });
    res.json(VisibleServices);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


// GET /AdditionalServices/Service:id
export const getAdditionalServicesbyServiceId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const AdditionalServiceData = await Service.findByPk(id,{
      include: [{ 
        association: 'additional_services',
        order: ['id'],
        where: {
          visibility: true,
        },
        attributes: ['id', 'name', 'description'],
      }],
    });
    if (AdditionalServiceData) {
      res.json(AdditionalServiceData);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /AvailabilityOptions/Service:id
export const getAvailabilityOptionsbyServiceId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const AvailabilityOptionData = await Service.findByPk(id,{
      include: [{ 
        association: 'availability_options',
        order: ['id'],
        where: {
          visibility: true,
        },
        attributes: ['id', 'name', 'description'],
      }],
    });
    if (AvailabilityOptionData) {
      res.json(AvailabilityOptionData);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /DwellingAdjustment/Service:id
export const getDwellingAdjustmentsbyServiceId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const DwellingAdjustmentData = await Service.findByPk(id,{
      include: [{ 
        association: 'dwelling_adjustments',
        order: ['id'],
        where: {
          visibility: true,
        },
        attributes: ['id', 'name'],
      }],
    });
    if (DwellingAdjustmentData) {
      res.json(DwellingAdjustmentData);
    } else {
      res.status(404).json({ message: 'DwellingAdjustments not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


const router = Router();


// GET Visible Services
router.get('/visibleServices', getAllVisibleServices);

// GET associated AdditionalServices
router.get('/as/:id', getAdditionalServicesbyServiceId);

// GET associated AvailabilityOptions
router.get('/ao/:id', getAvailabilityOptionsbyServiceId);

// GET associated DwellingAdjustmentss
router.get('/da/:id', getDwellingAdjustmentsbyServiceId);

export { router as ServiceTypesRouter };