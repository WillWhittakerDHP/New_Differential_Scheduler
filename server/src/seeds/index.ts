import { sequelize } from '../config/connection.js';
import { seedUserTypesandServices } from './participantSeeds/userTypesSeedData.js';
// import { seedUIDescriptions } from './appointmentSeeds/structureSeeds/UIDescriptionSeedData.js';
// import { seedDwellingTypes } from './appointmentSeeds/structureSeeds/DwellingTypesSeedData.js';
// import { seedTimeBlockSets } from './appointmentSeeds/structureSeeds/TimeBlockSetsSeedData.js';
// import { seedAppointmentPartTypes } from './appointmentSeeds/structureSeeds/AppointmentPartTypeSeedData.js';
// import { seedAppointmentParts } from './appointmentSeeds/structureSeeds/AppointmentPartsSeedData.js';
// import { seedDwellingAdjustments } from './appointmentSeeds/contentSeeds/DwellingAdjustmentsSeedData.js';
// import { seedAdditionalServices } from './appointmentSeeds/contentSeeds/AdditionalServicesSeedData.js';
// import { seedAvailabilityOptions } from './appointmentSeeds/contentSeeds/AvailabilityOptionsSeedData.js';

  
  const seedAll = async (): Promise<void> => {
    
    try {
      console.log('\n----- Synching database ... -----\n');
      await sequelize.sync({ force: true });
      console.log('\n----- DATABASE SYNCED -----\n');
      
      console.log('\n----- Seeding database ... -----\n');
      await seedUserTypesandServices();
      // await seedUIDescriptions();
      // await seedDwellingTypes();
      // await seedTimeBlockSets();
      // await seedAppointmentPartTypes();
      // await seedAppointmentParts();
      // await seedDwellingAdjustments();
      // await seedAdditionalServices();
      // await seedAvailabilityOptions();
      console.log('\n----- DATABASE SEEDED -----\n');
      
      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  };
  
  seedAll();
