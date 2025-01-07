import { sequelize } from "../config/connection.js";

import { ReportWriting, Service, AdditionalService, AvailabilityOption, DwellingAdjustment
} from "../models/index.js";

import reportWritingSeedData from './appointmentSeeds/timeContentSeeds/reportWriting-seeds.json' with { type: 'json' };
import serviceSeedData from './appointmentSeeds/structureSeeds/service-seeds.json' with { type: 'json' };
import additionalServiceSeedData from './appointmentSeeds/structureSeeds/additionalService-seeds.json' with { type: 'json' };
import availabilityOptionSeedData from './appointmentSeeds/structureSeeds/availabilityOption-seeds.json' with { type: 'json' };
import dwellingAdjustmentSeedData from './appointmentSeeds/structureSeeds/dwellingAdjustment-seeds.json' with { type: 'json' };


export const seedReportWritings = async () => {

  try{
    console.log('\n----- Seeding ReportWritings ... -----\n');
    const ReportWritings = await ReportWriting.bulkCreate(reportWritingSeedData, {
      returning: true,
      validate: true,
    });
    
    console.log('\n----- ReportWriting Seeding COMPLETE ... -----\n');
    
    console.log('\n----- Seeding Services ... -----\n');
    const services = await Service.bulkCreate(serviceSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
  
    for (const service of services) {
      console.log('\n----- Associating ReportWritings for', service.name);
      const randomReportWritings = ReportWritings.slice(Math.floor(Math.random() * ReportWritings.length));
      await service.addReportWritings(randomReportWritings);
    }
    console.log('\n----- UpserType Seeding COMPLETE ... -----\n');
    
    
    console.log('\n----- Seeding AdditionalServices ... -----\n');
    const additionalServices = await AdditionalService.bulkCreate(additionalServiceSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const additionalService of additionalServices) {
      console.log('\n----- Associating ReportWritings for', additionalService.name);
      const randomReportWritings = ReportWritings.slice(Math.floor(Math.random() * ReportWritings.length));
      await additionalService.addReportWritings(randomReportWritings);
    }
    console.log('\n----- AdditionalServices Seeding COMPLETE ... -----\n');
    
    console.log('\n----- Seeding AvailabilityOptions ... -----\n');
    const availabilityOptions = await AvailabilityOption.bulkCreate(availabilityOptionSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });
    
    for (const availabilityOption of availabilityOptions) {
      console.log('\n----- Associating ReportWritings for', availabilityOption.name);
      const randomReportWritings = ReportWritings.slice(Math.floor(Math.random() * ReportWritings.length));
      await availabilityOption.addReportWritings(randomReportWritings);
    }
    console.log('\n----- AvailabilityOptions Seeding COMPLETE ... -----\n');


    console.log('\n----- Seeding DwellingAdjustments ... -----\n');
    const dwellingAdjustments = await DwellingAdjustment.bulkCreate(dwellingAdjustmentSeedData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });

      for (const dwellingAdjustment of dwellingAdjustments) {
        console.log('\n----- Associating ReportWritings for', dwellingAdjustment.name);
        const randomReportWritings = ReportWritings.slice(Math.floor(Math.random() * ReportWritings.length));
        await dwellingAdjustment.addReportWritings(randomReportWritings);
      }
    console.log('\n----- DwellingAdjustment Seeding COMPLETE ... -----\n');
    
    } catch (error) { console.log('serviceReportWriting Seed error:', error)};
    
    console.log('Sequelize Models:', sequelize.models);
    
  };