import { sequelize } from '../config/connection.js';
import { seedUIDescriptions } from './appointmentSeeds/structureSeeds/UIDescriptionSeedData.js';
import { seedAppointmentParts } from './appointmentSeeds/structureSeeds/AppointmentPartsSeedData.js';
import { seedAppointmentPartTypes } from './appointmentSeeds/structureSeeds/AppointmentPartTypeSeedData.js';
import { seedDwellingTypes } from './appointmentSeeds/structureSeeds/DwellingTypesSeedData.js';
import { seedTimeBlockSets } from './appointmentSeeds/structureSeeds/TimeBlockSetsSeedData.js';
import { seedParticipantTypes } from './participantSeeds/ParticipantTypesSeedData.js';
import { seedAdditionalServices } from './appointmentSeeds/contentSeeds/AdditionalServicesSeedData.js';
import { seedAvailabilityOptions } from './appointmentSeeds/contentSeeds/AvailabilityOptionsSeedData.js';
import { seedDwellingAdjustments } from './appointmentSeeds/contentSeeds/DwellingAdjustmentsSeedData.js';
import { seedServices } from './appointmentSeeds/contentSeeds/ServicesSeedData.js';


// export const seedDatabase = async () => {
  
  const seedAll = async (): Promise<void> => {
    
    try {
      console.log('\n----- Synching database ... -----\n');
      await sequelize.sync({ force: true });
      console.log('\n----- DATABASE SYNCED -----\n');
      
      console.log('\n----- Seeding database ... -----\n');
      await seedUIDescriptions();
      await seedAppointmentParts();
      await seedAppointmentPartTypes();
      await seedDwellingTypes();
      await seedTimeBlockSets();
      await seedParticipantTypes();
      await seedAdditionalServices();
      await seedAvailabilityOptions();
      await seedDwellingAdjustments();
      await seedServices();
      console.log('\n----- DATABASE SEEDED -----\n');
      
      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  };
  
  seedAll();
// };
