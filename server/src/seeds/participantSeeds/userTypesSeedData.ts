import { UserType , Service } from "../../models/index.js";

import userTypeSeedData from './userType-seeds.json' with { type: 'json' };
import serviceSeedData from '../appointmentSeeds/contentSeeds/service-seeds.json' with { type: 'json' };

export const seedUserTypesandServices = async () => {
  try{
    const services = await Service.bulkCreate(serviceSeedData, {
      returning: true,
      validate: true,
    });
  
    const userTypes = await UserType.bulkCreate(userTypeSeedData, {
      validate: true,
    });
    console.log(userTypes);
  
    for (const userType of userTypes) {
      console.log('Associating', userType.type, 'with services');
      const randomServices = services.slice(Math.floor(Math.random() * services.length));
      await userType.addServices(randomServices);
    }
} catch (error) { console.log('UserTypeService Seed error:', error)};
};