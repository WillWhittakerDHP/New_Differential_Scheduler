import { sequelize } from "../config/connection.js";

import { UserType, Service, AdditionalService, AvailabilityOption, DwellingAdjustment, DataCollectionFee, ReportWritingFee, ClientPresentationFee, DataCollectionTime, ReportWritingTime, ClientPresentationTime } from "../models/index.js";

import serviceSeedData from './appointmentSeeds/structureSeeds/service-seeds.json' with { type: 'json' };
import userTypeSeedData from './appointmentSeeds/structureSeeds/userType-seeds.json' with { type: 'json' };
import additionalServiceSeedData from './appointmentSeeds/structureSeeds/additionalService-seeds.json' with { type: 'json' };
import availabilityOptionSeedData from './appointmentSeeds/structureSeeds/availabilityOption-seeds.json' with { type: 'json' };
import dwellingAdjustmentSeedData from './appointmentSeeds/structureSeeds/dwellingAdjustment-seeds.json' with { type: 'json' };

import dataCollectionFeeSeedData from './appointmentSeeds/feeContentSeeds/dataCollectionFee-seeds.json' with { type: 'json' };
import reportWritingFeeSeedData from './appointmentSeeds/feeContentSeeds/reportWritingFee-seeds.json' with { type: 'json' };
import clientPresentationFeeSeedData from './appointmentSeeds/feeContentSeeds/clientPresentationFee-seeds.json' with { type: 'json' };
import dataCollectionTimeSeedData from './appointmentSeeds/timeContentSeeds/dataCollectionTime-seeds.json' with { type: 'json' };
import reportWritingTimeSeedData from './appointmentSeeds/timeContentSeeds/reportWritingTime-seeds.json' with { type: 'json' };
import clientPresentationTimeSeedData from './appointmentSeeds/timeContentSeeds/clientPresentationTime-seeds.json' with { type: 'json' };


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


console.log('\n----- Seeding Times ... -----\n');
const dataCollectionTimes = await DataCollectionTime.bulkCreate(dataCollectionTimeSeedData, {
  returning: true,
  validate: true,
});

const reportWritingTimes = await ReportWritingTime.bulkCreate(reportWritingTimeSeedData, {
  returning: true,
  validate: true,
});

const clientPresentationTimes = await ClientPresentationTime.bulkCreate(clientPresentationTimeSeedData, {
  returning: true,
  validate: true,
});

console.log('\n----- Seeding Fees ... -----\n');
const dataCollectionFees = await DataCollectionFee.bulkCreate(dataCollectionFeeSeedData, {
  returning: true,
  validate: true,
});

const reportWritingFees = await ReportWritingFee.bulkCreate(reportWritingFeeSeedData, {
  returning: true,
  validate: true,
});

const clientPresentationFees = await ClientPresentationFee.bulkCreate(clientPresentationFeeSeedData, {
  returning: true,
  validate: true,
});

