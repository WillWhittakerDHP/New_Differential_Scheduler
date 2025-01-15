import { sequelize } from "../config/connection.js";

import { UserType, Service, AdditionalService, AvailabilityOption, DwellingAdjustment, FeeTime, DataCollection, ReportWriting, FormalPresentation } from "../models/index.js";

import serviceSeedData from './appointmentSeeds/structureSeeds/service-seeds.json' with { type: 'json' };
import userTypeSeedData from './appointmentSeeds/structureSeeds/userType-seeds.json' with { type: 'json' };
import additionalServiceSeedData from './appointmentSeeds/structureSeeds/additionalService-seeds.json' with { type: 'json' };
import availabilityOptionSeedData from './appointmentSeeds/structureSeeds/availabilityOption-seeds.json' with { type: 'json' };
import dwellingAdjustmentSeedData from './appointmentSeeds/structureSeeds/dwellingAdjustment-seeds.json' with { type: 'json' };


import feeTimeSeedData from './appointmentSeeds/feeTimeSeeds/feeTime-seeds.json' with { type: 'json' };
import dataCollectionSeedData from './appointmentSeeds/feeTimeSeeds/dataCollection-seeds.json' with { type: 'json' };
import reportWritingSeedData from './appointmentSeeds/feeTimeSeeds/reportWriting-seeds.json' with { type: 'json' };
import formalPresentationSeedData from './appointmentSeeds/feeTimeSeeds/formalPresentation-seeds.json' with { type: 'json' };



