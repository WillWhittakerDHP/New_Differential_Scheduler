import { Router, Request, Response } from 'express';
import { 
  // ClientPresentation, 
  // DataCollection, 
  // ReportWriting, 
  Service, 
  // AdditionalService, 
  // AvailabilityOption, 
  // DwellingAdjustment 
} from '../../../models/index.js';

const router = Router();

// GET ALL Services /internal/appointment/service/admin/serviceTypes/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const Services = await Service.findAll();
    res.json(Services);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// GET a Service by ID /internal/appointment/service/admin/serviceTypes/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if(service) {
      res.json(service);
    } else {
      res.status(404).json({
        message: 'Service not found'
      });  
    }  
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// CREATE a new Service /internal/appointment/service/admin/serviceTypes/
router.post('/', async (req: Request, res: Response) => {
  try {
    const newServiceData = await Service.create(req.body);
    res.status(200).json(newServiceData);
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// UPDATE a Service by ID /internal/appointment/service/admin/serviceTypes/:id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const service = await Service.findByPk(id);
    if(service) {
      service.name = name;
      await service.save();
      res.json(service);
    } else {
      res.status(404).json({
        message: 'Service not found'
      });  
    }  
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });  
  }  
});  

// DELETE a Service /internal/appointment/service/admin/serviceTypes/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const serviceData = await Service.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!serviceData) {
      res.status(404).json({ message: 'No ServiceType found with that id!' });
      return;
    }

    res.status(200).json(serviceData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// type AdditionalServiceInstance = InstanceType<typeof AdditionalService>;
// type AvailabilityOptionInstance = InstanceType<typeof AdditionalService>;
// type DwellingAdjustmentInstance = InstanceType<typeof AdditionalService>;
// // type DataCollectionInstance = InstanceType<typeof DataCollection>;
// // type ReportWritingInstance = InstanceType<typeof ReportWriting>;
// // type ClientPresentationInstance = InstanceType<typeof ClientPresentation>;
// type ServiceByID = InstanceType<typeof Service> & {
//   dataValues: {
//     AvailabilityOptions: AvailabilityOptionInstance[];
//     AdditionalServices: AdditionalServiceInstance[];
//     DwellingAdjustments: DwellingAdjustmentInstance[];
//     DataCollection: DataCollectionInstance[],
//     ReportWriting: ReportWritingInstance[],
//     ClientPresentation: ClientPresentationInstance[];
//   };
// };
// router.get('/all/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   // console.log('Begin ServiceFeaturesFetch on serviceTypesRoutes.ts');
//   try {
//     const serviceByID = (await Service.findByPk(id, {
//       attributes: { exclude: [ 'data_collection_id', 'report_writing_id', 'client_presentation_id', 'dataCollectionId', 'reportWritingId', 'clientPresentationId'], },
//         include: [
//         {
//           model: AdditionalService,
//           as: 'AdditionalServices',
//           where: { visibility: true },
//           attributes: ['id', 'name', 'description'],
//           through: { attributes: [] },
//         },
//         {
//           model: AvailabilityOption,
//           as: 'AvailabilityOptions',
//           where: { visibility: true },
//           attributes: ['id', 'name', 'description'],
//           through: { attributes: [] },
//         },
//         {
//           model: DwellingAdjustment,
//           as: 'DwellingAdjustments',
//           where: { visibility: true },
//           attributes: ['id', 'name', 'description'],
//           through: { attributes: [] },
//         },
//         {
//           model: DataCollection,
//           as: 'data_collection',
//           attributes: ['on_site', 'base_sq_ft', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
//         },
//         {
//           model: ReportWriting,
//           as: 'report_writing',
//           attributes: ['on_site', 'base_sq_ft', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
//         },
//         {
//           model: ClientPresentation,
//           as: 'client_presentation',
//           attributes: ['on_site', 'base_sq_ft', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
//         },
//       ],
//     })) as ServiceByID;
    
//     if (serviceByID) {
//       // console.log('ServiceByIDFetch on serviceTypesRoutes.ts', serviceByID);
//       res.json(serviceByID);
//     } else {
//       res.status(404).json({ message: 'Service not found' });
//     }
//   } catch (error: any) {
//     console.error('Error fetching DwellingAdjustments:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

export { router as ServiceTypesRouter };