for (const service of services) {
  console.log('\n----- Associating DataCollectionTimes for', service.name);
  const dataCollectionTime = dataCollectionTimes[Math.floor(Math.random() * dataCollectionTimes.length)];    
  await service.update({ data_collection_time_id: dataCollectionTime.id }); 
  
  console.log('\n----- Associating ReportWritingTimes for', service.name);
  const reportWritingTime = reportWritingTimes[Math.floor(Math.random() * reportWritingTimes.length)];    
  await service.update({ report_writing_time_id: reportWritingTime.id }); 
  
  console.log('\n----- Associating ClientPresentationTimes for', service.name);
  const clientPresentationTime = clientPresentationTimes[Math.floor(Math.random() * clientPresentationTimes.length)];    
  await service.update({ client_presentation_time_id: clientPresentationTime.id }); 
  
  console.log('\n----- Associating DataCollectionFees for', service.name);
  const dataCollectionFee = dataCollectionFees[Math.floor(Math.random() * dataCollectionFees.length)];    
  await service.update({ data_collection_fee_id: dataCollectionFee.id }); 
  
  console.log('\n----- Associating ReportWritingFees for', service.name);
  const reportWritingFee = reportWritingFees[Math.floor(Math.random() * reportWritingFees.length)];    
  await service.update({ report_writing_fee_id: reportWritingFee.id }); 
  
  console.log('\n----- Associating ClientPresentationFees for', service.name);
  const clientPresentationFee = clientPresentationFees[Math.floor(Math.random() * clientPresentationFees.length)];    
  await service.update({ client_presentation_fee_id: clientPresentationFee.id }); 
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
      console.log('\n----- Associating DataCollectionTimes for', additionalService.name);
      const dataCollectionTime = dataCollectionTimes[Math.floor(Math.random() * dataCollectionTimes.length)];    
      await additionalService.update({ data_collection_time_id: dataCollectionTime.id }); 
      
      console.log('\n----- Associating ReportWritingTimes for', additionalService.name);
      const reportWritingTime = reportWritingTimes[Math.floor(Math.random() * reportWritingTimes.length)];    
      await additionalService.update({ report_writing_time_id: reportWritingTime.id }); 
      
      console.log('\n----- Associating ClientPresentationTimes for', additionalService.name);
      const clientPresentationTime = clientPresentationTimes[Math.floor(Math.random() * clientPresentationTimes.length)];    
      await additionalService.update({ client_presentation_time_id: clientPresentationTime.id }); 
      
      console.log('\n----- Associating DataCollectionFees for', additionalService.name);
      const dataCollectionFee = dataCollectionFees[Math.floor(Math.random() * dataCollectionFees.length)];    
      await additionalService.update({ data_collection_fee_id: dataCollectionFee.id }); 
      
      console.log('\n----- Associating ReportWritingFees for', additionalService.name);
      const reportWritingFee = reportWritingFees[Math.floor(Math.random() * reportWritingFees.length)];    
      await additionalService.update({ report_writing_fee_id: reportWritingFee.id }); 
      
      console.log('\n----- Associating ClientPresentationFees for', additionalService.name);
      const clientPresentationFee = clientPresentationFees[Math.floor(Math.random() * clientPresentationFees.length)];    
      await additionalService.update({ client_presentation_fee_id: clientPresentationFee.id }); 
      }
    console.log('\n----- ADDITIONALSERVICES SEEDING COMPLETE -----\n');
    
    console.log('\n----- Seeding AvailabilityOptions ... -----\n');
    const availabilityOptions = await AvailabilityOption.bulkCreate(availabilityOptionSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const availabilityOption of availabilityOptions) {
      console.log('\n----- Associating DataCollectionTimes for', availabilityOption.name);
      const dataCollectionTime = dataCollectionTimes[Math.floor(Math.random() * dataCollectionTimes.length)];    
      await availabilityOption.update({ data_collection_time_id: dataCollectionTime.id }); 
      
      console.log('\n----- Associating ReportWritingTimes for', availabilityOption.name);
      const reportWritingTime = reportWritingTimes[Math.floor(Math.random() * reportWritingTimes.length)];    
      await availabilityOption.update({ report_writing_time_id: reportWritingTime.id }); 
      
      console.log('\n----- Associating ClientPresentationTimes for', availabilityOption.name);
      const clientPresentationTime = clientPresentationTimes[Math.floor(Math.random() * clientPresentationTimes.length)];    
      await availabilityOption.update({ client_presentation_time_id: clientPresentationTime.id }); 
      
      console.log('\n----- Associating DataCollectionFees for', availabilityOption.name);
      const dataCollectionFee = dataCollectionFees[Math.floor(Math.random() * dataCollectionFees.length)];    
      await availabilityOption.update({ data_collection_fee_id: dataCollectionFee.id }); 
      
      console.log('\n----- Associating ReportWritingFees for', availabilityOption.name);
      const reportWritingFee = reportWritingFees[Math.floor(Math.random() * reportWritingFees.length)];    
      await availabilityOption.update({ report_writing_fee_id: reportWritingFee.id }); 
      
      console.log('\n----- Associating ClientPresentationFees for', availabilityOption.name);
      const clientPresentationFee = clientPresentationFees[Math.floor(Math.random() * clientPresentationFees.length)];    
      await availabilityOption.update({ client_presentation_fee_id: clientPresentationFee.id }); 
      }
    console.log('\n----- AVAILABILITYOPTION SEEDING COMPLETE -----\n');
    
    console.log('\n----- Seeding DwellingAdjustments ... -----\n');
    const dwellingAdjustments = await DwellingAdjustment.bulkCreate(dwellingAdjustmentSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const dwellingAdjustment of dwellingAdjustments) {
      console.log('\n----- Associating DataCollectionTimes for', dwellingAdjustment.name);
      const dataCollectionTime = dataCollectionTimes[Math.floor(Math.random() * dataCollectionTimes.length)];    
      await dwellingAdjustment.update({ data_collection_time_id: dataCollectionTime.id }); 
      
      console.log('\n----- Associating ReportWritingTimes for', dwellingAdjustment.name);
      const reportWritingTime = reportWritingTimes[Math.floor(Math.random() * reportWritingTimes.length)];    
      await dwellingAdjustment.update({ report_writing_time_id: reportWritingTime.id }); 
      
      console.log('\n----- Associating ClientPresentationTimes for', dwellingAdjustment.name);
      const clientPresentationTime = clientPresentationTimes[Math.floor(Math.random() * clientPresentationTimes.length)];    
      await dwellingAdjustment.update({ client_presentation_time_id: clientPresentationTime.id }); 
      
      console.log('\n----- Associating DataCollectionFees for', dwellingAdjustment.name);
      const dataCollectionFee = dataCollectionFees[Math.floor(Math.random() * dataCollectionFees.length)];    
      await dwellingAdjustment.update({ data_collection_fee_id: dataCollectionFee.id }); 
      
      console.log('\n----- Associating ReportWritingFees for', dwellingAdjustment.name);
      const reportWritingFee = reportWritingFees[Math.floor(Math.random() * reportWritingFees.length)];    
      await dwellingAdjustment.update({ report_writing_fee_id: reportWritingFee.id }); 
      
      console.log('\n----- Associating ClientPresentationFees for', dwellingAdjustment.name);
      const clientPresentationFee = clientPresentationFees[Math.floor(Math.random() * clientPresentationFees.length)];    
      await dwellingAdjustment.update({ client_presentation_fee_id: clientPresentationFee.id }); 
      }
    console.log('\n----- DWELLINGTYPE SEEDING COMPLETE -----\n');

    console.log('\n----- SEEDING COMPLETE -----\n');
    } catch (error) { console.log('Seed error:', error)};
  };

  seedServices();