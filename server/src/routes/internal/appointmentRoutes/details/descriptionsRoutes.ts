// import { Router, Request, Response } from 'express';
// import { Descriptions } from '../../../../models/index.js';

// const router = Router();

// // GET /Descriptions - Get all Descriptions
// router.get('/', async (_req: Request, res: Response) => {
//   try {
//     const descriptions = await Descriptions.findAll();
//     res.json(descriptions);
//   } catch (error: any) {
//     res.status(500).json({
//       message: error.message
//     });  
//   }  
// });  

// // GET /Descriptions/:id - Get a description by ID
// router.get('/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const description = await Descriptions.findByPk(id);
//     if(description) {
//       res.json(description);
//     } else {
//       res.status(404).json({
//         message: 'description not found'
//       });  
//     }  
//   } catch (error: any) {
//     res.status(500).json({
//       message: error.message
//     });  
//   }  
// });  

// // POST /Descriptions - Create a new description
// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const newdescriptionData = await Descriptions.create(req.body);
//     res.status(200).json(newdescriptionData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }); 

// // // PUT /Descriptions/:id - Update a description by ID
// // router.put('/:id', async (req: Request, res: Response) => {
// //   const { id } = req.params;
// //   const { buyer, agent, owner } = req.body;
// //   try {
// //     const description = await Descriptions.findByPk(id);
// //     if(description) {
// //       Descriptions.buyer = buyer;
// //       Descriptions.agent
// //       await Descriptions.save();
// //       res.json(description);
// //     } else {
// //       res.status(404).json({
// //         message: 'description not found'
// //       });  
// //     }  
// //   } catch (error: any) {
// //     res.status(400).json({
// //       message: error.message
// //     });  
// //   }  
// // });  

// // DELETE a reader
// router.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     const descriptionData = await Descriptions.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!descriptionData) {
//       res.status(404).json({ message: 'No description found with that id!' });
//       return;
//     }

//     res.status(200).json(descriptionData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// export { router as DescriptionsRouter };