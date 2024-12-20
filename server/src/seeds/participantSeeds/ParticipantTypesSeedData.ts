import { ParticipantType } from "../../models/index.js";

export const seedParticipantTypes = async () => {
  try{
    await ParticipantType.bulkCreate(
      [
        {"participant_type": "Buyer", "participant_description": "I am buying a home", "visibility": true}, 
        {"participant_type": "Agent", "participant_description": "My Client is buying a home", "visibility": true}, 
        {"participant_type": "Owner", "participant_description": "I own a home", "visibility": true},
        {"participant_type": "Inspector'", "participant_description": "This is me!", "visibility": false}
      ],
      { individualHooks: true }
    );
  } catch (error) { console.log(error)};
};