export const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n\n----- Tables and associations created -----\n');

  try{
    console.log('\n----- Seeding FeeTimes ... -----\n');
    const feeTimes = await FeeTime.bulkCreate(feeTimeSeedData, {
      returning: true,
      validate: true,
    });
    console.log('\n----- FEETIMES SEEDING COMPLETE -----\n');
    
      console.log('\n----- Seeding DataCollections ... -----\n');
      
      const dataCollections = await DataCollection.bulkCreate(dataCollectionSeedData, {
        returning: true,
        validate: true,
      });
      
      for (const dataCollection of dataCollections) {
        console.log('\n----- Associating FeeTimes for', dataCollection.id);
        const randomFeeTimes = feeTimes.slice(Math.floor(Math.random() * feeTimes.length));
        await dataCollection.addFeeTimes(randomFeeTimes);
      }
      
      console.log('\n----- DATACOLLECTION SEEDING COMPLETE -----\n');
      
      console.log('\n----- Seeding ReportWritings ... -----\n');
      
      const reportWritings = await ReportWriting.bulkCreate(reportWritingSeedData, {
        returning: true,
        validate: true,
      });
      
      for (const reportWriting of reportWritings) {
        console.log('\n----- Associating FeeTimes for', reportWriting.id);
        const randomFeeTimes = feeTimes.slice(Math.floor(Math.random() * feeTimes.length));
        await reportWriting.addFeeTimes(randomFeeTimes);
        }
      
        console.log('\n----- REPORTWRITING SEEDING COMPLETE -----\n');
      
        console.log('\n----- Seeding formalPresentations ... -----\n');
        
        const formalPresentations = await FormalPresentation.bulkCreate(formalPresentationSeedData, {
        returning: true,
        validate: true,
      });
      
      for (const formalPresentation of formalPresentations) {
        console.log('\n----- Associating FeeTimes for', formalPresentation.id);
        const randomFeeTimes = feeTimes.slice(Math.floor(Math.random() * feeTimes.length));
        await formalPresentation.addFeeTimes(randomFeeTimes);
        }
      
      console.log('\n----- formalPresentation SEEDING COMPLETE -----\n'); 
  
    console.log('\n----- FEETIME SEEDING COMPLETE -----\n');

      console.log('\n----- Seeding AppointmentParts ... -----\n')

        console.log('\n----- Seeding Services ... -----\n');
        const services = await Service.bulkCreate(serviceSeedData, {
          returning: true,
          validate: true,
        });
        console.log('\n----- SERVICE SEEDING COMPLETE -----\n');
        
        console.log('\n----- Seeding AdditionalServices ... -----\n');
        const additionalServices = await AdditionalService.bulkCreate(additionalServiceSeedData, {
          individualHooks: true,
          returning: true,
          validate: true,
        });
        
        for (const additionalService of additionalServices) {
          console.log('\n----- Associating Services for', additionalService.id);
          const randomServices = services.slice(Math.floor(Math.random() * services.length));
          await additionalService.addServices(randomServices);
        }
        
        console.log('\n----- ADDITIONALSERVICES SEEDING COMPLETE -----\n');
        
        console.log('\n----- Seeding AvailabilityOptions ... -----\n');
        const availabilityOptions = await AvailabilityOption.bulkCreate(availabilityOptionSeedData, {
          individualHooks: true,
          returning: true,
          validate: true,
        });
        
        for (const availabilityOption of availabilityOptions) {
          console.log('\n----- Associating Services for', availabilityOption.id);
          const randomServices = services.slice(Math.floor(Math.random() * services.length));
          await availabilityOption.addServices(randomServices);
        }
        
        console.log('\n----- AVAILABILITYOPTION SEEDING COMPLETE -----\n');
        
        console.log('\n----- Seeding DwellingAdjustments ... -----\n');
        const dwellingAdjustments = await DwellingAdjustment.bulkCreate(dwellingAdjustmentSeedData, {
          individualHooks: true,
          returning: true,
          validate: true,
        });
        
        for (const dwellingAdjustment of dwellingAdjustments) {
          console.log('\n----- Associating Services for', dwellingAdjustment.id);
          const randomServices = services.slice(Math.floor(Math.random() * services.length));
          await dwellingAdjustment.addServices(randomServices);
        }
        
        console.log('\n----- DWELLINGADJUSTMENT SEEDING COMPLETE -----\n');
        
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
        
        for (const service of services) {
          console.log('\n----- Associating DataCollections for', service.name);
          const dataCollection = dataCollections[Math.floor(Math.random() * dataCollections.length)];    
          await service.update({ data_collection_id: dataCollection.id }); 
          
          console.log('\n----- Associating ReportWritings for', service.name);
          const reportWriting = reportWritings[Math.floor(Math.random() * reportWritings.length)];    
          await service.update({ report_writing_id: reportWriting.id }); 
          
          console.log('\n----- Associating formalPresentations for', service.name);
          const formalPresentation = formalPresentations[Math.floor(Math.random() * formalPresentations.length)];    
          await service.update({ formal_presentation_id: formalPresentation.id }); 
        }
        
        for (const additionalService of additionalServices) {
          console.log('\n----- Associating DataCollections for', additionalService.name);
          const dataCollection = dataCollections[Math.floor(Math.random() * dataCollections.length)];    
          await additionalService.update({ data_collection_id: dataCollection.id }); 
          
          console.log('\n----- Associating ReportWritings for', additionalService.name);
          const reportWriting = reportWritings[Math.floor(Math.random() * reportWritings.length)];    
          await additionalService.update({ report_writing_id: reportWriting.id }); 
          
          console.log('\n----- Associating formalPresentations for', additionalService.name);
          const formalPresentation = formalPresentations[Math.floor(Math.random() * formalPresentations.length)];    
          await additionalService.update({ formal_presentation_id: formalPresentation.id }); 
        }
        for (const availabilityOption of availabilityOptions) {
          console.log('\n----- Associating DataCollections for', availabilityOption.name);
          const dataCollection = dataCollections[Math.floor(Math.random() * dataCollections.length)];    
          await availabilityOption.update({ data_collection_id: dataCollection.id }); 
          
          console.log('\n----- Associating ReportWritings for', availabilityOption.name);
          const reportWriting = reportWritings[Math.floor(Math.random() * reportWritings.length)];    
          await availabilityOption.update({ report_writing_id: reportWriting.id }); 
          
          console.log('\n----- Associating formalPresentations for', availabilityOption.name);
          const formalPresentation = formalPresentations[Math.floor(Math.random() * formalPresentations.length)];    
          await availabilityOption.update({ formal_presentation_id: formalPresentation.id }); 
        }
        for (const dwellingAdjustment of dwellingAdjustments) {
          console.log('\n----- Associating DataCollections for', dwellingAdjustment.name);
          const dataCollection = dataCollections[Math.floor(Math.random() * dataCollections.length)];    
          await dwellingAdjustment.update({ data_collection_id: dataCollection.id }); 
          
          console.log('\n----- Associating ReportWritings for', dwellingAdjustment.name);
          const reportWriting = reportWritings[Math.floor(Math.random() * reportWritings.length)];    
          await dwellingAdjustment.update({ report_writing_id: reportWriting.id }); 
          
          console.log('\n----- Associating formalPresentations for', dwellingAdjustment.name);
          const formalPresentation = formalPresentations[Math.floor(Math.random() * formalPresentations.length)];    
          await dwellingAdjustment.update({ formal_presentation_id: formalPresentation.id }); 
        }
        
        console.log('\n----- SEEDING COMPLETE -----\n');
      } catch (error) { console.log('Seed error:', error)};
    };
    seedAll();