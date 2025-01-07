import { Router, Request, Response } from 'express';
import { ClientPresentation, DataCollection, ReportWriting, Service } from '../../../../../models/index.js';

const router = Router();

// GET /Services - Get all Services
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

// GET /Services/:id - Get a Service by ID
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


type DataCollectionInstance = InstanceType<typeof DataCollection>;
type ReportWritingInstance = InstanceType<typeof ReportWriting>;
type ClientPresentationInstance = InstanceType<typeof ClientPresentation>;
type ServiceWithTimesValues = InstanceType<typeof Service> & {
  dataValues: {
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    ClientPresentation: ClientPresentationInstance[];
  };
};

router.get('/tc/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Begin TimeContentFetch on serviceTypesToutes.ts');
  try {
    const TimesValuesByServiceID = (await Service.findByPk(id, {
      include: [
        {
          model: DataCollection,
          as: 'DataCollection',
          where: { visibility: true },
          attributes: ['on_site,', 'base_sq_ft', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
          through: { attributes: [] },
        },
        {
          model: ReportWriting,
          as: 'ReportWriting',
          where: { visibility: true },
          attributes: ['on_site,', 'base_sq_ft', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
          through: { attributes: [] },
        },
        {
          model: ClientPresentation,
          as: 'ClientPresentation',
          where: { visibility: true },
          attributes: ['on_site,', 'base_sq_ft', 'base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
          through: { attributes: [] },
        },
      ],
    })) as ServiceWithTimesValues;
    
    if (TimesValuesByServiceID) {
      // const rawTimesValues = TimesValuesByServiceID.dataValues.TimesValues
      // const ServiceTimesValues = rawTimesValues.map(service =>
      //   service.get({ plain: true })
      // );
      console.log('TimeContentFetch on serviceTypesRoutes.ts', TimesValuesByServiceID);
      res.json(TimesValuesByServiceID);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error: any) {
    console.error('Error fetching TimesValues:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST /Services - Create a new Service
router.post('/', async (req: Request, res: Response) => {
  try {
    const newServiceData = await Service.create(req.body);
    res.status(200).json(newServiceData);
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// PUT /Services/:id - Update a Service by ID
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

// DELETE a reader
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

export { router as ServiceTypesRouter };