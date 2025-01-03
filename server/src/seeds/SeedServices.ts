import { UserType , Service, AdditionalService, AvailabilityOption, DwellingAdjustment } from "../models/index.js";

import userTypeSeedData from './participantSeeds/userType-seeds.json' with { type: 'json' };
import serviceSeedData from './appointmentSeeds/contentSeeds/service-seeds.json' with { type: 'json' };
import additionalServiceSeedData from './appointmentSeeds/contentSeeds/additionalService-seeds.json' with { type: 'json' };
import availabilityOptionSeedData from './appointmentSeeds/contentSeeds/availabilityOption-seeds.json' with { type: 'json' };
import dwellingAdjustmentSeedData from './appointmentSeeds/contentSeeds/dwellingAdjustment-seeds.json' with { type: 'json' };

export const seedServices = async () => {

  try{
    console.log('\n----- Seeding Services ... -----\n');
    const services = await Service.bulkCreate(serviceSeedData, {
      returning: true,
      validate: true,
    });
    console.log('\n----- Service Seeding COMPLETE ... -----\n');
    
    console.log('\n----- Seeding UserTypes ... -----\n');
    const userTypes = await UserType.bulkCreate(userTypeSeedData, {
      validate: true,
    });
    
      for (const userType of userTypes) {
        console.log('\n----- Associating services for', userType.name);
        const randomServices = services.slice(Math.floor(Math.random() * services.length));
        await userType.addServices(randomServices);
      }
      console.log('\n----- UpserType Seeding COMPLETE ... -----\n');


    console.log('\n----- Seeding DwellingAdjustments ... -----\n');
    const dwellingAdjustments = await DwellingAdjustment.bulkCreate(dwellingAdjustmentSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });

      for (const dwellingAdjustment of dwellingAdjustments) {
        console.log('\n----- Associating services for', dwellingAdjustment.name);
        const randomServices = services.slice(Math.floor(Math.random() * services.length));
        await dwellingAdjustment.addServices(randomServices);
      }
    console.log('\n----- DwellingAdjustment Seeding COMPLETE ... -----\n');


    console.log('\n----- Seeding AdditionalServices ... -----\n');
    const additionalServices = await AdditionalService.bulkCreate(additionalServiceSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
      for (const additionalService of additionalServices) {
        console.log('\n----- Associating services for', additionalService.name);
        const randomServices = services.slice(Math.floor(Math.random() * services.length));
        await additionalService.addServices(randomServices);
      }
      console.log('\n----- AdditionalServices Seeding COMPLETE ... -----\n');

    console.log('\n----- Seeding AvailabilityOptions ... -----\n');
    const availabilityOptions = await AvailabilityOption.bulkCreate(availabilityOptionSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
      for (const availabilityOption of availabilityOptions) {
        console.log('\n----- Associating services for', availabilityOption.name);
        const randomServices = services.slice(Math.floor(Math.random() * services.length));
        await availabilityOption.addServices(randomServices);
      }
      console.log('\n----- AvailabilityOptions Seeding COMPLETE ... -----\n');
    
  } catch (error) { console.log('UserTypeService Seed error:', error)};
};