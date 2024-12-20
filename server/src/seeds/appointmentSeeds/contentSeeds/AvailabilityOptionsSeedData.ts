import { AvailabilityOption } from "../../../models/index.js";

export const seedAvailabilityOptions = async () => {
  try{
    await AvailabilityOption.bulkCreate(
      [
        {"title": "Minimize Time On-site", "can_be_scheduled": true, "differential_scheduling_override": false,"ui_description_set": 8, "appointment_part_1": 1,"appointment_part_2": 3,"appointment_part_3": 5,"appointment_part_4": 6},
        {"title": "Additional Client Time", "can_be_scheduled": true, "differential_scheduling_override": false,"ui_description_set": 9,"appointment_part_1": 1,"appointment_part_2": 3,"appointment_part_3": 4,"appointment_part_4": 7},
        {"title": "Client will not be present", "can_be_scheduled": true, "differential_scheduling_override": false, "ui_description_set": 0,"appointment_part_1": 1,"appointment_part_2": 3,"appointment_part_3": 5,"appointment_part_4": 7},
        {"title": "First-time buyers", "can_be_scheduled": true, "differential_scheduling_override": false,"ui_description_set": 1,"appointment_part_1": 2,"appointment_part_2": 3,"appointment_part_3": 5,"appointment_part_4": 6}
      ],
      { individualHooks: true }
    );
  } catch (error) { console.log(error)};
};