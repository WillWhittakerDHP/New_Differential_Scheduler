import { Router, Request, Response } from 'express';
import { Service, AdditionalService, AvailabilityOption, DwellingAdjustment, FormalPresentation, DataCollection, ReportWriting } from '../../../models/index.js';

const router = Router();

type DataCollectionInstance = InstanceType<typeof DataCollection>;
type ReportWritingInstance = InstanceType<typeof ReportWriting>;
type FormalPresentationInstance = InstanceType<typeof FormalPresentation>;
type AdditionalServiceInstance = InstanceType<typeof AdditionalService>;
type AvailabilityOptionInstance = InstanceType<typeof AvailabilityOption>;
type DwellingAdjustmentInstance = InstanceType<typeof DwellingAdjustment>;

type ServiceByID = InstanceType<typeof Service> & {
  dataValues: {
    AvailabilityOptions: AvailabilityOptionInstance[];
    AdditionalServices: AdditionalServiceInstance[];
    DwellingAdjustments: DwellingAdjustmentInstance[];
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    FormalPresentation: FormalPresentationInstance[];
  };
};

// GET ALL services /internal/appointment/service/admin/services/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const services = await Service.findAll({
      include: [
        {
          model: AdditionalService,
          as: 'AdditionalServices',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: AvailabilityOption,
          as: 'AvailabilityOptions',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: DwellingAdjustment,
          as: 'DwellingAdjustments',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: DataCollection,
          as: 'data_collection',
            attributes: ['on_site', 'client_present', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
        {
          model: ReportWriting,
          as: 'report_writing',
            attributes: ['on_site', 'client_present', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
        {
          model: FormalPresentation,
          as: 'formal_presentation',
            attributes: ['on_site', 'client_present', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
      ],
  });
    res.json(services);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  


// GET ServiceByID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ServiceByID = (await Service.findByPk(id, {
        include: [
        {
          model: AdditionalService,
          as: 'AdditionalServices',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: AvailabilityOption,
          as: 'AvailabilityOptions',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: DwellingAdjustment,
          as: 'DwellingAdjustments',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: DataCollection,
          as: 'data_collection',
            attributes: ['on_site', 'client_present', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
        {
          model: ReportWriting,
          as: 'report_writing',
            attributes: ['on_site', 'client_present', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
        {
          model: FormalPresentation,
          as: 'formal_presentation',
            attributes: ['on_site', 'client_present', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
        },
      ],
    })) as ServiceByID;
    // console.log('ServiceByID', ServiceByID);
    if (ServiceByID) {
      res.json(ServiceByID);
    } else {
      res.status(404).json({ message: 'ServiceByID not found' });
    }  
  } catch (error: any) {
    res.status(500).json({ 'Error fetching ServiceByID on StructureRoutes.ts:': error.message });
  }
});

// PUT /Services/:id - Update a Service by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { serviceData, 
    additionalServices, 
    dataCollectionData, reportWritingData, FormalPresentationData } = req.body;

  try {
    const service = await Service.findByPk(id, {
      include: [{ model: AdditionalService, as: 'AdditionalServices' }],
  });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Update Service fields
    await service.update(serviceData);
    
    // Update DataCollection if it exists
    if (dataCollectionData) {
      const dataCollection = await DataCollection.findByPk(service.data_collection_id);
      if (dataCollection) {
        await dataCollection.update(dataCollectionData);
      }
    }
    
    // Update reportWriting if it exists
    if (reportWritingData) {
      const reportWriting = await ReportWriting.findByPk(service.data_collection_id);
      if (reportWriting) {
        await reportWriting.update(reportWritingData);
      }
    }

    // Update FormalPresentation if it exists
    if (FormalPresentationData) {
      const formalPresentation = await FormalPresentation.findByPk(service.data_collection_id);
      if (formalPresentation) {
        await formalPresentation.update(FormalPresentationData);
      }
    }

    if (additionalServices) {
      await service.setAdditionalServices(additionalServices); // Updates associations
  }

    // Return success message
    return res.json({ message: 'Service and DataCollection updated successfully' });

  } catch (error) {
    console.error('Error in PUT /Services/:id:', error);
    return res.status(500).json({ message: 'Error updating service or DataCollection' });
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



export { router as ServiceRouter };