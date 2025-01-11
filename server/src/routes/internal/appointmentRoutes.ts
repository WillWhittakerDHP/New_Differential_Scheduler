import { Router, Request, Response } from 'express';
import { UserType, Service, AdditionalService, AvailabilityOption, DwellingAdjustment, ClientPresentation, DataCollection, ReportWriting } from '../../models/index.js';


const router = Router();

type DataCollectionInstance = InstanceType<typeof DataCollection>;
type ReportWritingInstance = InstanceType<typeof ReportWriting>;
type ClientPresentationInstance = InstanceType<typeof ClientPresentation>;
type AdditionalServiceInstance = InstanceType<typeof AdditionalService>;
type AvailabilityOptionInstance = InstanceType<typeof AdditionalService>;
type DwellingAdjustmentInstance = InstanceType<typeof AdditionalService>;

type BaseServiceByID = InstanceType<typeof Service> & {
  dataValues: {
    AvailabilityOptions: AvailabilityOptionInstance[];
    AdditionalServices: AdditionalServiceInstance[];
    DwellingAdjustments: DwellingAdjustmentInstance[];
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    ClientPresentation: ClientPresentationInstance[];
  };
};
type AdditionalServiceByID = InstanceType<typeof AdditionalService> & {
  dataValues: {
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    ClientPresentation: ClientPresentationInstance[];
  };
};
type AvailabilityOptionByID = InstanceType<typeof AvailabilityOption> & {
  dataValues: {
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    ClientPresentation: ClientPresentationInstance[];
  };
};
type DwellingAdjustmentByID = InstanceType<typeof DwellingAdjustment> & {
  dataValues: {
    DataCollection: DataCollectionInstance[],
    ReportWriting: ReportWritingInstance[],
    ClientPresentation: ClientPresentationInstance[];
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
  try {
    const BaseServiceByID = (await Service.findByPk(id, {
      attributes: { exclude: [ 'data_collection_id', 'report_writing_id', 'client_presentation_id', 'dataCollectionId', 'reportWritingId', 'clientPresentationId'], },
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
      ],
    })) as BaseServiceByID;
    // console.log('baseServiceByID', BaseServiceByID);
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
        exclude: [ 'data_collection_id', 'report_writing_id', 'client_presentation_id', 'dataCollectionId', 'reportWritingId', 'clientPresentationId'], },        include: [
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
        exclude: [ 'data_collection_id', 'report_writing_id', 'client_presentation_id', 'dataCollectionId', 'reportWritingId', 'clientPresentationId'], },
        include: [
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
        exclude: [ 'data_collection_id', 'report_writing_id', 'client_presentation_id', 'dataCollectionId', 'reportWritingId', 'clientPresentationId'], },
        include: [
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