import { Router, Request, Response } from 'express';
import { AdditionalService } from '../../../../../models/index.js';

const router = Router();

// GET /AdditionalServices - Get all AdditionalServices
router.get('/', async (_req: Request, res: Response) => {
  try {
    const AdditionalServices = await AdditionalService.findAll();
    res.json(AdditionalServices);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// GET /AdditionalServices/:id - Get a AdditionalService by ID
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

// // POST /AdditionalServices - Create a new AdditionalService
// router.post('/', async (req: Request, res: Response) => {
//   const { name } = req.body;
//   try {
//     const newAdditionalService = await AdditionalService.create({
//       name = name;
//     });  
//     res.status(201).json(newAdditionalService);
//   } catch (error: any) {
//     res.status(400).json({
//       message: error.message
//     });  
//   }  
// });  

// PUT /AdditionalServices/:id - Update a AdditionalService by ID
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

// DELETE /AdditionalServices/:id - Delete a AdditionalService by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const additionalService = await AdditionalService.findByPk(id);
    if(additionalService) {
      await additionalService.destroy();
      res.json({ message: 'AdditionalService deleted' });
    } else {
      res.status(404).json({
        message: 'User not found'
      });  
    }  
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

export { router as AdditionalServicesTypesRouter };