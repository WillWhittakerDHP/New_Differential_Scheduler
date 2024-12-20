import { Login } from "../../models/participantModels/Logins";

export const seedLogin = async () => {
  await Login.bulkCreate([
    { username: 'HelosDad', password: 'password' },
    { username: 'JollyGuru', password: 'password' },
    { username: 'SunnyScribe', password: 'password' },
    { username: 'RadiantComet', password: 'password' },
  ], { individualHooks: true });
};