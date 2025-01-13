import { Router, Request, Response } from 'express';
import { DwellingAdjustment, ClientPresentation, DataCollection, ReportWriting } from '../../../models/index.js';

const router = Router();

// GET ALL dwellingAdjustments /internal/appointment/dwellingAdjustment/admin/dwellingAdjustments/
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

// GET an dwellingAdjustment by ID /internal/appointment/service/admin/dwellingAdjustments/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const dwellingAdjustment = await DwellingAdjustment.findByPk(id);
    if(dwellingAdjustment) {
      res.json(dwellingAdjustment);
    } else {
      res.status(404).json({
        message: 'dwellingAdjustment not found'
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

type dwellingAdjustmentWithTimesValues = InstanceType<typeof DwellingAdjustment> & {
  dataValues: {
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    ClientPresentation: ClientPresentationInstance[];
  };
};

// Get TimeContent by dwellingAdjustment ID /internal/appointment/service/admin/dwellingAdjustments/tc/:id
router.get('/tc/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Begin TimeContentFetch on dwellingAdjustmentsRoutes.ts');
  try {
    const TimesValuesBydwellingAdjustmentID = (await DwellingAdjustment.findByPk(id, {
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
    })) as dwellingAdjustmentWithTimesValues;
    
    if (TimesValuesBydwellingAdjustmentID) {
      console.log('TimeContentFetch on dwellingAdjustmentsRoutes.ts', TimesValuesBydwellingAdjustmentID);
      res.json(TimesValuesBydwellingAdjustmentID);
    } else {
      res.status(404).json({ message: 'dwellingAdjustment not found' });
    }
  } catch (error: any) {
    console.error('Error fetching TimesValues:', error);
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new dwellingAdjustment /internal/appointment/service/admin/dwellingAdjustments/
router.post('/', async (req: Request, res: Response) => {
  try {
    const newdwellingAdjustmentData = await DwellingAdjustment.create(req.body);
    res.status(200).json(newdwellingAdjustmentData);
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// UPDATE an dwellingAdjustment by ID /internal/appointment/service/admin/dwellingAdjustments/:id
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
        message: 'dwellingAdjustment not found'
      });  
    }  
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });  
  }  
});  

// DELETE an dwellingAdjustment /internal/appointment/service/admin/dwellingAdjustments/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const dwellingAdjustmentData = await DwellingAdjustment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dwellingAdjustmentData) {
      res.status(404).json({ message: 'No dwellingAdjustment found with that id!' });
      return;
    }

    res.status(200).json(dwellingAdjustmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as DwellingAdjustmentRouter };