import { Router, Request, Response } from 'express';
import { UserType, Service, AdditionalService, AvailabilityOption, DwellingAdjustment, ClientPresentationFee, DataCollectionFee, ReportWritingFee, ClientPresentationTime, DataCollectionTime, ReportWritingTime } from '../../models/index.js';


const router = Router();

type DataCollectionFeeInstance = InstanceType<typeof DataCollectionFee>;
type ReportWritingFeeInstance = InstanceType<typeof ReportWritingFee>;
type ClientPresentationFeeInstance = InstanceType<typeof ClientPresentationFee>;
type DataCollectionTimeInstance = InstanceType<typeof DataCollectionTime>;
type ReportWritingTimeInstance = InstanceType<typeof ReportWritingTime>;
type ClientPresentationTimeInstance = InstanceType<typeof ClientPresentationTime>;
type AdditionalServiceInstance = InstanceType<typeof AdditionalService>;
type AvailabilityOptionInstance = InstanceType<typeof AdditionalService>;
type DwellingAdjustmentInstance = InstanceType<typeof AdditionalService>;

type BaseServiceByID = InstanceType<typeof Service> & {
  dataValues: {
    AvailabilityOptions: AvailabilityOptionInstance[];
    AdditionalServices: AdditionalServiceInstance[];
    DwellingAdjustments: DwellingAdjustmentInstance[];
    DataCollectionFee: DataCollectionFeeInstance[],
    ReportWritingFee: ReportWritingFeeInstance[],
    ClientPresentationFee: ClientPresentationFeeInstance[];
    DataCollectionTime: DataCollectionTimeInstance[],
    ReportWritingTime: ReportWritingTimeInstance[],
    ClientPresentationTime: ClientPresentationTimeInstance[];
  };
};
type AdditionalServiceByID = InstanceType<typeof AdditionalService> & {
  dataValues: {
    DataCollectionFee: DataCollectionFeeInstance[],
    ReportWritingFee: ReportWritingFeeInstance[],
    ClientPresentationFee: ClientPresentationFeeInstance[];
    DataCollectionTime: DataCollectionTimeInstance[],
    ReportWritingTime: ReportWritingTimeInstance[],
    ClientPresentationTime: ClientPresentationTimeInstance[];
  };
};
type AvailabilityOptionByID = InstanceType<typeof AvailabilityOption> & {
  dataValues: {
    DataCollectionFee: DataCollectionFeeInstance[],
    ReportWritingFee: ReportWritingFeeInstance[],
    ClientPresentationFee: ClientPresentationFeeInstance[];
    DataCollectionTime: DataCollectionTimeInstance[],
    ReportWritingTime: ReportWritingTimeInstance[],
    ClientPresentationTime: ClientPresentationTimeInstance[];
  };
};
type DwellingAdjustmentByID = InstanceType<typeof DwellingAdjustment> & {
  dataValues: {
    DataCollectionFee: DataCollectionFeeInstance[],
    ReportWritingFee: ReportWritingFeeInstance[],
    ClientPresentationFee: ClientPresentationFeeInstance[];
    DataCollectionTime: DataCollectionTimeInstance[],
    ReportWritingTime: ReportWritingTimeInstance[],
    ClientPresentationTime: ClientPresentationTimeInstance[];
  };
};

// GET VisibleUserTypes
router.get('/', async (_req: Request, res: Response) => {
  try {
    const VisibleUserTypes = await UserType.findAll({
      order: ['id'],
      where: { visibility: true },
      attributes: ['id', 'name', 'icon', 'description'],
      raw: true,
    });  
    res.json(VisibleUserTypes);
  } catch (err) {
    console.error('Error fetching Users on StructureRoutes.ts:', err);
  }  
})    


// GET ServicesForUserTypeByID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ServicesForUserTypeByID = await UserType.findByPk(id,{
      include: [{ 
        model: Service,
        as: 'Services',
        where: {
          visibility: true,
        },  
        attributes: ['id', 'name', 'description'],
        through: { attributes: [] }
      }],  
    });  
    if (ServicesForUserTypeByID) {
      const UserTypeServices = (ServicesForUserTypeByID.dataValues.Services || []).map(service => service.get({ plain: true }));
      res.json(UserTypeServices);
    } else {
      res.status(404).json({ message: 'Services not found' });
    }  
  } catch (error: any) {
    res.status(500).json({ 'Error fetching Users on StructureRoutes.ts:': error.message });
  }  
})  




