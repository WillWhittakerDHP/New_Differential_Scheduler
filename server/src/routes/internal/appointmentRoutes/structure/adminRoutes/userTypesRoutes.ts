import { Router, Request, Response } from 'express';
import { UserType } from '../../../../../models/index.js';

const router = Router();

// GET /UserTypes - Get all UserTypes
router.get('/', async (_req: Request, res: Response) => {
  try {
    const userTypes = await UserType.findAll();
    res.json(userTypes);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// GET /UserTypes/:id - Get a UserType by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userType = await UserType.findByPk(id);
    if(userType) {
      res.json(userType);
    } else {
      res.status(404).json({
        message: 'UserType not found'
      });  
    }  
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

// // POST /UserTypes - Create a new UserType
// router.post('/', async (req: Request, res: Response) => {
//   const { name } = req.body;
//   try {
//     const newUserType = await UserType.create({
//       name = name;
//     });  
//     res.status(201).json(newUserType);
//   } catch (error: any) {
//     res.status(400).json({
//       message: error.message
//     });  
//   }  
// });  

// PUT /UserTypes/:id - Update a UserType by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const userType = await UserType.findByPk(id);
    if(userType) {
      userType.name = name;
      await userType.save();
      res.json(userType);
    } else {
      res.status(404).json({
        message: 'UserType not found'
      });  
    }  
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });  
  }  
});  

// DELETE /UserTypes/:id - Delete a UserType by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userType = await UserType.findByPk(id);
    if(userType) {
      await userType.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({
        message: 'UserType not found'
      });  
    }  
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });  
  }  
});  

export { router as UserTypesRouter };