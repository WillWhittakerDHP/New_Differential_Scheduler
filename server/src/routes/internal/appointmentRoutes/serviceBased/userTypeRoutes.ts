import { Router, Request, Response } from 'express';
import { UserType } from '../../../../models/serviceBasedModels/userTypes.js';
// import { sequelize } from '../../../../config/connection.js';

// GET UserTypes available to users through the UI
export const getAllVisibleUserTypes = async (_req: Request, res: Response) => {
  try {
    // console.log('ding', Object.keys(sequelize.models));

    // const dbName = sequelize.getDatabaseName();
    // const [results] = await sequelize.query(
    //   "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    // );
    // const tableSchema = await sequelize.query(
    //   ` SELECT column_name, data_type, is_nullable 
    //     FROM information_schema.columns 
    //     WHERE table_name = 'your_table_name' 
    //     AND table_schema = 'public';`, // Replace 'public' with your schema
    // );
    // console.log('You are connected to', dbName, 'with the public tables', [results],'. The model for', results, 'has the following columns:', tableSchema);


    const VisibleUserTypes = await UserType.findAll({
      order: ['id'],
      where: {
        visibility: true,
      },
      attributes: ['id', 'name', 'icon', 'description'],
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
router.get('/', getAllVisibleUserTypes);

// GET associated Services
router.get('/:id', getServicesbyUserTypeId);


export { router as UserTypesRouter };