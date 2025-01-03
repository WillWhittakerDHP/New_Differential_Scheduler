import { UserType , Service, AdditionalService, AvailabilityOption, DwellingAdjustment } from "../models/index.js";

import userTypeSeedData from './participantSeeds/userType-seeds.json' with { type: 'json' };
import serviceSeedData from './appointmentSeeds/contentSeeds/service-seeds.json' with { type: 'json' };
import additionalServiceSeedData from './appointmentSeeds/contentSeeds/additionalService-seeds.json' with { type: 'json' };
import availabilityOptionSeedData from './appointmentSeeds/contentSeeds/availabilityOption-seeds.json' with { type: 'json' };
import dwellingAdjustmentSeedData from './appointmentSeeds/contentSeeds/dwellingAdjustment-seeds.json' with { type: 'json' };

export const seedUserTypesandServices = async () => {

  try{
    const userTypes = await UserType.bulkCreate(userTypeSeedData, {
      validate: true,
    });
    
    const services = await Service.bulkCreate(serviceSeedData, {
      returning: true,
      validate: true,
    });
    
    for (const userType of userTypes) {
      console.log('Associating', userType.name, 'with services');
      const randomServices = services.slice(Math.floor(Math.random() * services.length));
      await userType.addServices(randomServices);
    }

    const additionalServices = await AdditionalService.bulkCreate(additionalServiceSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
      for (const additionalService of additionalServices) {
        console.log('Associating', additionalService.name, 'with services');
        const randomServices = services.slice(Math.floor(Math.random() * services.length));
        await additionalService.addServices(randomServices);
      }

    const availabilityOptions = await AvailabilityOption.bulkCreate(availabilityOptionSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
      for (const availabilityOption of availabilityOptions) {
        console.log('Associating', availabilityOption.name, 'with services');
        const randomServices = services.slice(Math.floor(Math.random() * services.length));
        await availabilityOption.addServices(randomServices);
      }

    const dwellingAdjustments = await DwellingAdjustment.bulkCreate(dwellingAdjustmentSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });

      for (const dwellingAdjustment of dwellingAdjustments) {
        console.log('Associating', dwellingAdjustment.name, 'with services');
        const randomServices = services.slice(Math.floor(Math.random() * services.length));
        await dwellingAdjustment.addServices(randomServices);
      }
    
  } catch (error) { console.log('UserTypeService Seed error:', error)};
};