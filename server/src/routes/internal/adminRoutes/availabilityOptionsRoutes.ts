import { Router, Request, Response } from 'express';
import { ClientPresentationFee, DataCollectionFee, ReportWritingFee, ClientPresentationTime, DataCollectionTime, ReportWritingTime, AvailabilityOption } from '../../../models/index.js';

const router = Router();

// GET ALL AvailabilityOptions /internal/appointment/service/admin/availabilityOptions/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const availabilityOption = await AvailabilityOption.findAll();
    res.json(availabilityOption);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// GET an AvailabilityOption by ID /internal/appointment/service/admin/availabilityOptions/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const availabilityOption = await AvailabilityOption.findByPk(id);
    if(availabilityOption) {
      res.json(availabilityOption);
    } else {
      res.status(404).json({
        message: 'AvailabilityOption not found'
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

type AvailabilityOptionWithTimesValues = InstanceType<typeof AvailabilityOption> & {
  dataValues: {
    DataCollectionFee: DataCollectionFeeInstance[],
    ReportWritingFee: ReportWritingFeeInstance[],
    ClientPresentationFee: ClientPresentationFeeInstance[];
    DataCollectionTime: DataCollectionTimeInstance[],
    ReportWritingTime: ReportWritingTimeInstance[],
    ClientPresentationTime: ClientPresentationTimeInstance[];
  };
};

// Get TimeContent by AvailabilityOption ID /internal/appointment/service/admin/availabilityOptions/tc/:id
router.get('/tc/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Begin TimeContentFetch on AvailabilityOptionsRoutes.ts');
  try {
    const TimesValuesByAvailabilityOptionID = (await AvailabilityOption.findByPk(id, {
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
    })) as AvailabilityOptionWithTimesValues;
    
    if (TimesValuesByAvailabilityOptionID) {
      console.log('TimeContentFetch on AvailabilityOptionsRoutes.ts', TimesValuesByAvailabilityOptionID);
      res.json(TimesValuesByAvailabilityOptionID);
    } else {
      res.status(404).json({ message: 'AvailabilityOption not found' });
    }
  } catch (error: any) {
    console.error('Error fetching TimesValues:', error);
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new AvailabilityOption /internal/appointment/service/admin/availabilityOptions/
router.post('/', async (req: Request, res: Response) => {
  try {
    const newAvailabilityOptionData = await AvailabilityOption.create(req.body);
    res.status(200).json(newAvailabilityOptionData);
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// UPDATE an AvailabilityOption by ID /internal/appointment/service/admin/availabilityOptions/:id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const availabilityOption = await AvailabilityOption.findByPk(id);
    if(availabilityOption) {
      availabilityOption.name = name;
      await availabilityOption.save();
      res.json(availabilityOption);
    } else {
      res.status(404).json({
        message: 'AvailabilityOption not found'
      });  
    }  
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });  
  }  
});  

// DELETE an AvailabilityOption /internal/appointment/service/admin/availabilityOptions/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const availabilityOptionData = await AvailabilityOption.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!availabilityOptionData) {
      res.status(404).json({ message: 'No AvailabilityOption found with that id!' });
      return;
    }

    res.status(200).json(availabilityOptionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as AvailabilityOptionRouter };