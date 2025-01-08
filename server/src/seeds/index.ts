import { sequelize } from "../config/connection.js";

import { UserType, Service, AdditionalService, AvailabilityOption, DwellingAdjustment, DataCollection, ReportWriting, ClientPresentation} from "../models/index.js";

import serviceSeedData from './appointmentSeeds/structureSeeds/service-seeds.json' with { type: 'json' };
import userTypeSeedData from './appointmentSeeds/structureSeeds/userType-seeds.json' with { type: 'json' };
import additionalServiceSeedData from './appointmentSeeds/structureSeeds/additionalService-seeds.json' with { type: 'json' };
import availabilityOptionSeedData from './appointmentSeeds/structureSeeds/availabilityOption-seeds.json' with { type: 'json' };
import dwellingAdjustmentSeedData from './appointmentSeeds/structureSeeds/dwellingAdjustment-seeds.json' with { type: 'json' };

import dataCollectionSeedData from './appointmentSeeds/timeContentSeeds/dataCollection-seeds.json' with { type: 'json' };
import reportWritingSeedData from './appointmentSeeds/timeContentSeeds/reportWriting-seeds.json' with { type: 'json' };
import clientPresentationSeedData from './appointmentSeeds/timeContentSeeds/clientPresentation-seeds.json' with { type: 'json' };


export const seedServices = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n\n----- Tables and associations created -----\n');

  try{
    console.log('\n----- Seeding Services ... -----\n');
const services = await Service.bulkCreate(serviceSeedData, {
  returning: true,
  validate: true,
});
console.log('\n----- SERVICES SEEDING COMPLETE ... -----\n');


    console.log('\n----- Seeding DataCollections ... -----\n');
    const dataCollections = await DataCollection.bulkCreate(dataCollectionSeedData, {
      returning: true,
      validate: true,
    });
    
    console.log('\n----- Seeding ReportWritings ... -----\n');
    const reportWritings = await ReportWriting.bulkCreate(reportWritingSeedData, {
      returning: true,
      validate: true,
    });

    console.log('\n----- Seeding ClientPresentations ... -----\n');
    const clientPresentations = await ClientPresentation.bulkCreate(clientPresentationSeedData, {
      returning: true,
      validate: true,
    });
    
    for (const service of services) {
      console.log('\n----- Associating DataCollections for', service.name);
      const dataCollection = dataCollections[Math.floor(Math.random() * dataCollections.length)];    
      await service.update({ data_collection_id: dataCollection.id }); 
      
      console.log('\n----- Associating ReportWritings for', service.name);
      const reportWriting = reportWritings[Math.floor(Math.random() * reportWritings.length)];    
      await service.update({ report_writing_id: reportWriting.id }); 
      
      console.log('\n----- Associating ClientPresentations for', service.name);
      const clientPresentation = clientPresentations[Math.floor(Math.random() * clientPresentations.length)];    
      await service.update({ client_presentation_id: clientPresentation.id }); 
    }
    console.log('\n----- SERVICE SEEDING COMPLETE -----\n');

    console.log('\n----- Seeding UserTypes ... -----\n');
    const userTypes = await UserType.bulkCreate(userTypeSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const userType of userTypes) {
      console.log('\n----- Associating Services for', userType.name);
      const randomServices = services.slice(Math.floor(Math.random() * services.length));
      await userType.addServices(randomServices);
    }
    console.log('\n----- USERTYPE SEEDING COMPLETE -----\n');
    
    console.log('\n----- Seeding AdditionalServices ... -----\n');
    const additionalServices = await AdditionalService.bulkCreate(additionalServiceSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const additionalService of additionalServices) {
      console.log('\n----- Associating DataCollections for', additionalService.name);
      const dataCollection = dataCollections[Math.floor(Math.random() * dataCollections.length)];    
      await additionalService.update({ data_collection_id: dataCollection.id }); 
      
      console.log('\n----- Associating ReportWritings for', additionalService.name);
      const reportWriting = reportWritings[Math.floor(Math.random() * reportWritings.length)];    
      await additionalService.update({ report_writing_id: reportWriting.id }); 
      
      console.log('\n----- Associating ClientPresentations for', additionalService.name);
      const clientPresentation = clientPresentations[Math.floor(Math.random() * clientPresentations.length)];    
      await additionalService.update({ client_presentation_id: clientPresentation.id }); 
    }
    console.log('\n----- ADDITIONALSERVICES SEEDING COMPLETE -----\n');
    
    console.log('\n----- Seeding AvailabilityOptions ... -----\n');
    const availabilityOptions = await AvailabilityOption.bulkCreate(availabilityOptionSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const availabilityOption of availabilityOptions) {
      console.log('\n----- Associating DataCollections for', availabilityOption.name);
      const dataCollection = dataCollections[Math.floor(Math.random() * dataCollections.length)];    
      await availabilityOption.update({ data_collection_id: dataCollection.id }); 
      
      console.log('\n----- Associating ReportWritings for', availabilityOption.name);
      const reportWriting = reportWritings[Math.floor(Math.random() * reportWritings.length)];    
      await availabilityOption.update({ report_writing_id: reportWriting.id }); 
      
      console.log('\n----- Associating ClientPresentations for', availabilityOption.name);
      const clientPresentation = clientPresentations[Math.floor(Math.random() * clientPresentations.length)];    
      await availabilityOption.update({ client_presentation_id: clientPresentation.id }); 
    }
    console.log('\n----- AVAILABILITYOPTION SEEDING COMPLETE -----\n');
    
    console.log('\n----- Seeding DwellingAdjustments ... -----\n');
    const dwellingAdjustments = await DwellingAdjustment.bulkCreate(dwellingAdjustmentSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const dwellingAdjustment of dwellingAdjustments) {
      console.log('\n----- Associating DataCollections for', dwellingAdjustment.name);
      const dataCollection = dataCollections[Math.floor(Math.random() * dataCollections.length)];    
      await dwellingAdjustment.update({ data_collection_id: dataCollection.id }); 
      
      console.log('\n----- Associating ReportWritings for', dwellingAdjustment.name);
      const reportWriting = reportWritings[Math.floor(Math.random() * reportWritings.length)];    
      await dwellingAdjustment.update({ report_writing_id: reportWriting.id }); 
      
      console.log('\n----- Associating ClientPresentations for', dwellingAdjustment.name);
      const clientPresentation = clientPresentations[Math.floor(Math.random() * clientPresentations.length)];    
      await dwellingAdjustment.update({ client_presentation_id: clientPresentation.id }); 
    }
    console.log('\n----- DWELLINGTYPE SEEDING COMPLETE -----\n');

    console.log('\n----- SEEDING COMPLETE -----\n');

    } catch (error) { console.log('Seed error:', error)};
    
    // console.log('Sequelize Models:', sequelize.models);
    
    // console.log('Available methods for Service:', Object.keys(Service));
    // console.log('Generated methods for Service', Object.keys(Service.prototype));
  
  
  };

  seedServices();