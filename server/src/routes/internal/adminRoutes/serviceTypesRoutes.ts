import { Router, Request, Response } from 'express';
import { Service, AdditionalService, AvailabilityOption, DwellingAdjustment, ClientPresentation, DataCollection, ReportWriting } from '../../../models/index.js';

const router = Router();

// GET ALL services /internal/appointment/service/admin/services/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const service = await Service.findAll();
    res.json(service);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// // GET an service by ID /internal/appointment/service/admin/services/:id
// router.get('/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const service = await Service.findByPk(id);
//     if(service) {
//       res.json(service);
//     } else {
//       res.status(404).json({
//         message: 'service not found'
//       });  
//     }  
//   } catch (error: any) {
//     res.status(500).json({
//       message: error.message
//     });  
//   }  
// });  

type DataCollectionInstance = InstanceType<typeof DataCollection>;
type ReportWritingInstance = InstanceType<typeof ReportWriting>;
type ClientPresentationInstance = InstanceType<typeof ClientPresentation>;
type AdditionalServiceInstance = InstanceType<typeof AdditionalService>;
type AvailabilityOptionInstance = InstanceType<typeof AvailabilityOption>;
type DwellingAdjustmentInstance = InstanceType<typeof DwellingAdjustment>;

type BaseServiceByID = InstanceType<typeof Service> & {
  dataValues: {
    AvailabilityOptions: AvailabilityOptionInstance[];
    AdditionalServices: AdditionalServiceInstance[];
    DwellingAdjustments: DwellingAdjustmentInstance[];
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    ClientPresentation: ClientPresentationInstance[];
  };
};

// GET BaseServiceByID
router.get('/bs/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const BaseServiceByID = (await Service.findByPk(id, {
        include: [
        {
          model: AdditionalService,
          as: 'AdditionalServices',
          where: { visibility: true },
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: AvailabilityOption,
          as: 'AvailabilityOptions',
          where: { visibility: true },
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: DwellingAdjustment,
          as: 'DwellingAdjustments',
          where: { visibility: true },
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: DataCollection,
          as: 'data_collection',
            attributes: ['on_site', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
        {
          model: ReportWriting,
          as: 'report_writing',
            attributes: ['on_site', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
        {
          model: ClientPresentation,
          as: 'client_presentation',
            attributes: ['on_site', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
      ],
    })) as BaseServiceByID;
    // console.log('baseServiceByID', BaseServiceByID);
    if (BaseServiceByID) {
      res.json(BaseServiceByID);
    } else {
      res.status(404).json({ message: 'BaseServiceByID not found' });
    }  
  } catch (error: any) {
    res.status(500).json({ 'Error fetching BaseServiceByID on StructureRoutes.ts:': error.message });
  }
});

// PUT /Services/:id - Update a Service by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, visibility, base_sq_ft } = req.body;
  try {
    const service = await Service.findByPk(id);
    if(service) {
      service.name = name;
      service.description = description;
      service.visibility = visibility;
      service.base_sq_ft = base_sq_ft;
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

// CREATE a new service /internal/appointment/service/admin/services/
router.post('/', async (req: Request, res: Response) => {
  // const { name, description, visibility, base_sq_ft } = req.body;
  try {
    const newserviceData = await Service.create(req.body);
    res.status(200).json(newserviceData);
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// UPDATE an service by ID /internal/appointment/service/admin/services/:id
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
        message: 'service not found'
      });  
    }  
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });  
  }  
});  

// DELETE an service /internal/appointment/service/admin/services/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const serviceData = await Service.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!serviceData) {
      res.status(404).json({ message: 'No service found with that id!' });
      return;
    }

    res.status(200).json(serviceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET AllServices
router.get('/users', async (_req: Request, res: Response) => {
  try {
    const VisibleServices = await Service.findAll({
      order: ['id'],
      attributes: ['id', 'name', 'icon', 'description', 'visibility'],
      raw: true,
    });  
    res.json(VisibleServices);
  } catch (err) {
    console.error('Error fetching Users on ServicesRoutes.ts:', err);
  }  
})    

// GET ALL additionalServices /internal/appointment/service/admin/additionalServices/
router.get('/as', async (_req: Request, res: Response) => {
  try {
    const additionalServices = await AdditionalService.findAll();
    res.json(additionalServices);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// GET ALL availabilityOptions /internal/appointment/service/admin/availabilityOptions/
router.get('/ao', async (_req: Request, res: Response) => {
  try {
    const availabilityOptions = await AvailabilityOption.findAll();
    res.json(availabilityOptions);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  


// // GET ServicesForServiceByID
// router.get('/services', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const ServicesForServiceByID = await Service.findByPk(id,{
//       include: [{ 
//         model: Service,
//         as: 'Services',
//         where: {
//           visibility: true,
//         },  
//         attributes: ['id', 'name', 'description'],
//         through: { attributes: [] }
//       }],  
//     });  
//     if (ServicesForServiceByID) {
//       const ServiceServices = (ServicesForServiceByID.dataValues.Services || []).map(service => service.get({ plain: true }));
//       res.json(ServiceServices);
//     } else {
//       res.status(404).json({ message: 'Services not found' });
//     }  
//   } catch (error: any) {
//     res.status(500).json({ 'Error fetching Users on StructureRoutes.ts:': error.message });
//   }  
// })  


export { router as ServiceRouter };