// GET BaseServiceByID
router.get('/bs/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('id on appointmentRoutes.ts', id)
  try {
    const BaseServiceByID = (await Service.findByPk(id, {
      attributes: { exclude: [ 'data_collection_time_id', 'report_writing_time_id', 'client_presentation_time_id', 'dataCollectionTimeId', 'reportWritingTimeId', 'clientPresentationTimeId', 'data_collection_fee_id', 'report_writing_fee_id', 'client_presentation_fee_id', 'dataCollectionFeeId', 'reportWritingFeeId', 'clientPresentationFeeId' ], },
        include: [
        {
          model: AdditionalService,
          as: 'AdditionalServices',
          where: { visibility: true },
          attributes: ['id', 'name', 'description'],
          through: { attributes: [] },
        },
        {
          model: AvailabilityOption,
          as: 'AvailabilityOptions',
          where: { visibility: true },
          attributes: ['id', 'name', 'description'],
          through: { attributes: [] },
        },
        {
          model: DwellingAdjustment,
          as: 'DwellingAdjustments',
          where: { visibility: true },
          attributes: ['id', 'name', 'description'],
          through: { attributes: [] },
        },
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
    })) as BaseServiceByID;
    console.log('baseServiceByID', BaseServiceByID);
    if (BaseServiceByID) {
      res.json(BaseServiceByID);
    } else {
      res.status(404).json({ message: 'BaseServiceByID not found' });
    }  
  } catch (error: any) {
    res.status(500).json({ 'Error fetching BaseServiceByID on StructureRoutes.ts:': error.message });
  }
});

// GET AdditionalServiceByID
router.get('/as/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const AdditionalServiceByID = (await AdditionalService.findByPk(id, {
      attributes: { 
        exclude: [ 'data_collection_time_id', 'report_writing_time_id', 'client_presentation_time_id', 'dataCollectionTimeId', 'reportWritingTimeId', 'clientPresentationTimeId', 'data_collection_fee_id', 'report_writing_fee_id', 'client_presentation_fee_id', 'dataCollectionFeeId', 'reportWritingFeeId', 'clientPresentationFeeId' ], },        include: [
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
    })) as AdditionalServiceByID;
    
    if (AdditionalServiceByID) {
      console.log('AdditionalService From serviceTypesRoutes.ts', AdditionalServiceByID);
      res.json(AdditionalServiceByID);
    } else {
      res.status(404).json({ message: 'AdditionalServiceByID not found' });
    }  
  } catch (error: any) {
    res.status(500).json({ 'Error fetching AdditionalServiceByID on StructureRoutes.ts:': error.message });
  }
});

// GET AvailabilityOptionByID
router.get('/ao/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const AvailabilityOptionByID = (await AvailabilityOption.findByPk(id, {
      attributes: { 
        exclude: [ 'data_collection_time_id', 'report_writing_time_id', 'client_presentation_time_id', 'dataCollectionTimeId', 'reportWritingTimeId', 'clientPresentationTimeId', 'data_collection_fee_id', 'report_writing_fee_id', 'client_presentation_fee_id', 'dataCollectionFeeId', 'reportWritingFeeId', 'clientPresentationFeeId' ], },
        include: [
          { attributes: ['base_sq_ft'],},
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
    })) as AvailabilityOptionByID;
    
    if (AvailabilityOptionByID) {
      console.log('AvailabilityOption from serviceTypesRoutes.ts', AvailabilityOptionByID);
      res.json(AvailabilityOptionByID);
    } else {
      res.status(404).json({ message: 'AvailabilityOptionByID not found' });
    }  
  } catch (error: any) {
    res.status(500).json({ 'Error fetching AvailabilityOptionByID on StructureRoutes.ts:': error.message });
  }
});

// GET DwellingAdjustmentByID
router.get('/da/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const DwellingAdjustmentByID = (await DwellingAdjustment.findByPk(id, {
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
    })) as DwellingAdjustmentByID;
    
    if (DwellingAdjustmentByID) {
      console.log('DwellingAdjustment From serviceTypesRoutes.ts', DwellingAdjustmentByID);
      res.json(DwellingAdjustmentByID);
    } else {
      res.status(404).json({ message: 'DwellingAdjustmentByID not found' });
    }  
  } catch (error: any) {
    res.status(500).json({ 'Error fetching DwellingAdjustmentByID on StructureRoutes.ts:': error.message });
  }
});

export { router as AppointmentRouter };