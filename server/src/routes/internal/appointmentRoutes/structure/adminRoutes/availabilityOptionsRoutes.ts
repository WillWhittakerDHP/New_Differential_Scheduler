import { Router, Request, Response } from 'express';
import { AvailabilityOption } from '../../../../../models/index.js';

const router = Router();

// GET /AvailabilityOptions - Get all AvailabilityOptions
router.get('/', async (_req: Request, res: Response) => {
  try {
    const availabilityOptions = await AvailabilityOption.findAll();
    res.json(availabilityOptions);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// GET /AvailabilityOptions/:id - Get a AvailabilityOption by ID
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

// // POST /AvailabilityOptions - Create a new AvailabilityOption
// router.post('/', async (req: Request, res: Response) => {
//   const { name } = req.body;
//   try {
//     const newAvailabilityOption = await AvailabilityOption.create({
//       name = name;
//     });  
//     res.status(201).json(newAvailabilityOption);
//   } catch (error: any) {
//     res.status(400).json({
//       message: error.message
//     });  
//   }  
// });  

// PUT /AvailabilityOptions/:id - Update a AvailabilityOption by ID
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

// DELETE /AvailabilityOptions/:id - Delete a AvailabilityOption by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const availabilityOption = await AvailabilityOption.findByPk(id);
    if(availabilityOption) {
      await availabilityOption.destroy();
      res.json({ message: 'AvailabilityOption deleted' });
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

export { router as AvailabilityOptionsTypesRouter };