import { Router, Request, Response } from 'express';
import { UserType } from '../../../models/participantModels/userTypes.js';
import { Service } from '../../../models/appointmentModels/contentModels/services.js';

export const getAllUserTypes = async (_req: Request, res: Response) => {
  console.log('getAllUserTypes');
  try {
    const UserTypes = await UserType.findAll();
    res.json(UserTypes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET UserTypes available to users through the UI
export const getAllVisibleUserTypes = async (_req: Request, res: Response) => {
  try {
    const VisibleUserTypes = await UserType.findAll({
      order: ['user_type_id'],
      where: {
        visibility: true
      },
      include: [{ model: Service }],
      attributes: ['user_type_id', 'user_type', 'icon', 'user_description', 'visibility', 'available_service_1', 'available_service_2', 'available_service_3', 'available_service_4'],
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
  const { user_type_id, user_type, icon, user_description, visibility } = req.body;
  try {
    const newUserType = await UserType.create({ user_type_id, user_type, icon, user_description, visibility});
    res.status(201).json(newUserType);
    console.log(newUserType);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /UserTypes/:id
export const updateUserType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_type_id, user_type, user_description, visibility} = req.body;
  try {
    const UpdatedUserType = await UserType.findByPk(id);
    if (UpdatedUserType) {
      UpdatedUserType.user_type_id = user_type_id;
      UpdatedUserType.user_type = user_type;
      UpdatedUserType.user_description = user_description;
      UpdatedUserType.visibility = visibility;
      await UpdatedUserType.save();
      res.json(UpdatedUserType);
      // console.log(UpdatedUserType);
    } else {
      res.status(404).json({ message: 'UserType not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

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

// PUT /UserType/:id - Update a UserType by id
router.put('/put:id', updateUserType);

// DELETE /UserType/:id - Delete a UserType by id
router.delete('/:id', deleteUserType);

// // POST /UserTypes/seed - Create multiple UserTypes
// router.post('/seed', createUserTypes);

export { router as UserTypesRouter };