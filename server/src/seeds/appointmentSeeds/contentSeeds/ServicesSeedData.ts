import { Service } from "../../../models/index.js";

export const seedServices = async () => {
  try{
    await Service.bulkCreate(
      [ 
        { "title" :"Buyers Inspection", "can_be_scheduled": true, "differential_scheduling": true, "ui_description_set_id": 7, "appointment_part_1": 1, "appointment_part_2": 3, "appointment_part_3": 4, "appointment_part_4": 6},
        { "title" :"Investors Inspection", "can_be_scheduled": true, "differential_scheduling": true, "ui_description_set_id": 8, "appointment_part_1": 1, "appointment_part_2": 3, "appointment_part_3": 4, "appointment_part_4": 6},
        { "title" :"Walk and Talk", "can_be_scheduled": true, "differential_scheduling": false,"ui_description_set_id": 9, "appointment_part_1": 1, "appointment_part_2": 3, "appointment_part_3": 5, "appointment_part_4": 7},
        { "title" :"Home Check-up and Maintenance Planning", "can_be_scheduled": true, "differential_scheduling": true, "ui_description_set_id": 10, "appointment_part_1": 1, "appointment_part_2": 3, "appointment_part_3": 4, "appointment_part_4": 6},
        { "title" :"Pre-sale Walkthrough", "can_be_scheduled": true, "differential_scheduling": false,"ui_description_set_id": 11, "appointment_part_1": 1, "appointment_part_2": 3, "appointment_part_3": 5, "appointment_part_4": 7},
        { "title" :"Developers Warranty Inspection", "can_be_scheduled": true, "differential_scheduling": false,"ui_description_set_id": 12, "appointment_part_1":  1, "appointment_part_2": 3, "appointment_part_3": 4, "appointment_part_4": 6},
        { "title" :"Reinspection", "can_be_scheduled": true, "differential_scheduling": false,"ui_description_set_id": 13, "appointment_part_1": 1, "appointment_part_2": 3, "appointment_part_3": 4, "appointment_part_4": 6}
      ],
      { individualHooks: true }
    );
  } catch (error) { console.log(error)};
};