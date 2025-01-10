import { Router, Request, Response } from 'express';
import { ClientPresentation, DataCollection, ReportWriting, Service } from '../../../models/index.js';

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

// GET an service by ID /internal/appointment/service/admin/services/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if(service) {
      res.json(service);
    } else {
      res.status(404).json({
        message: 'service not found'
      });  
    }  
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

type DataCollectionInstance = InstanceType<typeof DataCollection>;
type ReportWritingInstance = InstanceType<typeof ReportWriting>;
type ClientPresentationInstance = InstanceType<typeof ClientPresentation>;

type serviceWithTimesValues = InstanceType<typeof Service> & {
  dataValues: {
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    ClientPresentation: ClientPresentationInstance[];
  };
};

// Get TimeContent by service ID /internal/appointment/service/admin/services/tc/:id
router.get('/tc/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Begin TimeContentFetch on servicesRoutes.ts');
  try {
    const TimesValuesByserviceID = (await Service.findByPk(id, {
      attributes: {
        exclude: [ 'data_collection_id', 'report_writing_id', 'client_presentation_id', 'dataCollectionId', 'reportWritingId', 'clientPresentationId' ], },
        include: [
          {
            model: DataCollection,
            as: 'data_collection',
            attributes: ['base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
          },
          {
            model: ReportWriting,
            as: 'report_writing',
            attributes: ['base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
          },
          {
            model: ClientPresentation,
            as: 'client_presentation',
            attributes: ['base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
          },
        ],
    })) as serviceWithTimesValues;
    console.log(TimesValuesByserviceID)
    if (TimesValuesByserviceID) {
      console.log('TimeContentFetch on servicesRoutes.ts', TimesValuesByserviceID);
      res.json(TimesValuesByserviceID);
    } else {
      res.status(404).json({ message: 'service not found' });
    }
  } catch (error: any) {
    console.error('Error fetching TimesValues:', error);
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new service /internal/appointment/service/admin/services/
router.post('/', async (req: Request, res: Response) => {
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

export { router as ServiceRouter };