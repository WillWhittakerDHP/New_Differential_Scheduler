import { sequelize } from "../config/connection.js";

import { FeeTime, DataCollection, ReportWriting, ClientPresentation } from "../models/index.js";

import feeTimeSeedData from './appointmentSeeds/feeTimeSeeds/feeTime-seeds.json' with { type: 'json' };

import dataCollectionSeedData from './appointmentSeeds/feeTimeSeeds/dataCollection-seeds.json' with { type: 'json' };
import reportWritingSeedData from './appointmentSeeds/feeTimeSeeds/reportWriting-seeds.json' with { type: 'json' };
import clientPresentationSeedData from './appointmentSeeds/feeTimeSeeds/clientPresentation-seeds.json' with { type: 'json' };


export const seedfeeTimes = async () => {
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

  console.log('\n----- Seeding ClientPresentations ... -----\n');
  
  const clientPresentations = await ClientPresentation.bulkCreate(clientPresentationSeedData, {
  returning: true,
  validate: true,
});

for (const clientPresentation of clientPresentations) {
  console.log('\n----- Associating FeeTimes for', clientPresentation.id);
  const randomFeeTimes = feeTimes.slice(Math.floor(Math.random() * feeTimes.length));
  await clientPresentation.addFeeTimes(randomFeeTimes);
  }

  console.log('\n----- DATACOLLECTION SEEDING COMPLETE -----\n');
  console.log('\n----- feeTime SEEDING COMPLETE -----\n');

    } catch (error) { console.log('Seed error:', error)};
  };

  seedfeeTimes();