import { Router, Request, Response } from 'express';
import { AvailabilityOption, FormalPresentation, DataCollection, ReportWriting } from '../../../models/index.js';

const router = Router();

// GET ALL availabilityOptionss /internal/appointment/availabilityOptions/admin/availabilityOptionss/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const availabilityOptions = await AvailabilityOption.findAll({
      include: [
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
      ]
    });
    res.json(availabilityOptions);
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

type DataCollectionInstance = InstanceType<typeof DataCollection>;
type ReportWritingInstance = InstanceType<typeof ReportWriting>;
type FormalPresentationInstance = InstanceType<typeof FormalPresentation>;

type AvailabilityOptionWithTimesValues = InstanceType<typeof AvailabilityOption> & {
  dataValues: {
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    FormalPresentation: FormalPresentationInstance[];
  };
};

// Get TimeContent by AvailabilityOption ID /internal/appointment/service/admin/availabilityOptions/tc/:id
router.get('/tc/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Begin TimeContentFetch on AvailabilityOptionsRoutes.ts');
  try {
    const TimesValuesByAvailabilityOptionID = (await AvailabilityOption.findByPk(id, {
      attributes: {
        exclude: [ 'data_collection_id', 'report_writing_id', 'formal_presentation_id', 'dataCollectionId', 'reportWritingId', 'FormalPresentationId' ], },
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
            model: FormalPresentation,
            as: 'formal_presentation',
            attributes: ['base_time', 'rate_over_base_time', 'base_fee', 'rate_over_base_fee'],
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