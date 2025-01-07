import { sequelize } from "../config/connection.js";

import { ClientPresentation, Service, AdditionalService, AvailabilityOption, DwellingAdjustment
} from "../models/index.js";

import clientPresentationSeedData from './appointmentSeeds/timeContentSeeds/clientPresentation-seeds.json' with { type: 'json' };
import serviceSeedData from './appointmentSeeds/structureSeeds/service-seeds.json' with { type: 'json' };
import additionalServiceSeedData from './appointmentSeeds/structureSeeds/additionalService-seeds.json' with { type: 'json' };
import availabilityOptionSeedData from './appointmentSeeds/structureSeeds/availabilityOption-seeds.json' with { type: 'json' };
import dwellingAdjustmentSeedData from './appointmentSeeds/structureSeeds/dwellingAdjustment-seeds.json' with { type: 'json' };


export const seedClientPresentations = async () => {

  try{
    console.log('\n----- Seeding ClientPresentations ... -----\n');
    const ClientPresentations = await ClientPresentation.bulkCreate(clientPresentationSeedData, {
      returning: true,
      validate: true,
    });
    
    console.log('\n----- ClientPresentation Seeding COMPLETE ... -----\n');
    
    console.log('\n----- Seeding Services ... -----\n');
    const services = await Service.bulkCreate(serviceSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
  
    for (const service of services) {
      console.log('\n----- Associating ClientPresentations for', service.name);
      const randomClientPresentations = ClientPresentations.slice(Math.floor(Math.random() * ClientPresentations.length));
      await service.addClientPresentations(randomClientPresentations);
    }
    console.log('\n----- UpserType Seeding COMPLETE ... -----\n');
    
    
    console.log('\n----- Seeding AdditionalServices ... -----\n');
    const additionalServices = await AdditionalService.bulkCreate(additionalServiceSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const additionalService of additionalServices) {
      console.log('\n----- Associating ClientPresentations for', additionalService.name);
      const randomClientPresentations = ClientPresentations.slice(Math.floor(Math.random() * ClientPresentations.length));
      await additionalService.addClientPresentations(randomClientPresentations);
    }
    console.log('\n----- AdditionalServices Seeding COMPLETE ... -----\n');
    
    console.log('\n----- Seeding AvailabilityOptions ... -----\n');
    const availabilityOptions = await AvailabilityOption.bulkCreate(availabilityOptionSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const availabilityOption of availabilityOptions) {
      console.log('\n----- Associating ClientPresentations for', availabilityOption.name);
      const randomClientPresentations = ClientPresentations.slice(Math.floor(Math.random() * ClientPresentations.length));
      await availabilityOption.addClientPresentations(randomClientPresentations);
    }
    console.log('\n----- AvailabilityOptions Seeding COMPLETE ... -----\n');


    console.log('\n----- Seeding DwellingAdjustments ... -----\n');
    const dwellingAdjustments = await DwellingAdjustment.bulkCreate(dwellingAdjustmentSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });

      for (const dwellingAdjustment of dwellingAdjustments) {
        console.log('\n----- Associating ClientPresentations for', dwellingAdjustment.name);
        const randomClientPresentations = ClientPresentations.slice(Math.floor(Math.random() * ClientPresentations.length));
        await dwellingAdjustment.addClientPresentations(randomClientPresentations);
      }
    console.log('\n----- DwellingAdjustment Seeding COMPLETE ... -----\n');
    
    } catch (error) { console.log('serviceClientPresentation Seed error:', error)};
    
    console.log('Sequelize Models:', sequelize.models);
    
  };