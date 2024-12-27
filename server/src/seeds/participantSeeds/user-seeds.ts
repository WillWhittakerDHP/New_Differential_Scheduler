import { User } from "../../models/participantModels/Users";

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { 
        username: 'JollyGuru', 
        email: 'jolly@guru.com',
        password: 'password' 
      },
      { 
        username: 'HelosDad', 
        email: 'will@districthomepro.com',
        password: 'password' 
      },
      {
        username: 'SunnyScribe',
        email: 'sunny@scribe.com',
        password: 'password',
      },
      {
        username: 'RadiantComet',
        email: 'radiant@comet.com',
        password: 'password',
      },
    ],
    { individualHooks: true }
  );
};
