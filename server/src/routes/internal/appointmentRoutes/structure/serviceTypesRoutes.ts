// import { Router, Request, Response } from 'express';
// import { Service } from '../../../../models/index.js';

// // GET /AdditionalServices/Service:id
// export const getAdditionalServicesbyServiceId = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const AdditionalServicesByServiceTypeData = await Service.findByPk(id,{
//       include: [{ 
//         association: 'AdditionalServices',
//         order: ['id'],
//         where: {
//           visibility: true,
//         },
//         attributes: ['id', 'name', 'description'],
//       }],
//     });
//     if (AdditionalServicesByServiceTypeData) {
//       console.log('AdditionalServicesByServiceTypeData (inside try):', AdditionalServicesByServiceTypeData);
//       res.json(AdditionalServicesByServiceTypeData);
//     } else {
//       res.status(404).json({ message: 'Service not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET /AvailabilityOptions/Service:id
// export const getAvailabilityOptionsbyServiceId = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const AvailabilityOptionsByServiceTypeData = await Service.findByPk(id,{
//       include: [{ 
//         association: 'AvailabilityOptions',
//         order: ['id'],
//         where: {
//           visibility: true,
//         },
//         attributes: ['id', 'name', 'description'],
//       }],
//     });
//     if (AvailabilityOptionsByServiceTypeData) {
//       console.log('AvailabilityOptionsByServiceTypeData (inside try):', AvailabilityOptionsByServiceTypeData);
//       res.json(AvailabilityOptionsByServiceTypeData);
//     } else {
//       res.status(404).json({ message: 'Service not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET /DwellingAdjustment/Service:id
// export const getDwellingAdjustmentsbyServiceId = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const DwellingAdjustmentsByServiceTypeData = await Service.findByPk(id,{
//       include: [{ 
//         association: 'DwellingAdjustments',
//         order: ['id'],
//         where: {
//           visibility: true,
//         },
//         attributes: ['id', 'name'],
//       }],
//     });
//     if (DwellingAdjustmentsByServiceTypeData) {
//       console.log('DwellingAdjustmentsByServiceTypeData (inside try):', DwellingAdjustmentsByServiceTypeData);
//       res.json(DwellingAdjustmentsByServiceTypeData);
//     } else {
//       res.status(404).json({ message: 'DwellingAdjustments not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const router = Router();


// // // GET Visible Services
// // router.get('/visibleServices', getAllVisibleServices);

// // GET associated AdditionalServices
// router.get('/as/:id', getAdditionalServicesbyServiceId);

// // GET associated AvailabilityOptions
// router.get('/ao/:id', getAvailabilityOptionsbyServiceId);

// // GET associated DwellingAdjustmentss
// router.get('/da/:id', getDwellingAdjustmentsbyServiceId);

// export { router as ServiceTypesRouter };