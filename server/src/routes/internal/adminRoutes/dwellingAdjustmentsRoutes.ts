import { Router, Request, Response } from 'express';
import { ClientPresentationFee, DataCollectionFee, ReportWritingFee, ClientPresentationTime, DataCollectionTime, ReportWritingTime, DwellingAdjustment } from '../../../models/index.js';

const router = Router();

// GET ALL DwellingAdjustments /internal/appointment/service/admin/dwellingAdjustments/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const dwellingAdjustment = await DwellingAdjustment.findAll();
    res.json(dwellingAdjustment);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// GET an DwellingAdjustment by ID /internal/appointment/service/admin/dwellingAdjustments/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const dwellingAdjustment = await DwellingAdjustment.findByPk(id);
    if(dwellingAdjustment) {
      res.json(dwellingAdjustment);
    } else {
      res.status(404).json({
        message: 'DwellingAdjustment not found'
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

type DwellingAdjustmentWithTimesValues = InstanceType<typeof DwellingAdjustment> & {
  dataValues: {
    DataCollectionFee: DataCollectionFeeInstance[],
    ReportWritingFee: ReportWritingFeeInstance[],
    ClientPresentationFee: ClientPresentationFeeInstance[];
    DataCollectionTime: DataCollectionTimeInstance[],
    ReportWritingTime: ReportWritingTimeInstance[],
    ClientPresentationTime: ClientPresentationTimeInstance[];
  };
};

// Get TimeContent by DwellingAdjustment ID /internal/appointment/service/admin/dwellingAdjustments/tc/:id
router.get('/tc/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Begin TimeContentFetch on DwellingAdjustmentsRoutes.ts');
  try {
    const TimesValuesByDwellingAdjustmentID = (await DwellingAdjustment.findByPk(id, {
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
  })) as DwellingAdjustmentWithTimesValues;
    
    if (TimesValuesByDwellingAdjustmentID) {
      console.log('TimeContentFetch on DwellingAdjustmentsRoutes.ts', TimesValuesByDwellingAdjustmentID);
      res.json(TimesValuesByDwellingAdjustmentID);
    } else {
      res.status(404).json({ message: 'DwellingAdjustment not found' });
    }
  } catch (error: any) {
    console.error('Error fetching TimesValues:', error);
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new DwellingAdjustment /internal/appointment/service/admin/dwellingAdjustments/
router.post('/', async (req: Request, res: Response) => {
  try {
    const newDwellingAdjustmentData = await DwellingAdjustment.create(req.body);
    res.status(200).json(newDwellingAdjustmentData);
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// UPDATE an DwellingAdjustment by ID /internal/appointment/service/admin/dwellingAdjustments/:id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const dwellingAdjustment = await DwellingAdjustment.findByPk(id);
    if(dwellingAdjustment) {
      dwellingAdjustment.name = name;
      await dwellingAdjustment.save();
      res.json(dwellingAdjustment);
    } else {
      res.status(404).json({
        message: 'DwellingAdjustment not found'
      });  
    }  
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });  
  }  
});  

// DELETE an DwellingAdjustment /internal/appointment/service/admin/dwellingAdjustments/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const dwellingAdjustmentData = await DwellingAdjustment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dwellingAdjustmentData) {
      res.status(404).json({ message: 'No DwellingAdjustment found with that id!' });
      return;
    }

    res.status(200).json(dwellingAdjustmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as DwellingAdjustmentRouter };