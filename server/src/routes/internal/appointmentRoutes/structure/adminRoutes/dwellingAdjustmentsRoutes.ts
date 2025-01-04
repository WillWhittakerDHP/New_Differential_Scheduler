import { Router, Request, Response } from 'express';
import { DwellingAdjustment } from '../../../../../models/index.js';

const router = Router();

// GET /DwellingAdjustments - Get all DwellingAdjustments
router.get('/', async (_req: Request, res: Response) => {
  try {
    const dwellingAdjustments = await DwellingAdjustment.findAll();
    res.json(dwellingAdjustments);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// GET /DwellingAdjustments/:id - Get a DwellingAdjustment by ID
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

// // POST /DwellingAdjustments - Create a new DwellingAdjustment
// router.post('/', async (req: Request, res: Response) => {
//   const { name } = req.body;
//   try {
//     const newDwellingAdjustment = await DwellingAdjustment.create({
//       name = name;
//     });  
//     res.status(201).json(newDwellingAdjustment);
//   } catch (error: any) {
//     res.status(400).json({
//       message: error.message
//     });  
//   }  
// });  

// PUT /DwellingAdjustments/:id - Update a DwellingAdjustment by ID
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

// DELETE /DwellingAdjustments/:id - Delete a DwellingAdjustment by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const dwellingAdjustment = await DwellingAdjustment.findByPk(id);
    if(dwellingAdjustment) {
      await dwellingAdjustment.destroy();
      res.json({ message: 'DwellingAdjustment deleted' });
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

export { router as DwellingAdjustmentsTypesRouter };