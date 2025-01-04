import { Router, Request, Response } from 'express';
import { UserType, Service, AdditionalService, AvailabilityOption, DwellingAdjustment } from '../../../../models/index.js';

// GET Visible UserTypes '/'
export const getAllVisibleUserTypes = async (_req: Request, res: Response) => {
  try {
    console.log('Start VisibleUserTypes');
    const VisibleUserTypes = await UserType.findAll({
      order: ['id'],
      where: { visibility: true },
      attributes: ['id', 'name', 'icon', 'description'],
      raw: true,
    });  
    console.log('VisibleUserTypes result:', VisibleUserTypes);
    res.json(VisibleUserTypes);
    } catch (err) {
      console.error('Error in findAll:', err);
    }  
};    


// GET ServicesForUserTypeByID '/:id'
export const getUserTypeServices = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log('Start UserTypeServices');
    const ServicesByUserTypeID = await UserType.findByPk(id,{
      include: [{ 
        model: Service,
        as: 'Services',
        attributes: ['id', 'name', 'description'],
        through: { attributes: [] }
      }],  
    });  
    if (ServicesByUserTypeID) {
      const UserTypeServices = (ServicesByUserTypeID.dataValues.Services || []).map(service => service.get({ plain: true }));
      console.log('UserTypeServices result:', UserTypeServices);
      res.json(UserTypeServices);
    } else {
      res.status(404).json({ message: 'UserType not found' });
    }  
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }  
};  

// GET ServiceDataByID '/se/:id'
export const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log('Start ServicesByServiceTypeData');
    const ServicesByServiceTypeData = await Service.findByPk(id,{
      order: ['id'],
      attributes: ['id', 'name', 'description'],
      raw: true,
    });
    if (ServicesByServiceTypeData) {
      console.log('ServicesByServiceTypeData result:', ServicesByServiceTypeData);
      res.json(ServicesByServiceTypeData);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET DwellingAdjustmentsForServiceByID '/da/:id'
export const getDwellingAdjustmentsbyServiceId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log( 'Start DwellingAdjustmentsByServiceTypeData');
    const DwellingAdjustmentsByServiceTypeData = await Service.findByPk(id,{
      include: [{ 
        model: DwellingAdjustment,
        as: 'DwellingAdjustments',
        // order: ['id'],
        // where: {
        //   visibility: true,
        // },  
        attributes: ['id', 'name', 'description'],
        through: { attributes: [], }
      }],
    });
    if (DwellingAdjustmentsByServiceTypeData) {
      console.log('DwellingAdjustmentsByServiceTypeData result:', DwellingAdjustmentsByServiceTypeData);
      res.json(DwellingAdjustmentsByServiceTypeData);
    } else {
      res.status(404).json({ message: 'DwellingAdjustments not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET AdditionalServicesForServiceByID '/as/:id'
export const getAdditionalServicesbyServiceId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log('Start AdditionalServicesByServiceTypeData');
    const AdditionalServicesByServiceTypeData = await Service.findByPk(id,{
      include: [{ 
        model: AdditionalService,
        as: 'AdditionalServices',
        attributes: ['id', 'name', 'description'],
        through: { attributes: [], }
      }],
    });
    if (AdditionalServicesByServiceTypeData) {
      console.log('AdditionalServicesByServiceTypeData result:', AdditionalServicesByServiceTypeData);
      res.json(AdditionalServicesByServiceTypeData);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET associated AvailabilityOptions '/ao/:id'
export const getAvailabilityOptionsbyServiceId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log('Start AvailabilityOptionsByServiceTypeData');
    const AvailabilityOptionsByServiceTypeData = await Service.findByPk(id,{
      include: [{ 
        model: AvailabilityOption,
        as: 'AvailabilityOptions',
        // order: ['id'],
        // where: {
        //   visibility: true,
        // },  
        attributes: ['id', 'name', 'description'],
        through: { attributes: [], }
      }],
    });
    if (AvailabilityOptionsByServiceTypeData) {
      console.log('AvailabilityOptionsByServiceTypeData result:', AvailabilityOptionsByServiceTypeData);
      res.json(AvailabilityOptionsByServiceTypeData);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


const router = Router();


// GET Visible UserTypes
router.get('/', getAllVisibleUserTypes);

// GET ServicesForUserTypeByID
router.get('/:id', getUserTypeServices);

// GET Visible UserType Services
router.get('/se/:id', getServiceById)

// GET associated AdditionalServices
router.get('/as/:id', getAdditionalServicesbyServiceId);

// GET associated AvailabilityOptions
router.get('/ao/:id', getAvailabilityOptionsbyServiceId);

// GET associated DwellingAdjustments
router.get('/da/:id', getDwellingAdjustmentsbyServiceId);


export { router as StructureRouter };