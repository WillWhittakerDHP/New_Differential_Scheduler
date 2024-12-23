import { Router, Request, Response } from 'express';
import { UserType } from '../../../models/participantModels/userTypes.js';
import { Service } from '../../../models/appointmentModels/contentModels/service.js';

export const getAllUserTypes = async (_req: Request, res: Response) => {
  try {
    console.log('getAllUserTypes');
    const data = await UserType.findAll({
      include: [{ model: Service }],
      raw: true,
    });
    console.log(data);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET UserTypes available to users through the UI
export const getAllVisibleUserTypes = async (_req: Request, res: Response) => {
  try {
    const VisibleUserTypes = await UserType.findAll({
      order: ['id'],
      where: {
        visibility: true
      },
      include: [{ model: Service }],
      attributes: ['id', 'type', 'icon', 'description'],
      raw: true,
    });
    console.log('getAllVisibleUserTypes');
    res.json(VisibleUserTypes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /UserTypes/:id
export const getUserTypeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const UserTypeData = await UserType.findByPk(id);
    if (UserTypeData) {
      res.json(UserTypeData);
      console.log(UserTypeData);
    } else {
      res.status(404).json({ message: 'UserType not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /UserTypes
export const createUserType = async (req: Request, res: Response) => {
  const { id, type, icon, description, visibility } = req.body;
  try {
    const newUserType = await UserType.create({ id, type, icon, description, visibility});
    res.status(201).json(newUserType);
    console.log(newUserType);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// // PUT /UserTypes/:id
// export const updateUserType = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { id, type, description, visibility} = req.body;
//   try {
//     const UpdatedUserType = await UserType.findByPk(id);
//     if (UpdatedUserType) {
//       UpdatedUserType.id = id;
//       UpdatedUserType.type = type;
//       UpdatedUserType.description = description;
//       UpdatedUserType.visibility = visibility;
//       await UpdatedUserType.save();
//       res.json(UpdatedUserType);
//       // console.log(UpdatedUserType);
//     } else {
//       res.status(404).json({ message: 'UserType not found' });
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

// DELETE /UserTypes/:id
export const deleteUserType = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const UserTypeForDeletion = await UserType.findByPk(id);
    if (UserTypeForDeletion) {
      await UserType.destroy();
      res.json({ message: 'UserType deleted' });
    } else {
      res.status(404).json({ message: 'UserType not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const router = Router();

// GET /UserTypes - Get all UserTypes
router.get('/getall', getAllUserTypes);

// GET Visible UserTypes
router.get('/visibleUsers', getAllVisibleUserTypes);

// GET a single UserType
router.get('/get:id', getUserTypeById);

// POST /UserTypes - Create a new UserType
router.post('/create', createUserType);

// // PUT /UserType/:id - Update a UserType by id
// router.put('/put:id', updateUserType);

// DELETE /UserType/:id - Delete a UserType by id
router.delete('/:id', deleteUserType);

// // POST /UserTypes/seed - Create multiple UserTypes
// router.post('/seed', createUserTypes);

export { router as UserTypesRouter };