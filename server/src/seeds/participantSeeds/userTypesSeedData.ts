import { UserType } from "../../models/index.js";

export const seedUserTypes = async () => {
  try{
    await UserType.bulkCreate(
      [
        {"user_type": "Buyer", "visibility": true, "icon": "", "user_description": "I need an inspection to help me understand a property that I am trying to buy", "available_service_1": 1, "available_service_2": 3, "available_service_3": 7,"available_service_4": 0}, 
        {"user_type": "Agent", "visibility": true, "icon": "", "user_description": "I am a real estate agent helping a buyer with their inspection needs", "available_service_1": 1, "available_service_2": 2, "available_service_3": 3, "available_service_4": 0}, 
        {"user_type": "Owner", "visibility": true, "icon": "", "user_description": "I already own a property but need to understand it better", "available_service_1": 1, "available_service_2": 3, "available_service_3": 7, "available_service_4": 0},
        {"user_type": "Inspector", "visibility": false, "icon": "", "user_description": "This is me!", "available_service_1": 1, "available_service_2": 3, "available_service_3": 7, "available_service_4": 0}
      ],
      { returning: true,
        validate: true,
        individualHooks: true }
    );
  } catch (error) { console.log(error)};
};
