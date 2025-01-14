import { Router, Request, Response } from 'express';
import { AdditionalService, ClientPresentation, DataCollection, ReportWriting } from '../../../models/index.js';

const router = Router();

// GET ALL additionalServices /internal/appointment/additionalService/admin/additionalServices/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const additionalService = await AdditionalService.findAll(
      {include: [
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
      ]}
    );
    res.json(additionalService);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// GET an additionalService by ID /internal/appointment/service/admin/additionalServices/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const additionalService = await AdditionalService.findByPk(id);
    if(additionalService) {
      res.json(additionalService);
    } else {
      res.status(404).json({
        message: 'additionalService not found'
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

type additionalServiceWithTimesValues = InstanceType<typeof AdditionalService> & {
  dataValues: {
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    ClientPresentation: ClientPresentationInstance[];
  };
};

// Get TimeContent by additionalService ID /internal/appointment/service/admin/additionalServices/tc/:id
router.get('/tc/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Begin TimeContentFetch on additionalServicesRoutes.ts');
  try {
    const TimesValuesByadditionalServiceID = (await AdditionalService.findByPk(id, {
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
    })) as additionalServiceWithTimesValues;
    
    if (TimesValuesByadditionalServiceID) {
      console.log('TimeContentFetch on additionalServicesRoutes.ts', TimesValuesByadditionalServiceID);
      res.json(TimesValuesByadditionalServiceID);
    } else {
      res.status(404).json({ message: 'additionalService not found' });
    }
  } catch (error: any) {
    console.error('Error fetching TimesValues:', error);
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new additionalService /internal/appointment/service/admin/additionalServices/
router.post('/', async (req: Request, res: Response) => {
  try {
    const newadditionalServiceData = await AdditionalService.create(req.body);
    res.status(200).json(newadditionalServiceData);
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// UPDATE an additionalService by ID /internal/appointment/service/admin/additionalServices/:id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const additionalService = await AdditionalService.findByPk(id);
    if(additionalService) {
      additionalService.name = name;
      await additionalService.save();
      res.json(additionalService);
    } else {
      res.status(404).json({
        message: 'additionalService not found'
      });  
    }  
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });  
  }  
});  

// DELETE an additionalService /internal/appointment/service/admin/additionalServices/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const additionalServiceData = await AdditionalService.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!additionalServiceData) {
      res.status(404).json({ message: 'No additionalService found with that id!' });
      return;
    }

    res.status(200).json(additionalServiceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as AdditionalServicesRouter };