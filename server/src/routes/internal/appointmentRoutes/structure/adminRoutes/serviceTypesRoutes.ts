import { Router, Request, Response } from 'express';
import { Service } from '../../../../../models/index.js';

const router = Router();

// GET /Services - Get all Services
router.get('/', async (_req: Request, res: Response) => {
  try {
    const Services = await Service.findAll();
    res.json(Services);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// GET /Services/:id - Get a Service by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if(service) {
      res.json(service);
    } else {
      res.status(404).json({
        message: 'Service not found'
      });  
    }  
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// // POST /Services - Create a new Service
// router.post('/', async (req: Request, res: Response) => {
//   const { name } = req.body;
//   try {
//     const newService = await Service.create({
//       name = name;
//     });  
//     res.status(201).json(newService);
//   } catch (error: any) {
//     res.status(400).json({
//       message: error.message
//     });  
//   }  
// });  

// PUT /Services/:id - Update a Service by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const service = await Service.findByPk(id);
    if(service) {
      service.name = name;
      await service.save();
      res.json(service);
    } else {
      res.status(404).json({
        message: 'Service not found'
      });  
    }  
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });  
  }  
});  

// DELETE /Services/:id - Delete a Service by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if(service) {
      await service.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({
        message: 'Service not found'
      });  
    }  
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

export { router as ServiceTypesRouter };