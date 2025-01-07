import { sequelize } from "../config/connection.js";

import { DataCollection, Service, AdditionalService, AvailabilityOption, DwellingAdjustment
} from "../models/index.js";

import dataCollectionSeedData from './appointmentSeeds/timeContentSeeds/dataCollection-seeds.json' with { type: 'json' };
import serviceSeedData from './appointmentSeeds/structureSeeds/service-seeds.json' with { type: 'json' };
import additionalServiceSeedData from './appointmentSeeds/structureSeeds/additionalService-seeds.json' with { type: 'json' };
import availabilityOptionSeedData from './appointmentSeeds/structureSeeds/availabilityOption-seeds.json' with { type: 'json' };
import dwellingAdjustmentSeedData from './appointmentSeeds/structureSeeds/dwellingAdjustment-seeds.json' with { type: 'json' };


export const seedDataCollections = async () => {

  try{
    console.log('\n----- Seeding DataCollections ... -----\n');
    const DataCollections = await DataCollection.bulkCreate(dataCollectionSeedData, {
      returning: true,
      validate: true,
    });
    
    console.log('\n----- DataCollection Seeding COMPLETE ... -----\n');
    
    console.log('\n----- Seeding Services ... -----\n');
    const services = await Service.bulkCreate(serviceSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
  
    for (const service of services) {
      console.log('\n----- Associating DataCollections for', service.name);
      const randomDataCollections = DataCollections.slice(Math.floor(Math.random() * DataCollections.length));
      await service.addDataCollections(randomDataCollections);
    }
    console.log('\n----- UpserType Seeding COMPLETE ... -----\n');
    
    
    console.log('\n----- Seeding AdditionalServices ... -----\n');
    const additionalServices = await AdditionalService.bulkCreate(additionalServiceSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const additionalService of additionalServices) {
      console.log('\n----- Associating DataCollections for', additionalService.name);
      const randomDataCollections = DataCollections.slice(Math.floor(Math.random() * DataCollections.length));
      await additionalService.addDataCollections(randomDataCollections);
    }
    console.log('\n----- AdditionalServices Seeding COMPLETE ... -----\n');
    
    console.log('\n----- Seeding AvailabilityOptions ... -----\n');
    const availabilityOptions = await AvailabilityOption.bulkCreate(availabilityOptionSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const availabilityOption of availabilityOptions) {
      console.log('\n----- Associating DataCollections for', availabilityOption.name);
      const randomDataCollections = DataCollections.slice(Math.floor(Math.random() * DataCollections.length));
      await availabilityOption.addDataCollections(randomDataCollections);
    }
    console.log('\n----- AvailabilityOptions Seeding COMPLETE ... -----\n');


    console.log('\n----- Seeding DwellingAdjustments ... -----\n');
    const dwellingAdjustments = await DwellingAdjustment.bulkCreate(dwellingAdjustmentSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });

      for (const dwellingAdjustment of dwellingAdjustments) {
        console.log('\n----- Associating DataCollections for', dwellingAdjustment.name);
        const randomDataCollections = DataCollections.slice(Math.floor(Math.random() * DataCollections.length));
        await dwellingAdjustment.addDataCollections(randomDataCollections);
      }
    console.log('\n----- DwellingAdjustment Seeding COMPLETE ... -----\n');
    
    } catch (error) { console.log('serviceDataCollection Seed error:', error)};
    
    console.log('Sequelize Models:', sequelize.models);
    
  };