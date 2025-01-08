// import { Router, Request, Response } from 'express';
// import { UserType, Service, AdditionalService, AvailabilityOption, DwellingAdjustment } from '../../models/index.js';


// const router = Router();


// // GET Visible UserTypes
// router.get('/', async (_req: Request, res: Response) => {
//   try {
//     const VisibleUserTypes = await UserType.findAll({
//       order: ['id'],
//       where: { visibility: true },
//       attributes: ['id', 'name', 'icon', 'description'],
//       raw: true,
//     });  
//     res.json(VisibleUserTypes);
//   } catch (err) {
//     console.error('Error in findAll:', err);
//   }  
// })    


// // GET ServicesByUserTypeID
// router.get('/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const ServicesByUserTypeID = await UserType.findByPk(id,{
//       include: [{ 
//         model: Service,
//         as: 'Services',
//         where: {
//           visibility: true,
//         },  
//         attributes: ['id', 'name', 'description'],
//         through: { attributes: [] }
//       }],  
//     });  
//     if (ServicesByUserTypeID) {
//       const UserTypeServices = (ServicesByUserTypeID.dataValues.Services || []).map(service => service.get({ plain: true }));
//       res.json(UserTypeServices);
//     } else {
//       res.status(404).json({ message: 'UserType not found' });
//     }  
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }  
// })  



// type AdditionalServiceInstance = InstanceType<typeof AdditionalService>;
// type ServiceWithAdditionalServices = InstanceType<typeof Service> & {
//   dataValues: {
//     AdditionalServices: AdditionalServiceInstance[];
//   };
// };

// router.get('/as/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
  
//   try {
//     const AdditionalServicesByServiceID = (await Service.findByPk(id, {
//       include: [
//         {
//           model: AdditionalService,
//           as: 'AdditionalServices',
//           where: { visibility: true },
//           attributes: ['id', 'name', 'description'],
//           through: { attributes: [] },
//         },
//       ],
//     })) as ServiceWithAdditionalServices;
    
//     if (AdditionalServicesByServiceID) {
//       const rawAdditionalServices = AdditionalServicesByServiceID.dataValues.AdditionalServices
//       const ServiceAdditionalServices = rawAdditionalServices.map(service =>
//         service.get({ plain: true })
//       );
//       res.json(ServiceAdditionalServices);
//     } else {
//       res.status(404).json({ message: 'Service not found' });
//     }
//   } catch (error: any) {
//     console.error('Error fetching AdditionalServices:', error);
//     res.status(500).json({ message: error.message });
//   }
// });



// type AvailabilityOptionInstance = InstanceType<typeof AdditionalService>;
// type ServiceWithAvailabilityOptions = InstanceType<typeof Service> & {
//   dataValues: {
//     AvailabilityOptions: AvailabilityOptionInstance[];
//   };
// };

// // GET AvailabilityOptionsByServiceID
// router.get('/ao/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
  
//   try {
//     const AvailabilityOptionsByServiceID = (await Service.findByPk(id, {
//       include: [
//         {
//           model: AvailabilityOption,
//           as: 'AvailabilityOptions',
//           where: { visibility: true },
//           attributes: ['id', 'name', 'description'],
//           through: { attributes: [] },
//         },
//       ],
//     })) as ServiceWithAvailabilityOptions;
    
//     if (AvailabilityOptionsByServiceID) {
//       const rawAvailabilityOptions = AvailabilityOptionsByServiceID.dataValues.AvailabilityOptions
//       const ServiceAvailabilityOptions = rawAvailabilityOptions.map(service =>
//         service.get({ plain: true })
//       );
//       res.json(ServiceAvailabilityOptions);
//     } else {
//       res.status(404).json({ message: 'Service not found' });
//     }
//   } catch (error: any) {
//     console.error('Error fetching AvailabilityOptions:', error);
//     res.status(500).json({ message: error.message });
//   }
// });


// type DwellingAdjustmentInstance = InstanceType<typeof AdditionalService>;
// type ServiceWithDwellingAdjustments = InstanceType<typeof Service> & {
//   dataValues: {
//     DwellingAdjustments: DwellingAdjustmentInstance[];
//   };
// };

// // GET DewllingAdjustmentsByServiceID
// router.get('/da/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
  
//   try {
//     const DwellingAdjustmentsByServiceID = (await Service.findByPk(id, {
//       include: [
//         {
//           model: DwellingAdjustment,
//           as: 'DwellingAdjustments',
//           where: { visibility: true },
//           attributes: ['id', 'name', 'description'],
//           through: { attributes: [] },
//         },
//       ],
//     })) as ServiceWithDwellingAdjustments;
    
//     if (DwellingAdjustmentsByServiceID) {
//       const rawDwellingAdjustments = DwellingAdjustmentsByServiceID.dataValues.DwellingAdjustments
//       const ServiceDwellingAdjustments = rawDwellingAdjustments.map(service =>
//         service.get({ plain: true })
//       );
//       res.json(ServiceDwellingAdjustments);
//     } else {
//       res.status(404).json({ message: 'Service not found' });
//     }
//   } catch (error: any) {
//     console.error('Error fetching DwellingAdjustments:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// export { router as StructureRouter };

