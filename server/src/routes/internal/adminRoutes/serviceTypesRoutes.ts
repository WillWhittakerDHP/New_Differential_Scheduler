import { Router, Request, Response } from 'express';
import {  
  Service, 
} from '../../../models/index.js';

const router = Router();

// GET ALL Services /internal/appointment/service/admin/serviceTypes/
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

// GET a Service by ID /internal/appointment/service/admin/serviceTypes/:id
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

// CREATE a new Service /internal/appointment/service/admin/serviceTypes/
router.post('/', async (req: Request, res: Response) => {
  try {
    const newServiceData = await Service.create(req.body);
    res.status(200).json(newServiceData);
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// UPDATE a Service by ID /internal/appointment/service/admin/serviceTypes/:id
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

// DELETE a Service /internal/appointment/service/admin/serviceTypes/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const serviceData = await Service.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!serviceData) {
      res.status(404).json({ message: 'No ServiceType found with that id!' });
      return;
    }

    res.status(200).json(serviceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as ServiceTypesRouter };