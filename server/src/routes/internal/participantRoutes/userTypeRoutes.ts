import { Router, Request, Response } from 'express';
import { UserType } from '../../../models/participantModels/userTypes.js';

// GET UserTypes available to users through the UI
export const getAllVisibleUserTypes = async (_req: Request, res: Response) => {
  try {

    const VisibleUserTypes = await UserType.findAll({
      order: ['id'],
      where: {
        visibility: true,
      },
      attributes: ['id', 'type', 'icon', 'description'],
      raw: true,
    });
    res.json(VisibleUserTypes);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


// GET /UserTypes/:id
export const getServicesbyUserTypeId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const UserTypeData = await UserType.findByPk(id,{
      include: [{ 
        association: 'Services',
        order: ['id'],
        where: {
          visibility: true,
        },
        attributes: ['id', 'name', 'description'],
      }],
    });
    if (UserTypeData) {
      res.json(UserTypeData);
    } else {
      res.status(404).json({ message: 'UserType not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const router = Router();


// GET Visible UserTypes
router.get('/visibleUsers', getAllVisibleUserTypes);

// GET associated Services
router.get('/:id', getServicesbyUserTypeId);


export { router as UserTypesRouter };