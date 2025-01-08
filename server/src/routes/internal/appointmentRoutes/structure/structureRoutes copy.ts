import { Router, Request, Response } from 'express';
import { UserType, Service, AdditionalService, AvailabilityOption, DwellingAdjustment, ClientPresentation, DataCollection, ReportWriting } from '../../../../models/index.js';



const router = Router();


// GET Visible UserTypes
router.get('/', async (_req: Request, res: Response) => {
  try {
    const VisibleUserTypes = await UserType.findAll({
      order: ['id'],
      where: { visibility: true },
      attributes: ['id', 'name', 'icon', 'description'],
      raw: true,
    });  
    res.json(VisibleUserTypes);
  } catch (err) {
    console.error('Error in findAll:', err);
  }  
})    


// GET ServicesByUserTypeID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ServicesByUserTypeID = await UserType.findByPk(id,{
      include: [{ 
        model: Service,
        as: 'Services',
        where: {
          visibility: true,
        },  
        attributes: ['id', 'name', 'description'],
        through: { attributes: [] }
      }],  
    });  
    if (ServicesByUserTypeID) {
      const UserTypeServices = (ServicesByUserTypeID.dataValues.Services || []).map(service => service.get({ plain: true }));
      res.json(UserTypeServices);
    } else {
      res.status(404).json({ message: 'UserType not found' });
    }  
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }  
})  


type AdditionalServiceInstance = InstanceType<typeof AdditionalService>;
type AvailabilityOptionInstance = InstanceType<typeof AdditionalService>;
type DwellingAdjustmentInstance = InstanceType<typeof AdditionalService>;
type DataCollectionInstance = InstanceType<typeof DataCollection>;
type ReportWritingInstance = InstanceType<typeof ReportWriting>;
type ClientPresentationInstance = InstanceType<typeof ClientPresentation>;
type ServiceByID = InstanceType<typeof Service> & {
  dataValues: {
    AvailabilityOptions: AvailabilityOptionInstance[];
    AdditionalServices: AdditionalServiceInstance[];
    DwellingAdjustments: DwellingAdjustmentInstance[];
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    ClientPresentation: ClientPresentationInstance[];
  };
};

router.get('/as/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const featuresByServiceID = (await Service.findByPk(id, {
      attributes: { exclude: [ 'data_collection_id', 'report_writing_id', 'client_presentation_id', 'dataCollectionId', 'reportWritingId', 'clientPresentationId'], },
        include: [
        {
          model: AdditionalService,
          as: 'AdditionalServices',
          where: { visibility: true },
          attributes: ['id', 'name', 'description'],
          through: { attributes: [] },
        },
        {
          model: AvailabilityOption,
          as: 'AvailabilityOptions',
          where: { visibility: true },
          attributes: ['id', 'name', 'description'],
          through: { attributes: [] },
        },
        {
          model: DwellingAdjustment,
          as: 'DwellingAdjustments',
          where: { visibility: true },
          attributes: ['id', 'name', 'description'],
          through: { attributes: [] },
        },
        {
          model: DataCollection,
          as: 'data_collection',
          attributes: ['on_site', 'base_sq_ft', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
        {
          model: ReportWriting,
          as: 'report_writing',
          attributes: ['on_site', 'base_sq_ft', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
        {
          model: ClientPresentation,
          as: 'client_presentation',
          attributes: ['on_site', 'base_sq_ft', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
      ],
    })) as ServiceByID;
    
    if (featuresByServiceID) {
      console.log('TimeContentFetch on serviceTypesRoutes.ts', featuresByServiceID);
      res.json(featuresByServiceID);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error: any) {
    console.error('Error fetching DwellingAdjustments:', error);
    res.status(500).json({ message: error.message });
  }
});

export { router as StructureRouter };