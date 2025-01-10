import { Router, Request, Response } from 'express';
import { ClientPresentationFee, DataCollectionFee, ReportWritingFee, ClientPresentationTime, DataCollectionTime, ReportWritingTime, AdditionalService } from '../../../models/index.js';

const router = Router();

// GET ALL AdditionalServices /internal/appointment/service/admin/additionalServices/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const additionalServices = await AdditionalService.findAll();
    res.json(additionalServices);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// GET an AdditionalService by ID /internal/appointment/service/admin/additionalServices/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const additionalService = await AdditionalService.findByPk(id);
    if(additionalService) {
      res.json(additionalService);
    } else {
      res.status(404).json({
        message: 'AdditionalService not found'
      });  
    }  
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  


type DataCollectionFeeInstance = InstanceType<typeof DataCollectionFee>;
type ReportWritingFeeInstance = InstanceType<typeof ReportWritingFee>;
type ClientPresentationFeeInstance = InstanceType<typeof ClientPresentationFee>;
type DataCollectionTimeInstance = InstanceType<typeof DataCollectionTime>;
type ReportWritingTimeInstance = InstanceType<typeof ReportWritingTime>;
type ClientPresentationTimeInstance = InstanceType<typeof ClientPresentationTime>;

type AdditionalServiceWithTimesValues = InstanceType<typeof AdditionalService> & {
  dataValues: {
    DataCollectionFee: DataCollectionFeeInstance[],
    ReportWritingFee: ReportWritingFeeInstance[],
    ClientPresentationFee: ClientPresentationFeeInstance[];
    DataCollectionTime: DataCollectionTimeInstance[],
    ReportWritingTime: ReportWritingTimeInstance[],
    ClientPresentationTime: ClientPresentationTimeInstance[];
  };
};

// Get TimeContent by AdditionalService ID /internal/appointment/service/admin/additionalServices/tc/:id
router.get('/tc/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Begin TimeContentFetch on AdditionalServicesRoutes.ts');
  try {
    const ValuesByAdditionalServiceID = (await AdditionalService.findByPk(id, {
      attributes: {
        exclude: [ 'data_collection_time_id', 'report_writing_time_id', 'client_presentation_time_id', 'dataCollectionTimeId', 'reportWritingTimeId', 'clientPresentationTimeId', 'data_collection_fee_id', 'report_writing_fee_id', 'client_presentation_fee_id', 'dataCollectionFeeId', 'reportWritingFeeId', 'clientPresentationFeeId' ], },
      include: [
        {
          model: DataCollectionFee,
          as: 'data_collection_fee',
          attributes: ['base_fee', 'rate_over_base_fee'],
        },
        {
          model: ReportWritingFee,
          as: 'report_writing_fee',
          attributes: ['base_fee', 'rate_over_base_fee'],
        },
        {
          model: ClientPresentationFee,
          as: 'client_presentation_fee',
          attributes: ['base_fee', 'rate_over_base_fee'],
        },
        {
          model: DataCollectionTime,
          as: 'data_collection_time',
          attributes: ['on_site', 'base_time', 'rate_over_base_time'],
        },
        {
          model: ReportWritingTime,
          as: 'report_writing_time',
          attributes: ['on_site', 'base_time', 'rate_over_base_time'],
        },
        {
          model: ClientPresentationTime,
          as: 'client_presentation_time',
          attributes: ['on_site', 'base_time', 'rate_over_base_time'],
        },
      ],
    })) as AdditionalServiceWithTimesValues;
    
    if (ValuesByAdditionalServiceID) {
      console.log('TimeContentFetch on AdditionalServicesRoutes.ts', ValuesByAdditionalServiceID);
      res.json(ValuesByAdditionalServiceID);
    } else {
      res.status(404).json({ message: 'AdditionalService not found' });
    }
  } catch (error: any) {
    console.error('Error fetching TimesValues:', error);
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new AdditionalService /internal/appointment/service/admin/additionalServices/
router.post('/', async (req: Request, res: Response) => {
  try {
    const newAdditionalServiceData = await AdditionalService.create(req.body);
    res.status(200).json(newAdditionalServiceData);
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// UPDATE an AdditionalService by ID /internal/appointment/service/admin/additionalServices/:id
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
        message: 'AdditionalService not found'
      });  
    }  
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });  
  }  
});  

// DELETE an AdditionalService /internal/appointment/service/admin/additionalServices/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const additionalServiceData = await AdditionalService.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!additionalServiceData) {
      res.status(404).json({ message: 'No AdditionalService found with that id!' });
      return;
    }

    res.status(200).json(additionalServiceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as AdditionalServicesRouter };